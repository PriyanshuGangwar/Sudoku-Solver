import React, {Component} from 'react';
import SudokuField from './SudokuField';

class Board extends Component{
    

    render(){
        const board = this.props.board;
        //console.log(board);
        return(
            <div className = "container">
                <div className = "board">
                    {board.rows.map(row => {
                        return(
                            <div className = "row" key = {row.index}>
                                {row.cols.map(col => {
                                    return (<SudokuField col = {col} key = {col.index}></SudokuField> );
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
        

    }
}

export default Board;