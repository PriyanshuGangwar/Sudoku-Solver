import React, {Component} from 'react';
import SudukoBoard from './SudukoBoard';
import SudukoSolver from './SudukoSolver';
import generator from 'sudoku';
import { Button, Jumbotron } from 'reactstrap';

window.generator = generator;

function GenerateSudoku(){
    var rows = generator.makepuzzle();
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
      this.state ={
          board: GenerateSudoku(),
          to : 0
      }
    }

    
    handleChange = (event)=>{
      var board = this.state.board;
      board.rows[event.col.row].cols[event.col.col].val = event.val;
      this.setState({
        board: board
      })
    }

    handleChangeSolver = (event) =>{
      const board = event.board;
      this.setState({
        board: board
      })
    }

    Reset = () =>{
      const board = GenerateSudoku();
      this.setState({
        board: board
      })
    }

    render() {
      
      return(
        <div className = "Container">
          <Jumbotron style = {{backgroundColor:'#6699ff'}}>
            <p id = "heading">Suduko</p>
          </Jumbotron>
          <SudukoBoard board = {this.state.board} onChange = {this.handleChange} />
          <div className = "button"><Button color="danger" onClick = {() => this.Reset()} style ={{marginLeft: '20px' ,marginRight: '20px',marginBottom: '10px'}} >Reset</Button>
            <SudukoSolver board = {this.state.board} onChange = {this.handleChangeSolver} to = {this.to}/>
            </div>
        </div>
      )
    }
}

export default Main;