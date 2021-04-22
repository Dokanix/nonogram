import Nonogram from '../src/nonogram';

describe('Regex', () => {
  test('allows valid URL', () => {
    expect(Nonogram.validUrl('5&4&abscag')).toBeTruthy();
  });

  test('allows invalid URL', () => {
    expect(Nonogram.validUrl('&3&46036')).not.toBeTruthy();
  });
});

describe('Board', () => {
  let nono: Nonogram;

  beforeEach(() => {
    nono = new Nonogram([
      [false, false, false],
      [true, false, false],
      [false, false, false],
    ]);
  });

  test('knows when its solved', () => {
    nono.check(0, 1);

    expect(nono.solved).toBeTruthy();
  });

  test('knows when it is not solved', () => {
    expect(nono.solved).not.toBeTruthy();
  });
});

describe('Decoder', () => {
  let nono: Nonogram;

  beforeEach(() => {
    nono = new Nonogram([
      [false, true, false],
      [true, false, false],
      [false, false, true],
      [false, false, false],
    ]);
  });

  test('encodes correctly', () => {
    expect(nono.encode()).toBe('3&4&010100001000');
  });

  test('decodes correctly', () => {
    expect(Nonogram.decode(nono.encode())).toEqual(nono);
  });
});
