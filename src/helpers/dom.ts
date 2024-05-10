export function withinBoundaries(e: Event, where: HTMLElement) {
  return e.composedPath().includes(where);
}

export const testing = {
  withinBoundaries,
};
