import React, { Component } from 'react'
import RichTextEditor, { stateToHTML } from "react-rte";
import parse from 'html-react-parser'
class AskQ extends Component {
    state = {
      value: RichTextEditor.createEmptyValue()
    };
  
    onChange = value => {
      this.setState({ value });
      if (this.props.onChange) {
        // Send the changes up to the parent component as an HTML string.
        // This is here to demonstrate using `.toString()` but in a real app it
        // would be better to avoid generating a string on each change.
        this.props.onChange(this.props.onChangeData1(value.toString("html")));
  
        // handleSubmit = () => {
        const { editorState } = this.props;
        // For testing purposes
        console.log(stateToHTML(editorState.getCurrentContent()));
        // }
      }
    };
  
    render() {
      const { onChangeData } = this.props;
      const val = this.state.value.toString("html")
      var e = {
          target : {
            name : "body",
            value : val
          }
      }
        // onChangeData(e)
      // let html = stateToHTML(this.state.value);
      return (
        <div>
          <RichTextEditor value={this.state.value} onChange={this.onChange} />
          
          {this.state.value.toString("html")}
          
        </div>
      );
    }
  }
  
  export default AskQ;