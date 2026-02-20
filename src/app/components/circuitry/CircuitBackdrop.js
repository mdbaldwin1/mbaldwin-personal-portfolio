import './CircuitBackdrop.css';
import React, { useEffect, useMemo, useState } from 'react';

const LAYOUT = [
  { x: 0.08, y: 0.2, w: 112, h: 112 },
  { x: 0.78, y: 0.14, w: 108, h: 108 },
  { x: 0.64, y: 0.72, w: 118, h: 118 },
  { x: 0.22, y: 0.68, w: 104, h: 104 },
  { x: 0.46, y: 0.1, w: 98, h: 98 },
  { x: 0.88, y: 0.52, w: 102, h: 102 },
];

const TURN_OPTIONS = [-45, 45];
const SEGMENT_MIN = 34;
const SEGMENT_MAX = 148;
const SPEED_MIN = 42;
const SPEED_MAX = 68;
const MAX_TURNS = 10;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomTurn() {
  return TURN_OPTIONS[Math.floor(Math.random() * TURN_OPTIONS.length)];
}

function createPins(board) {
  const pins = [];
  const stepX = board.w / 5;
  const stepY = board.h / 5;

  for (let i = 1; i <= 4; i += 1) {
    pins.push({ x: board.x - 2, y: board.y + stepY * i, angle: 180 });
    pins.push({ x: board.x + board.w + 2, y: board.y + stepY * i, angle: 0 });
    pins.push({ x: board.x + stepX * i, y: board.y - 2, angle: 270 });
    pins.push({ x: board.x + stepX * i, y: board.y + board.h + 2, angle: 90 });
  }

  return pins;
}

function pathFromPoints(points) {
  if (points.length < 2) {
    return '';
  }

  let d = '';
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const command = i === 0 || point.moveTo ? 'M' : 'L';
    d += `${command} ${point.x} ${point.y} `;
  }
  return d.trim();
}

function makeTrace(pin, id) {
  const start = { x: pin.x, y: pin.y };
  return {
    id,
    seed: pin,
    points: [start, { ...start }],
    nodes: [start],
    angle: pin.angle,
    speed: randomBetween(SPEED_MIN, SPEED_MAX),
    segmentLength: randomBetween(SEGMENT_MIN, SEGMENT_MAX),
    progressInSegment: 0,
    turns: 0,
    maxTurns: MAX_TURNS,
  };
}

function wrapPoint(point, width, height) {
  const edgeX = Math.min(Math.max(point.x, 0), width);
  const edgeY = Math.min(Math.max(point.y, 0), height);
  let x = point.x;
  let y = point.y;
  let wrapped = false;

  if (x < 0) {
    x = width;
    wrapped = true;
  } else if (x > width) {
    x = 0;
    wrapped = true;
  }

  if (y < 0) {
    y = height;
    wrapped = true;
  } else if (y > height) {
    y = 0;
    wrapped = true;
  }

  return { x, y, wrapped, edgeX, edgeY };
}

function resetTrace(trace) {
  const start = { x: trace.seed.x, y: trace.seed.y };
  return {
    ...trace,
    points: [start, { ...start }],
    nodes: [start],
    angle: trace.seed.angle,
    speed: randomBetween(SPEED_MIN, SPEED_MAX),
    segmentLength: randomBetween(SEGMENT_MIN, SEGMENT_MAX),
    progressInSegment: 0,
    turns: 0,
  };
}

function updateTrace(trace, dt, viewport) {
  let next = { ...trace, points: [...trace.points], nodes: [...trace.nodes] };
  let remainingDistance = (next.speed * dt) / 1000;

  while (remainingDistance > 0.0001) {
    const headIndex = next.points.length - 1;
    const head = next.points[headIndex];
    const remainingInSegment = next.segmentLength - next.progressInSegment;
    const step = Math.min(remainingDistance, remainingInSegment);
    const radians = (next.angle * Math.PI) / 180;

    const proposed = {
      x: head.x + Math.cos(radians) * step,
      y: head.y + Math.sin(radians) * step,
    };

    const wrappedPoint = wrapPoint(proposed, viewport.width, viewport.height);

    const wasMovePoint = Boolean(head.moveTo);
    if (wrappedPoint.wrapped) {
      next.points[headIndex] = {
        x: wrappedPoint.edgeX,
        y: wrappedPoint.edgeY,
        ...(wasMovePoint ? { moveTo: true } : {}),
      };
    } else {
      next.points[headIndex] = {
        x: wrappedPoint.x,
        y: wrappedPoint.y,
        ...(wasMovePoint ? { moveTo: true } : {}),
      };
    }

    next.progressInSegment += step;
    remainingDistance -= step;

    if (wrappedPoint.wrapped) {
      next.nodes.push({ x: wrappedPoint.edgeX, y: wrappedPoint.edgeY });
      next.nodes.push({ x: wrappedPoint.x, y: wrappedPoint.y });
      next.segmentLength = randomBetween(SEGMENT_MIN, SEGMENT_MAX);
      next.progressInSegment = 0;
      next.points.push({ x: wrappedPoint.x, y: wrappedPoint.y, moveTo: true });
      next.points.push({ x: wrappedPoint.x, y: wrappedPoint.y });
    } else if (next.progressInSegment >= next.segmentLength - 0.0001) {
      const turnPoint = next.points[headIndex];
      next.nodes.push({ x: turnPoint.x, y: turnPoint.y });
      next.angle += randomTurn();
      next.segmentLength = randomBetween(SEGMENT_MIN, SEGMENT_MAX);
      next.progressInSegment = 0;
      next.turns += 1;
      next.points.push({ x: turnPoint.x, y: turnPoint.y });
    }

    if (next.turns >= next.maxTurns) {
      next = resetTrace(next);
      break;
    }
  }

  if (next.nodes.length > next.maxTurns + 3) {
    next.nodes = next.nodes.slice(-(next.maxTurns + 3));
  }

  return next;
}

export function CircuitBackdrop() {
  const [viewport, setViewport] = useState({
    width: typeof window === 'undefined' ? 1200 : window.innerWidth,
    height: typeof window === 'undefined' ? 900 : window.innerHeight,
  });

  useEffect(() => {
    function updateViewport() {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const boards = useMemo(() => {
    const isMobile = viewport.width <= 700;
    const boardScale = isMobile ? 0.78 : 1;

    return LAYOUT.map((entry) => ({
      x: Math.round(entry.x * viewport.width),
      y: Math.round(entry.y * viewport.height),
      w: Math.round(entry.w * boardScale),
      h: Math.round(entry.h * boardScale),
    }));
  }, [viewport.height, viewport.width]);

  const [traces, setTraces] = useState([]);

  useEffect(() => {
    const allPins = boards.flatMap((board) => createPins(board));
    const isMobile = viewport.width <= 700;
    const pinStride = isMobile ? 3 : 2;
    const selectedPins = allPins.filter((_, index) => index % pinStride === 0);
    setTraces(selectedPins.map((pin, index) => makeTrace(pin, `trace-${index}`)));
  }, [boards, viewport.width]);

  useEffect(() => {
    if (!traces.length) {
      return undefined;
    }

    let animationFrameId;
    let lastFrameTime = performance.now();

    function tick(now) {
      const delta = Math.min(now - lastFrameTime, 45);
      lastFrameTime = now;

      setTraces((current) => current.map((trace) => updateTrace(trace, delta, viewport)));
      animationFrameId = window.requestAnimationFrame(tick);
    }

    animationFrameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [traces.length, viewport]);

  return (
    <div className="circuit-backdrop" aria-hidden="true">
      <svg
        className="circuit-svg"
        viewBox={`0 0 ${viewport.width} ${viewport.height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <g className="trace-layer">
          {traces.map((trace) => (
            <path key={trace.id} className="circuit-path" d={pathFromPoints(trace.points)} />
          ))}
        </g>

        <g className="board-layer">
          {boards.map((board, index) => (
            <g key={`board-${index}`}>
              <rect className="mother-board" x={board.x} y={board.y} rx="8" ry="8" width={board.w} height={board.h} />
              <text className="board-label" x={board.x + board.w - 34} y={board.y + board.h - 14}>
                MB
              </text>
            </g>
          ))}
        </g>

        <g className="node-layer">
          {traces.flatMap((trace) =>
            trace.nodes.map((node, index) => (
              <circle
                key={`${trace.id}-node-${index}`}
                className="circuit-node"
                cx={node.x}
                cy={node.y}
                r="1.8"
                style={{ '--node-delay': `${index * 110}ms` }}
              />
            )),
          )}
        </g>
      </svg>
    </div>
  );
}
