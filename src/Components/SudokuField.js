import React, {Component} from 'react';

class Field extends Component{

    constructor(props){
        super(props)

       // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        if(event.target.value > 9)
        event.target.value = ""
        const value = event.target.value === "" ? "" : parseInt(event.target.value,10);
        this.props.onChange({...this.props, val: value});
    }

    render(){
        const field = this.props;
       // console.log("Field= ",field);
        const id = field.col.row*9 + field.col.col;
        var border_top = 0.001,border_left = 0.001,border_right = 0.001,border_bottom = 0.001;
        var index = id%27;
        if(index<9)
            border_top = 0.1;   
        else if(index >= 18)
            border_bottom = 0.1;
        

        if(index%3 === 0 )
            border_left = 0.1;
        else if((index-2)%3 === 0 )
            border_right = 0.1;
        

        return(
           <input 
            id = {id} 
            className = "field" 
            value = {field.col.val || ""} 
            readOnly = {field.col.readonly} 
            style={{ borderTopWidth:`${border_top}em`, 
                    borderBottomWidth: `${border_bottom}em`, 
                    borderRightWidth: `${border_right}em`, 
                    borderLeftWidth: `${border_left}em`, 
                    backgroundColor: field.col.readonly ? "#72A4D2" : "",
                    color: field.col.readonly ? "black" : "	#686868" }}
            onChange = {this.handleChange} />
        )
    }
}

export default Field;