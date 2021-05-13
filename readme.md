# Nonogram

This project is a web application allowing people to play, create and share their favourite Nonogram levels.

## About

Nonogram, also known as Paint by Numbers or Picross is a logic puzzle game in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden picture. [Wikipedia](https://en.wikipedia.org/wiki/Nonogram)

## API

The project consists of both a Nonogram class that can be used for various projects and a web application based around it.

To create a new board simply import the class and instantiate it with either random values or a solved board.

```js
import Nonogram from './nonogram';

const nono = new Nonogram([
  [true, false],
  [false, true],
]);
```

Random values:

```js
let nono = Nonogram.random();
nono = Nonogram.random(5);
nono = Nonogram.random(4, 6);
```

It also consists of methods used to encode and decode the board into a short string so you can share it easily without the need of a database.

```js
const nono = Nonogram.random();
const nonoHash = nono.encode();

const nonoCopy = Nonogram.decode(nonoHash);
```

The board can be interacted with with three methods.

```js
nono.toggle(2, 4);
nono.check(0, 3);
nono.uncheck(1, 5);
```

You can check if a certain column, row or the entire board is solved.

```js
nono.solvedRow(2);
nono.solvedColumn(0);
nono.solved;
```

The class also has getter methods for if you ever need to check its size, values or helper numbers.

```js
const [width, height] = nono.size;
const solvedBoard = nono.cells;
cons helpers = nono.helpers;
```

Last but not least it has two public methods for printing the current board or solution into the console.

```js
nono.printSolution();
nono.printBoard();
```

## Game

The website ([Nonogram](dokanix.github.io/Nonogram)) is an implementation of the game with various features such as:

- Playing a randomly sized level
- Playing a level with hand picked size
- Saving and replaying your favourite levels
- Sharing levels via a generated URL
- Creating your own custom levels (TO-DO)
