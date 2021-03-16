import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Menu } from '@material-ui/core';
///in this component we will tkae care of the form
//we'd stil need a handle submit
//and a handle change
//and choices!!!!
/// so basically we had everything before in terms of the select and the dropdown
//handle submit inside the single question
//that will just send a score of 1 or 0 to the question
// handle change for whatever the user clicks
// conditional logic - once a user has submitted, they can't change their mind. - gray out the question box so they can't change it - CLASS NAME CHANGING STUFF HERE
// OR CONDITIONALLY RENDER THINGS.
//
export const SingleQuestion = (props) => {
  console.log("the props inside the single quetsion component!",props); //props.question.question
   const {question} = props;
   console.log("this is the questioon obj destrcutured!!!", question)

  const handleChange = () => {
    console.log("random test");
  }

  return (
    <div>

      <label>{question.question}

      <select name={"question"} value={question.question} onChange={handleChange}>

      <option >Pick a choice!</option>
      {
        question.answers.map((answerObj, index) => (

              <option key={index}value={answerObj.answer}>{answerObj.answer}</option>

          ))
      }

      </select>

    </label>

    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};



export default connect(mapState)(SingleQuestion);
