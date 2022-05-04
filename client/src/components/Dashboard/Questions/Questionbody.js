import React from 'react'
import { useState } from 'react';
import RichTextEditor, { stateToHTML } from "react-rte";
import { useDispatch } from 'react-redux';
import { updatingbody } from '../../../features/QuestionBodySlice';

const Questionbody = () => {
    const [state, setState] = useState({value:RichTextEditor.createEmptyValue()});

    const onChange = value =>{
        console.log({value})
        // setState({value})
    }
  return (
    <div>
    <RichTextEditor value={state.value} onChange={(e)=>onChange(e.target)} />
          {//state.toString("html")
          }
    </div>
  )
}

export default Questionbody