export const gameOptions = Object.freeze({
  width: 640,
  aspectRatio: 9 / 16,
  tileSize: 16,
  tileNbWidth: 10,
  tileNbHeight: 20,
  colors: {
    playground: '0x2c374c'
  },
  speeds: {
    normal: 1000,
    fast: 33
  },
  swipeMaxTime: 1000, // the maximum amount of time allowed to swipe, in milliseconds
  swipeMinDistance: 20, // the minimum swipe vector magnitude, in pixels
  swipeMinNormal: 0.85 // the minimum length of the longest component of the normalized swipe vector magnitude, in pixels,
});
