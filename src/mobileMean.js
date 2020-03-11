/**
 * @file solutionsNQueens1.js
 * @author Sergio Tabares Hernández <alu0101124896@ull.edu.es>
 * @since Winter 2020
 * College: University of La Laguna
 * Course: Computer Science - Interactive Aplication Programing
 * @description This program takes out the mobile means from a vector
 */

"use strict"

/**
 * @description Function that takes out the mobile means with the indicated retard time
 * 
 * @param {number[]} timeSerie - Array of elements to take out the mobile means
 * @param {number} p - Retard time
 */
function mobileMean(timeSerie, p) {
  for (let iterator = p; iterator < timeSerie.length(); iterator++) {
    timeSerie.slice(iterator - p, iterator);
  }
}

/**
 * @description Function that reads the parameters from the command line and calls the function thattakes out the mobile means
 */
function main() {
  if (process.argv.length !== 2) {
    console.log('Error: Ejecute este programa sin aportar ningun argumento en la line de comandos.');
  } else {
    mobileMean([5, 2, 2, 8, -4, -1, 2], 3);
  }
}