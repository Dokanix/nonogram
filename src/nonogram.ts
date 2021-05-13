interface Helpers {
  row: number[][];
  column: number[][];
}

function equals<T extends any[] | []>(left: T, right: T): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let [index, value] of left.entries()) {
    if (value !== right[index]) {
      return false;
    }
  }

  return true;
}

export default class Nonogram {
  private solution: boolean[][] = [];
  private board: boolean[][] = [];
  private rowHelpers: number[][] = [];
  private columnHelpers: number[][] = [];
  private width: number = 2;
  private height: number = 2;
  static maxSize = 10;
  static minSize = 2;

  constructor(solution: boolean[][]) {
    this.validateBoard(solution);
    this.fillBoards(solution);
    this.generateHelpers();
  }

  get solved(): boolean {
    for (let [rowIndex, rowValue] of this.board.entries()) {
      if (rowValue.some((x, i) => x !== this.solution[rowIndex][i])) {
        return false;
      }
    }
    return true;
  }

  solvedRow(row: number): boolean {
    const solvedRow = this.solution[row];

    for (const [cellIndex, cell] of solvedRow.entries()) {
      if (cell !== this.board[row][cellIndex]) {
        return false;
      }
    }

    return true;
  }

  solvedColumn(column: number): boolean {
    for (let i = 0; i < this.height; i++) {
      if (this.board[i][column] !== this.solution[i][column]) {
        return false;
      }
    }

    return true;
  }

  get size(): [number, number] {
    return [this.width, this.height];
  }

  get cells(): boolean[][] {
    const board = Array(this.height)
      .fill(null)
      .map(() => Array(this.width)) as boolean[][];

    for (let [rowIndex, rowValue] of this.solution.entries()) {
      for (let [columnIndex, columnValue] of rowValue.entries()) {
        board[rowIndex][columnIndex] = columnValue;
      }
    }

    return board;
  }

  get helpers(): Helpers {
    return {
      row: this.rowHelpers,
      column: this.columnHelpers,
    };
  }

  private validateSize(width: number, height: number = 5): void {
    if (
      height < Nonogram.minSize ||
      height > Nonogram.maxSize ||
      width > Nonogram.maxSize ||
      width < Nonogram.minSize
    ) {
      throw new Error(
        `Invalid argument. The length of an axis must be between ${Nonogram.minSize} and ${Nonogram.maxSize}.`
      );
    }
  }

  private validateBoard(solution: boolean[][]): void {
    if (!Array.isArray(solution)) {
      throw new Error(
        `Invalid argument. Must be an array of equal-sized arrays containing a single boolean value.`
      );
    }

    const height = solution.length;
    const width = solution[0].length;

    this.validateSize(width, height);

    this.height = height;
    this.width = width;

    for (let row of solution) {
      if (!Array.isArray(solution)) {
        throw new Error(
          `Invalid argument. Must be an array of equal-sized arrays containing a single boolean value.`
        );
      }

      if (row.length != this.width) {
        throw new Error(
          `Invalid argument. Every row of the array must be of the same length.`
        );
      }
    }
  }

  private fillBoards(solution: boolean[][]): void {
    this.solution = Array(this.height)
      .fill(null)
      .map(() => Array(this.width)) as boolean[][];

    for (let [rowIndex, rowValue] of solution.entries()) {
      for (let [columnIndex, columnValue] of rowValue.entries()) {
        this.solution[rowIndex][columnIndex] = columnValue;
      }
    }

    this.board = Array(this.height)
      .fill(null)
      .map(() => Array(this.width).fill(false)) as boolean[][];
  }

  private generateHelpers(): void {
    this.rowHelpers = Array(this.height)
      .fill(null)
      .map(() => []) as number[][];
    this.columnHelpers = Array(this.width)
      .fill(null)
      .map(() => []) as number[][];

    // Generate Row Helpers
    for (let [rowIndex, rowValue] of this.solution.entries()) {
      let nextValue = true;

      for (let value of rowValue) {
        let lastIndex = this.rowHelpers[rowIndex].length - 1;

        if (value && nextValue) {
          this.rowHelpers[rowIndex].push(1);
          nextValue = false;
        } else if (value) {
          this.rowHelpers[rowIndex][lastIndex]++;
        } else {
          nextValue = true;
        }
      }
    }

    // Generate Column Helpers
    for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
      let nextValue = true;

      for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
        let lastIndex = this.columnHelpers[columnIndex].length - 1;
        let value = this.solution[rowIndex][columnIndex];

        if (value && nextValue) {
          this.columnHelpers[columnIndex].push(1);
          nextValue = false;
        } else if (value) {
          this.columnHelpers[columnIndex][lastIndex]++;
        } else {
          nextValue = true;
        }
      }
    }
  }

  static random(width: number, height: number = width): Nonogram {
    let randomBoard = Array(height)
      .fill(null)
      .map(() => Array(width).fill(false)) as boolean[][];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        randomBoard[i][j] = Math.random() > 0.5 ? true : false;
      }
    }

    return new Nonogram(randomBoard);
  }

  private print(array: boolean[][]): void {
    // Prints column helpers
    for (let i = 0; i < (this.height + 1) / 2; i++) {
      let stringifiedHelpers = '';

      for (let j = 0; j < (this.width + 1) / 2; j++) {
        stringifiedHelpers += '  ';
      }

      for (let j = 0; j < this.width; j++) {
        let index = Math.floor(
          this.columnHelpers[j].length - (this.height + 1) / 2 + i
        );

        if (index < 0) {
          stringifiedHelpers += '  ';
          continue;
        }

        stringifiedHelpers += this.columnHelpers[j][index];
        stringifiedHelpers += ' ';
      }

      console.log(stringifiedHelpers);
    }

    // Prints row helpers and tiles
    for (let [rowIndex, rowValue] of array.entries()) {
      let stringifiedRow = '';

      // Prints row helpers
      for (let i = 0; i < (this.width + 1) / 2; i++) {
        let index = Math.floor(
          this.rowHelpers[rowIndex].length - (this.width + 1) / 2 + i
        );

        if (index < 0) {
          stringifiedRow += '  ';
          continue;
        }

        stringifiedRow += this.rowHelpers[rowIndex][index];
        stringifiedRow += ' ';
      }

      // Cuts off margin from row helpers and tiles
      stringifiedRow = stringifiedRow.slice(0, stringifiedRow.length - 1);

      // Prints tiles
      for (let value of rowValue) {
        stringifiedRow += value ? '⬛' : '⬜';
      }

      console.log(stringifiedRow);
    }

    console.log();
  }

  printSolution(): void {
    this.print(this.solution);
  }

  printBoard(): void {
    this.print(this.board);
  }

  toggle(column: number, row: number): void {
    if (row < 0 || row >= this.height || column < 0 || column >= this.width) {
      throw new Error(
        `Invalid argument. Index must be bigger than 0 and smaller than the dimension length.`
      );
    }

    this.board[row][column] = !this.board[row][column];
  }

  check(column: number, row: number): void {
    if (row < 0 || row >= this.height || column < 0 || column >= this.width) {
      throw new Error(
        `Invalid argument. Index must be bigger than 0 and smaller than the dimension length.`
      );
    }

    this.board[row][column] = true;
  }

  uncheck(column: number, row: number): void {
    if (row < 0 || row >= this.height || column < 0 || column >= this.width) {
      throw new Error(
        `Invalid argument. Index must be bigger than 0 and smaller than the dimension length.`
      );
    }

    this.board[row][column] = false;
  }

  encode(): string {
    let urlQuery = `${this.width}&${this.height}&`;

    let gameHash = '';

    for (let row of this.solution) {
      let rowHash = '';

      for (let cell of row) {
        rowHash += cell ? '1' : '0';
      }

      // Calculates max base 36 chars needed to describe the row for the given board width, ie. smallest 36^x that is greater than 2^width
      let power = Math.ceil(Math.log(2 ** this.width) / Math.log(36));

      rowHash = parseInt(rowHash, 2).toString(36).padStart(power, '0');
      gameHash += rowHash;
    }

    urlQuery += gameHash;
    return urlQuery;
  }

  static validUrl(urlQuery: string): boolean {
    const regex = /^[1-9]|10&[1-9]|10&[a-zA-Z]+$/;

    return regex.test(urlQuery);
  }

  static decode(urlQuery: string): Nonogram {
    if (!Nonogram.validUrl(urlQuery)) {
      throw new Error('URL needs to be in a number&number&hash format');
    }

    let [w, h, hash] = urlQuery.split('&');
    let width = Number(w);
    let height = Number(h);

    let solution: boolean[][] = Array(height)
      .fill(null)
      .map(() => []);

    let level = '';

    const power = Math.ceil(Math.log(2 ** width) / Math.log(36));

    for (let i = 0; i < height * power; i += power) {
      level += parseInt(hash.slice(i, i + power), 36)
        .toString(2)
        .padStart(width, '0');
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const index = i * width + j;
        solution[i][j] = level[index] === '1' ? true : false;
      }
    }

    return new Nonogram(solution);
  }
}

let solution = [
  [true, false, true, true, true],
  [false, false, false, false, true],
  [false, false, true, false, true],
  [true, false, false, false, false],
  [false, true, true, true, true],
];
