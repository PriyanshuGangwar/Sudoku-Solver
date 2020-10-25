import React, {Component} from 'react';
import {Button} from 'reactstrap';

var animations = []
var to;

class Solver extends Component{
    

    solver(board){
        var v = suduko(board);
        if(!v)
            alert("Wrong Entry!!!");
            
        animations.map(bo => {
            setTimeout(()=>{ 
                this.props.onChange({...this.props, board: bo, to:to});
            },0.01);
        })
            
    }
    
    solution(board){
            var v = sudukos(board);
            if(!v)
                alert("Wrong Entry!!!");
            
            this.props.onChange({...this.props, board: board});
        
    }
    
   

    render(){
        var {board} = this.props;
        return(
            <div>
                <Button color="primary" onClick = {() => this.solver(board)} style ={{marginLeft: '20px' ,marginRight: '20px',marginBottom: '10px'}} >Solve</Button>
                <Button color="primary" onClick = {() => this.solution(board) }  style ={{marginLeft: '20px' ,marginRight: '20px', marginBottom: '10px'}} >Solution</Button>
            </div>
        );
        

    }
}

export default Solver;


function suduko(board){
    let points = {i:0,j:0};
    let deepClone = JSON.parse(JSON.stringify(board));
    animations.push(deepClone);
    var t = isempty(board,points);
    if(!t)
    {
        return true;
    }
    var i = points.i;
    var j = points.j;
    for(var n=1;n <= 9;n++)
     if(isvalid(n,board,i,j))
        { board.rows[i].cols[j].val = n;
          if(suduko(board))
            return true;
          else
          board.rows[i].cols[j].val = null;
        }
    return false;
}


function sudukos(board){
    let points = {i:0,j:0};
    var t = isempty(board,points);
    if(!t)
    {
        return true;
    }
    var i = points.i;
    var j = points.j;
    for(var n=1;n <= 9;n++)
     if(isvalid(n,board,i,j))
        { board.rows[i].cols[j].val = n;
          if(sudukos(board))
            return true;
          else
          board.rows[i].cols[j].val = null;
        }
    return false;
}


function isempty(board,points)
{
    for(var x=0;x<9;x++)
      for(var y=0;y<9;y++)
        {
            if(board.rows[x].cols[y].val === null)
               {
                   points.i=x;
                   points.j=y;
                   return true;
               }
        }
    return false;
}

function checkbox(n,board, i,j)
{
    for(var x=0;x<3;x++)
      for(var y=0;y<3;y++)
      {
          if(board.rows[i+x].cols[j+y].val  === n)
            return false;
      }
    return true;
}

function isvalid(n,board, x,y)
{
    for(var i =0;i<9;i++)
    {
        if(board.rows[i].cols[y].val ===n || board.rows[x].cols[i].val === n)
            return false;
    }

    if(x<3)
    {
       if(y<3)
       {
           if(!checkbox(n,board,0,0))
              return false;
       }
       else if(y<6)
       {
              if(!checkbox(n,board,0,3))
              return false;
        }
       else
       {
           if(!checkbox(n,board,0,6))
              return false;
       }
    }

    else if(x<6)
    {
       if(y<3)
       {
           if(!checkbox(n,board,3,0))
              return false;
       }
       else if(y<6)
       {
              if(!checkbox(n,board,3,3))
              return false;
        }
       else
       {
           if(!checkbox(n,board,3,6))
              return false;
       }
    }

    else
    {
       if(y<3)
       {
           if(!checkbox(n,board,6,0))
              return false;
       }
       else if(y<6)
       {
              if(!checkbox(n,board,6,3))
              return false;
        }
       else
       {
           if(!checkbox(n,board,6,6))
              return false;
       }
    }

    return true;
}