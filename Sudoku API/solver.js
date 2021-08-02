// class Solver{
//     constructor(board = [[0,0,0,0,0,0,0,0,8], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]]){
//         this.board = board;
//     }

//     check_valid_board(){ //return boolean
//         //check row
//         function isRowValid(row){
//             let seen = new Set();
//             for (var col = 0; col < 9; col++){
//                 if (row[col] === 0){
//                     continue;
//                 }

//                 if (seen.has(row[col])){
//                     return false;
//                 }
//                 seen.add(row[col]);
//             }
//             return true;
//         }

//         //check col
//         function isColValid(board, col){
//             let seen = new Set();
//             for (var row = 0; row < 9; row++){
//                 if (board[row][col] === 0){
//                     continue;
//                 }

//                 if (seen.has(board[row][col])){
//                     return false;
//                 }
//                 seen.add(board[row][col]);
//             }
//             return true;
//         }

//         //check 3x3 grid
//         function is_Square_Valid(board, row, col){
//             let seen = new Set();
//             for (var r = row; r < row + 3; r++){
//                 for (var c = col; c < col + 3; c++){
//                     if (board[r][c] === 0){
//                     continue;
//                     }

//                     if (seen.has(board[r][c])){
//                     return false;
//                     }

//                     seen.add(board[r][c]);
//                 }
//             }
//             return true;
//         }

//         function validate_input(){
//             for (var r = 0; r < 9; r++){
//                 for (var c = 0; c < 9; c++){
//                     if ((this.board[r][c] < 0) || (this.board[r][c] > 9)){
//                         return false;
//                     }
//                 }
//             }
//             return true;
//         }

//         //valid the input, col & row & 3x3 grid
//         if (validate_input === false){
//             return false;
//         }

//         for (var i = 0; i < this.board.length; i++ ){
//             if ((isRowValid(this.board[i])) === false){
//                 return false;
//             }
//             if ((isColValid(this.board, i)) === false){
//                 return false;
//             }
//         }
//         for (var r = 0; r < this.board.length; r += 3){
//             for (var c = 0; c < this.board[0].length; c += 3){
//                 if (is_Square_Valid(this.board, r, c) === false){
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }

//     find_empty(){ //returning tuple row, col if not return Boolean
//         for (var i = 0; i < this.board.length; i ++){
//             for (var j = 0; j < this.board[0].length; j ++){
//                 if (this.board[i][j] === 0){
//                     return [i, j];
//                 }
//             }
//         }
//         return false;
//     }

//     valid_num(position=[0, 0], val){
//         var r = position[0];
//         var c = position[1];

//         //check row
//         for (var i = 0; i < 9; i ++){
//             if ((c != null) && (this.board[i][c] == val) && (i !== r)){
//                 return false;
//             }
//         }

//         //check col
//         for (var i = 0; i < 9; i ++){
//             if ((r != null) && (this.board[r][i] == val) && (i !== c)){
//                 return false;
//             }
//         }

//         //check grid
//         var box_x = Math.floor(c/3); //col grid
//         var box_y = Math.floor(r/3); //row gri

//         for (var i = box_y * 3; i < (box_y * 3 + 3); i++){
//             for (var j = box_x * 3; j < (box_x * 3 + 3); j++){
//                 if ((this.board[i][j] == val) && ((i !== r) && (j !== c))){
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }

//     solve(){
//         var find = this.find_empty;
//         if (find === false){
//             return true;
//         }

//         var row = find[0];
//         var col = find[1];

//         for (var n = 1; n < 10; n++){ //find possible number
//             if (this.valid_num([row, col], n)){
//                 this.board[row][col] = n;
//                 if (this.solve() === true){
//                     return true;
//                 }

//                 this.board[row][col] = 0; //backtrack reset the board
//                 }
//             }
//                 return false;
//             }   

//     show_answer(){
//         if (this.check_valid_board() === true){
//             solve;
//             return board;
//         }else{
//             return false;
//         }
//     }

//     get result(){
//         this.solve();
//         return this.board
//     }

// }

// var test_board = [
//     [8, 2, 7,   1, 5, 4,   3, 9, 6],
//     [9, 6, 5,   3, 2, 7,   1, 4, 8],
//     [3, 4, 1,   6, 8, 9,   7, 5, 2],

//     [5, 9, 3,   4, 6, 8,   2, 7, 1],
//     [4, 7, 2,   5, 1, 3,   6, 8, 9],
//     [6, 1, 8,   9, 7, 2,   4, 3, 5],

//     [7, 8, 6,   2, 3, 5,   9, 1, 4],
//     [1, 5, 4,   7, 9, 6,   8, 2, 3],
//     [2, 3, 9,   8, 4, 0,   5, 0, 0]
// ]

var Board = new Object();
Board.board = input;

module.exports = {
check_valid_board: function(){ //return boolean
    function isRowValid(row){
      let seen = new Set();
      for (var col = 0; col < 9; col++){
        if (row[col] === 0){
          continue;
        }
  
        if (seen.has(row[col])){
          return false;
        }
        seen.add(row[col]);
      }
      return true;
    }
  
    //check col
    function isColValid(board, col){
      let seen = new Set();
      for (var row = 0; row < 9; row++){
        if (board[row][col] === 0){
          continue;
        }
  
        if (seen.has(board[row][col])){
          return false;
        }
        seen.add(board[row][col]);
      }
      return true;
    }
  
    //check 3x3 grid
    function is_Square_Valid(board, row, col){
      let seen = new Set();
      for (var r = row; r < row + 3; r++){
        for (var c = col; c < col + 3; c++){
          if (board[r][c] === 0){
            continue;
          }
  
          if (seen.has(board[r][c])){
            return false;
          }
  
          seen.add(board[r][c]);
        }
      }
      return true;
    }
  
    function validate_input(){
      for (var r = 0; r < 9; r++){
        for (var c = 0; c < 9; c++){
          if ((Board.board[r][c] < 0) || (Board.board[r][c] > 9)){
            return false;
          }
        }
      }
      return true;
    }
  
    //valid the input, col & row & 3x3 grid
    if (validate_input() === false){
      return false;
    }
  
    for (var i = 0; i < Board.board.length; i++ ){
      if ((isRowValid(Board.board[i])) === false){
        return false;
      }
      if ((isColValid(Board.board, i)) === false){
        return false;
      }
    }
    for (var r = 0; r < Board.board.length; r += 3){
      for (var c = 0; c < Board.board[0].length; c += 3){
        if (is_Square_Valid(Board.board, r, c) === false){
          return false;
        }
      }
    }
    return true;
  },
  
  find_empty: function(){ //returning tuple row, col if not return Boolean
    for (var i = 0; i < Board.board.length; i ++){
      for (var j = 0; j < Board.board[0].length; j ++){
        if (Board.board[i][j] === 0){
          return [i, j];
        }
      }
    }
    return false;
  },
  
  valid_num: function(position, val){
    r = position[0];
    c = position[1];
  
    //check row
    for (var i = 0; i < 9; i ++){
      if ((Board.board[i][c] == val) && (i !== r)){
        return false;
      }
    }
  
    //check col
    for (var i = 0; i < 9; i ++){
      if ((Board.board[r][i] == val) && (i !== c)){
        return false;
      }
    }
  
    //check grid
    var box_x = Math.floor(c/3); //col grid
    var box_y = Math.floor(r/3); //row gri
  
    for (var i = box_y * 3; i < (box_y * 3 + 3); i++){
      for (var j = box_x * 3; j < (box_x * 3 + 3); j++){
        if ((Board.board[i][j] == val) && ((i !== r) && (j !== c))){
          return false;
        }
      }
    }
    return true;
  },
  
  solve: function (){
    var find = find_empty();
    if (find === false){
      return true;
    }
  
    var row = find[0];
    var col = find[1];
  
    for (var n = 1; n < 10; n++){ //find possible number
      if (valid_num([row, col], n) === true){
        Board.board[row][col] = n;
        if (solve() === true){
          return true;
        }
  
        Board.board[row][col] = 0; //backtrack reset the board
      }
    }
    return false
  }
}

module.exports = Solver;

const ans = new Solver(test_board);
console.log(ans.result);
console.log(ans.board);