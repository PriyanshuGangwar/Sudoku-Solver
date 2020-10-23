import React, {Component} from 'react';
import SudokuBoard from './SudukoBoard';
import generator from 'sudoku';
import { Jumbotron, Button } from 'reactstrap';
//window.generator = generator;

function GenerateSudoku(){
    var rows = generator.makepuzzle();
    console.log(rows);
    const board = { rows : []};

    for(var i = 0; i < 9 ; i++){
      const row = {cols: []}; 
      for(var j = 0; j < 9 ; j++){
        var val = rows[i*9 + j];
        if(val!==null)
          val+=1;
        const col = {
          row: i,
          col: j,
          val: val,
          readonly: val!==null
        };
        row.cols.push(col)
      }
      board.rows.push(row);
    }

    return board;
}

class Main extends Component{
    constructor(props){
      super(props)
      this.state = {
          board: GenerateSudoku()
        }
    }

    render() {
      return(
        <div className = "Container">
          <Jumbotron>
            <h1>Suduko</h1>
          </Jumbotron>
          <SudokuBoard board = {this.state.board} />
        </div>
      )
    }
}

export default Main;