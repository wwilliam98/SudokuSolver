const express = require ('express');
const app = express();
const mongoose = require("mongoose");
const Counter = require("./models/counter");
const config = require('./config');

app.set ('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

var connectionString = config.config.mongoKey;
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

var testboard  = [[1,0,0,0,0,0,0,0,8], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,1]];
app.get('/', function(req, res){
    Counter.find()
        .then((result) =>{
            if (result.length !== 0){
                res.render ('index', {count : result[0]['countSolve'], title: 'Solved Sudoku'})
            }
            else{
                res.render ('index', {count : 0, title: 'Solved Sudoku'})
            }
        })
});

app.get('/solve', function(req, res){
    res.render('index', {arr : 1});

});

app.get('/countSolve', (req, res) =>{
    Counter.find()
        .then((result) =>{
            res.render ('solvedSudoku', {count : result[0]['countSolve'], title: 'Solved Sudoku'})
        })
});

app.post('/solve', function(request,response){
    var input = request.body;
    
    //Increment countSolve in Database
    Counter.countDocuments({}, function(err, count){
        if (count === 0){
            const counter = new Counter({
                countSolve: 1
            });
            counter.save()
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
            var data = SolveBoard(input);
            response.send([data, 1]);
            
        }
        else{
            Counter.find()
                .then(async result => {
                    var data = SolveBoard(input);
                    var id = result[0]["_id"];
                    newCount = result[0]["countSolve"] + 1;
                    await Counter.findByIdAndUpdate({_id: id}, {countSolve: newCount});
                    response.send([data, newCount]);
                    // response.render ('index', {count : newCount})
                });
        }
    });
});

function SolveBoard(input){
    //Solve the Board
    var Board = new Object();
    Board.board = input;
    
    function check_valid_board(){ //return boolean
        //check row
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
      
      }
      
      function find_empty(){ //returning tuple row, col if not return Boolean
        for (var i = 0; i < Board.board.length; i ++){
          for (var j = 0; j < Board.board[0].length; j ++){
            if (Board.board[i][j] === 0){
              return [i, j];
            }
          }
        }
        return false;
      }
      
      function valid_num(position, val){
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
      }
      
      function solve(){
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

    solve();
    
    // console.log(Board.board);
    return Board.board;
}
