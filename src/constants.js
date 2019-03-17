const Point = Phaser.Geom.Point;
export const PIECE_TYPE = Object.freeze({
  I: 'I',
  J: 'J',
  L: 'L',
  O: 'O',
  S: 'S',
  Z: 'Z',
  T: 'T'
});

export const PIECE_MATRIX = Object.freeze({
  [PIECE_TYPE.I]: [
    [new Point(0, -2), new Point(0, -1), new Point(0, 0), new Point(0, 1)],
    [new Point(-2, 0), new Point(-1, 0), new Point(0, 0), new Point(1, 0)]
  ],
  [PIECE_TYPE.J]: [
    [new Point(-1, 0), new Point(0, 0), new Point(0, -1), new Point(0, -2)],
    [new Point(-1, -1), new Point(-1, 0), new Point(0, 0), new Point(1, 0)],
    [new Point(0, -1), new Point(-1, -1), new Point(-1, 0), new Point(-1, 1)],
    [new Point(-2, -1), new Point(-1, -1), new Point(0, -1), new Point(0, 0)]
  ],
  [PIECE_TYPE.L]: [
    [new Point(0, 0), new Point(-1, 0), new Point(-1, -1), new Point(-1, -2)],
    [new Point(-2, 0), new Point(-1, 0), new Point(0, 0), new Point(0, -1)],
    [new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(0, 1)],
    [new Point(-1, 0), new Point(-1, -1), new Point(0, -1), new Point(1, -1)]
  ],
  [PIECE_TYPE.O]: [
    [new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(-1, 0)]
  ],
  [PIECE_TYPE.S]: [
    [new Point(-1, 0), new Point(0, 0), new Point(0, -1), new Point(1, -1)],
    [new Point(-1, -2), new Point(-1, -1), new Point(0, -1), new Point(0, 0)]
  ],
  [PIECE_TYPE.Z]: [
    [new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(1, 0)],
    [new Point(-1, 0), new Point(-1, -1), new Point(0, -1), new Point(0, -2)]
  ],
  [PIECE_TYPE.T]: [
    [new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(1, -1)],
    [new Point(-1, 0), new Point(0, 0), new Point(0, 1), new Point(0, -1)],
    [new Point(-1, 0), new Point(0, 0), new Point(1, 0), new Point(0, -1)],
    [new Point(-1, 0), new Point(-1, -1), new Point(-1, -2), new Point(0, -1)]
  ]
});
