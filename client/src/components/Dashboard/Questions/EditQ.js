import React, { Component } from 'react'
import RichTextEditor, { stateToHTML } from "react-rte";
import { Connect } from 'react-redux';
import { Dispatch } from 'redux';
import parse from 'html-react-parser'
import { updatingbody } from '../../../features/QuestionBodySlice';

class EditQ extends Component {
    state = {
      value: RichTextEditor.createValueFromString(this.props.body,'html')
    };
    // dispatch = new Dispatch()
    onChange = value => {
      this.setState({value});

      if (this.props.onChange) {
        // Send the changes up to the parent component as an HTML string.
        // This is here to demonstrate using `.toString()` but in a real app it
        // would be better to avoid generating a string on each change.
        this.props.onChange(
          value.toString('html')
        );
      }
    };
  
    render() {
     
      return (
        <div>
          <RichTextEditor value={this.state.value} onChange={this.onChange} height={3400} />
          
          {//this.state.value.toString("html")
          }
          {
            // this.props.dispatch(updatingbody({
            //   body: this.state.value.toString("html")
            // }))
          }
        </div>
      );
    }
  }
  
  export default EditQ;