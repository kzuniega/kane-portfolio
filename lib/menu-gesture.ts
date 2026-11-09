type SwipePoint = { x: number; y: number; time: number };

export function isMenuOpeningSwipe(start: SwipePoint, end: SwipePoint) {
  const horizontal = start.x - end.x;
  const vertical = Math.abs(end.y - start.y);
  const duration = end.time - start.time;
  return horizontal >= 72 && vertical <= 48 && horizontal >= vertical * 2 && duration > 0 && duration <= 800;
}
