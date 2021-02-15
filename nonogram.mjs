class Nonogram {
  #solution;
  #board;
  #rowHelpers;
  #columnHelpers;
  #width;
  #height;

  /**
   * Constructs a Nanogram for the given solution
   * @param {Boolean[][]} solution Board with boolean values
   */
  constructor(solution) {
    this.#validateBoard(solution);
    this.#fillBoards(solution);
    this.#generateHelpers();
  }

  /**
   * Validates the dimensions to be in the required range
   * @param {Integer} width Width of the board to be validated
   * @param {Integer} height Height of the board to be validated
   */
  #validateSize(width, height = 5) {
    if (width < 1 || height > 9 || width > 9 || width < 1) {
      throw new Error(
        `Invalid argument. The length of an axis must be between 2 and 10.`
      );
    }
  }

  /**
   * Validates the argument for the given size and type
   * @param {Boolean[][]} solution Board with boolean values
   */
  #validateBoard(solution) {
    if (!Array.isArray(solution)) {
      throw new Error(
        `Invalid argument. Must be an array of equal-sized arrays containing a single boolean value.`
      );
    }

    const height = solution.length;
    const width = solution[0].length;

    this.#validateSize(width, height);

    this.#height = height;
    this.#width = width;

    for (let row of solution) {
      if (!Array.isArray(solution)) {
        throw new Error(
          `Invalid argument. Must be an array of equal-sized arrays containing a single boolean value.`
        );
      }

      if (row.length != this.#width) {
        throw new Error(
          `Invalid argument. Every row of the array must be of the same length.`
        );
      }
    }
  }

  /**
   * Fills the board with false values and the solution with the given values
   * @param {Boolean[][]} solution Board with boolean values
   */
  #fillBoards(solution) {
    this.#solution = Array(this.#height)
      .fill(null)
      .map((x) => Array(this.#width));

    for (let [rowIndex, rowValue] of solution.entries()) {
      for (let [columnIndex, columnValue] of rowValue.entries()) {
        this.#solution[rowIndex][columnIndex] = columnValue;
      }
    }

    this.#board = Array(this.#height)
      .fill(null)
      .map((x) => Array(this.#width).fill(false));
  }

  /**
   * Generates numbers matching the solution
   */
  #generateHelpers() {
    this.#rowHelpers = Array(this.#height)
      .fill(null)
      .map((x) => []);
    this.#columnHelpers = Array(this.#width)
      .fill(null)
      .map((x) => []);

    // Generate Row Helpers
    for (let [rowIndex, rowValue] of this.#solution.entries()) {
      let nextValue = true;

      for (let value of rowValue) {
        let lastIndex = this.#rowHelpers[rowIndex].length - 1;

        if (value && nextValue) {
          this.#rowHelpers[rowIndex].push(1);
          nextValue = false;
        } else if (value) {
          this.#rowHelpers[rowIndex][lastIndex]++;
        } else {
          nextValue = true;
        }
      }
    }

    // Generate Column Helpers
    for (let columnIndex = 0; columnIndex < this.#width; columnIndex++) {
      let nextValue = true;

      for (let rowIndex = 0; rowIndex < this.#height; rowIndex++) {
        let lastIndex = this.#columnHelpers[columnIndex].length - 1;
        let value = this.#solution[rowIndex][columnIndex];

        if (value && nextValue) {
          this.#columnHelpers[columnIndex].push(1);
          nextValue = false;
        } else if (value) {
          this.#columnHelpers[columnIndex][lastIndex]++;
        } else {
          nextValue = true;
        }
      }
    }
  }

  /**
   * Returns a Nonogram object with random values
   * @param {Integer} width Width of the board
   * @param {Integer} height Height of the board
   * @returns {Nonogram}
   */
  static random(width, height) {
    height = height ?? width;

    let randomBoard = Array(height)
      .fill(null)
      .map((x) => Array(width).fill(false));

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        randomBoard[i][j] = Math.random() > 0.5 ? true : false;
      }
    }

    return new Nonogram(randomBoard);
  }

  /**
   * Prints the given array to the console
   * @param {Array} array 2D Array of boolean values
   */
  #print(array) {
    // Prints column helpers
    for (let i = 0; i < (this.#height + 1) / 2; i++) {
      let stringifiedHelpers = "";

      for (let j = 0; j < (this.#width + 1) / 2; j++) {
        stringifiedHelpers += "  ";
      }

      for (let j = 0; j < this.#width; j++) {
        let index = Math.floor(
          this.#columnHelpers[j].length - (this.#height + 1) / 2 + i
        );

        if (index < 0) {
          stringifiedHelpers += "  ";
          continue;
        }

        stringifiedHelpers += this.#columnHelpers[j][index];
        stringifiedHelpers += " ";
      }

      console.log(stringifiedHelpers);
    }

    // Prints row helpers and tiles
    for (let [rowIndex, rowValue] of array.entries()) {
      let stringifiedRow = "";

      // Prints row helpers
      for (let i = 0; i < (this.#width + 1) / 2; i++) {
        let index = Math.floor(
          this.#rowHelpers[rowIndex].length - (this.#width + 1) / 2 + i
        );

        if (index < 0) {
          stringifiedRow += "  ";
          continue;
        }

        stringifiedRow += this.#rowHelpers[rowIndex][index];
        stringifiedRow += " ";
      }

      // Cuts off margin from row helpers and tiles
      stringifiedRow = stringifiedRow.slice(0, stringifiedRow.length - 1);

      // Prints tiles
      for (let value of rowValue) {
        stringifiedRow += value ? "⬛" : "⬜";
      }

      console.log(stringifiedRow);
    }

    console.log();
  }

  /**
   * Prints the solution to the console
   */
  printSolution() {
    this.#print(this.#solution);
  }

  /**
   * Prints the current state of the board to the console
   */
  printBoard() {
    this.#print(this.#board);
  }

  /**
   * Toggles the tile with matching column and row
   * @param {Integer} column Column of the desired tile
   * @param {Integer} row Row of the desired tile
   */
  check(column, row) {
    if (row < 0 || row >= this.#height || column < 0 || column >= this.#width) {
      throw new Error(
        `Invalid argument. Index must be bigger than 0 and smaller than the dimension length.`
      );
    }

    this.#board[row][column] = !this.#board[row][column];
  }

  /**
   * Encodes the state of the board into an URL query that can be read later
   */
  encode() {
    let urlQuery = `${this.#width}&${this.#height}&`;

    let gameHash = "";

    for (let row of this.#solution) {
      for (let cell of row) {
        gameHash += cell ? "1" : "0";
      }
    }

    urlQuery += gameHash;

    return urlQuery;
  }

  /**
   * Parses an URL query and returns a new Nonogram based on it
   * @param {String} urlQuery An URL query in a "width&height&hash" format
   * @returns {Nonogram} A new Nonogram object with its state based on the recieved argument
   */
  static decode(urlQuery) {
    console.log(urlQuery);
    let [width, height, hash] = urlQuery.split("&");

    let solution = Array(+height)
      .fill(null)
      .map((x) => []);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const index = i * width + j;
        solution[i][j] = hash[index] === "1" ? true : false;
      }
    }

    return new Nonogram(solution);
  }

  /**
   * Checks whether the current state of the board matches the solution
   * @returns {Boolean} Answer to the question whether the board is solved or not
   */
  isSolved() {
    for (let [rowIndex, rowValue] of this.#board.entries()) {
      if (rowValue.some((x, i) => x !== this.#solution[rowIndex][i])) {
        return false;
      }
    }
    return true;
  }
}

let solution = [
  [true, false, true, true, true],
  [false, false, false, false, true],
  [false, false, true, false, true],
  [true, false, false, false, false],
  [false, true, true, true, true],
];

const nono = Nonogram.random(2, 2);
nono.check(0, 1);
nono.printSolution();
nono.printBoard();
console.log(nono.isSolved());

export default Nonogram;
