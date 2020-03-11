/**
 * @file solutionsNQueens1.js
 * @author Sergio Tabares Hernández <alu0101124896@ull.edu.es>
 * @since Winter 2020
 * College: University of La Laguna
 * Course: Computer Science - Interactive Aplication Programing
 * @description This program calculates the number of posible solutions of the N queens problem and the execution time. More info at https://en.wikipedia.org/wiki/Eight_queens_puzzle
 */

"use strict"

/**
 * @description Function that generates the slope and displacement of a line between two queens
 *
 * @param {{row, column}} firstQueen - The first of the queens
 * @param {{row, column}} secondQueen - The second of the queens
 * @returns {{slope, displacement}} Returns the slope and the displacement of the line
 */
function lineFromTo(firstQueen, secondQueen) {
  let slope = (secondQueen.column - firstQueen.column) / (secondQueen.row - firstQueen.row);
  let displacement = (slope * (-firstQueen.row)) + firstQueen.column;

  return { slope: slope, displacement: displacement };
}

/**
 * @description Function that checks if the queen is in a line
 *
 * @param {number} row - Candidate row to input a queen
 * @param {number} column - Candidate column to input a queen
 * @param {{slope, displacement}} line - Candidate line to be part of
 * @returns {boolean} Returns true if the queen is in the line
 */
function isPointInLine(row, column, line) {
  return ((line.slope * row + line.displacement - column) === 0);
}

/**
 * @description Function that checks if the queen is in line with another two
 *
 * @param {number} row - Candidate row to input a queen
 * @param {number} column - Candidate column to input a queen
 * @returns {boolean} Returns true if the queen is not in line
 */
function checkLine(row, column) {
  if (queens.length < 2) {
    return true;
  }
  else {
    for (let firstQueen = 0; firstQueen < queens.length - 1; firstQueen++) {
      for (let secondQueen = firstQueen + 1; secondQueen < queens.length; secondQueen++) {
        if (isPointInLine(row, column, lineFromTo(queens[firstQueen], queens[secondQueen]))) {
          return false;
        }
      }
    }
    return true;
  }
}

/**
 * @description Function that checks if the queen can be placed safely
 *
 * @param {number} row - Candidate row to input a queen
 * @param {number} column - Candidate column to input a queen
 * @returns {boolean} Returns true if the queen can be placed safely
 */
function isSafe(row, column) {
  for (let columnIterator = 0; columnIterator < column; columnIterator++) {
    if (board[row][columnIterator]) {
      return false;
    }
  }
  for (let rowIterator = row, columnIterator = column; rowIterator >= 0 && columnIterator >= 0; rowIterator-- , columnIterator--) {
    if (board[rowIterator][columnIterator]) {
      return false;
    }
  }
  for (let rowIterator = row, columnIterator = column; columnIterator >= 0 && rowIterator < board.length; rowIterator++ , columnIterator--) {
    if (board[rowIterator][columnIterator]) {
      return false;
    }
  }
  return checkLine(row, column);
}

/**
 * @description Function that inserts a queen into the board
 *
 * @param {number} row - Row position of the queen in the board
 * @param {number} column - Column position of the queen in the board
 */
function insertQueen(row, column) {
  board[row][column] = 1;
  queens.push({row: row, column: column});
}

/**
 * @description Function that extracts a queen out of the board
 *
 * @param {number} row - Row position of the queen in the board
 * @param {number} column - Column position of the queen in the board
 */
function extractQueen(row, column) {
  board[row][column] = 0;
  queens.pop();
}

/**
 * @description Recursive function that walks along the board searching for possible solutions
 * 
 * @param {number} column - Candidate column to input a queen
 * @returns {boolean} Returns true if has found at least a solution
 */
function placeQueens(column) {
  if (column === board.length) {
    // printSolution();
    numOfSolutions++;
    return true;
  } else {
    let resultFound = false;
    for (let rowIterator = 0; rowIterator < board.length; rowIterator++) {
      if (isSafe(rowIterator, column, board)) {
        insertQueen(rowIterator, column);
        resultFound = placeQueens(column + 1) || resultFound;
        extractQueen(rowIterator, column);
      }
    }
    return resultFound;
  }
}

/**
 * @description Function that prints out the board with a solution
 */
function printSolution() {
  let boardString = '  ';
  for (let rowIterator = 0; rowIterator < board.length; rowIterator++) {
    boardString += rowIterator + ' ';
  }
  boardString += '\n';
  for (let rowIterator = 0; rowIterator < board.length; rowIterator++) {
    boardString += rowIterator + ' ';
    for (let columnIterator = 0; columnIterator < board.length; columnIterator++) {
      if (board[rowIterator][columnIterator]) {
        boardString += 'Q ';
      } else {
        boardString += '· '
      }
    }
    boardString += '\n';
  }
  console.log(boardString);
}

/**
 * @description Function that initializes the board to 0 
 *
 * @param {number} BOARD_SIZE - Size of board
 */
function initializeBoard(BOARD_SIZE) {
  for (let rowIterator = 0; rowIterator < BOARD_SIZE; rowIterator++) {
    let tempBoardRow = [];
    for (let columnIterator = 0; columnIterator < BOARD_SIZE; columnIterator++) {
      tempBoardRow[columnIterator] = 0;
    }
    board[rowIterator] = tempBoardRow;
  }
}

/**
 * @description Function that starts the search of the solutions to the problem
 *
 * @param {number} BOARD_SIZE - Size of board
 */
function solvePuzzle(BOARD_SIZE) {
  initializeBoard(BOARD_SIZE);
  if (placeQueens(0) === false) {
    console.log('Solucion no encontrada');
  } else {
    console.log('Se han encontrado', numOfSolutions, 'soluciones')
  }
}

/**
 * @description Function that reads the parameters from the command line and calls the function that starts to seach the solutions to the problem.
 */
function main() {

  // Charging perf_hooks library
  const {
    performance,
    PerformanceObserver
  } = require('perf_hooks');

  if (process.argv.length !== 3 || isNaN(process.argv[2])) {
    console.log('Error: Ejecute este programa aportando como argumento en la linea de comandos exactamente un numero entero.');
  } else {
    const BOARD_SIZE = Number(process.argv[2]);
    const START_TIME = performance.now();
    solvePuzzle(BOARD_SIZE);
    const END_TIME = performance.now();
    console.log('El programa ha tardado', (Math.round((END_TIME - START_TIME)) / 1000), 'segundos');
  }
}

let board = [];
let queens = [];
let numOfSolutions = 0;
main();