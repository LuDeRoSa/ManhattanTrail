import React, { Component } from "react";
import { connect } from "react-redux";
import { updateQuiz } from "../store/quiz.js";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField"; //another form , used for blank boxes
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Menu } from "@material-ui/core";

/// so basically we had everything before in terms of the select and the dropdown
//handle submit inside the single question
//that will just send a score of 1 or 0 to the question
// handle change for whatever the user clicks
// conditional logic - once a user has submitted, they can't change their mind. - gray out the question box so they can't change it - CLASS NAME CHANGING STUFF HERE
// OR CONDITIONALLY RENDER THINGS.
//
class SingleQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      played: false,
      right_wrong: [],
      question: "",
      clickCount: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //<SingleQuestion keys={} question={} points=0 played='false'

  handleChange(ev) {
    this.setState({
      clickCount: (this.state.clickCount += 1),
    });

    console.log(ev.target.value);
    let questionObj = this.props.question;
    // console.log("question Object", questionObj);
    let userResponse = ev.target.value;
    let answersArray = questionObj.answers;
    let right_wrong = [];

    for (let i = 0; i < answersArray.length; i++) {
      let currentObj = answersArray[i];
      console.log("curernt obj", currentObj);
      if (userResponse === currentObj.answer) {
        if (currentObj.isCorrect === true) {
          // if the user, selected more than once, must stop incrementing
          if (this.state.clickCount === 1) {
            this.setState((state) => {
              return { points: state.points + 1 };
              right_wrong.push(true);
            });
          }
        } else {
          console.log("this was the wrong answer");
        }
      }
    }
    this.setState({
      right_wrong: right_wrong,
    });
  }

  /// send the changes to our database/backend
  handleSubmit(ev) {
    ev.preventDefault();
    this.setState((state) => {
      return { played: true };
    });
    this.props.updateQuiz(this.state.points);
    // console.log("the following points", this.state.points);
  }

  render() {
    // console.log("THE STATE", this.state);
    // console.log("this is the props we are getting", this.props);
    const { question } = this.props;
    // console.log("this is the questioon obj destrcutured!!!", question);
    // console.log("this is right", this.state.right_wrong);

    // console.log(question.question);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <InputLabel>
            {question.question}
            <Select
              name={"question"}
              value={this.state.question}
              onChange={this.handleChange}
            >
              <MenuItem
                value="Pick a choice!"
                disabled={this.state.played === true}
              >
                Pick a choice!
              </MenuItem>
              {question.answers.map((answerObj, index) => (
                <MenuItem
                  name={answerObj.answer}
                  value={answerObj.answer}
                  disabled={this.state.played === true}
                  key={index}
                  // value={answerObj.answer}
                >
                  {answerObj.answer}
                </MenuItem>
              ))}
            </Select>
          </InputLabel>

          {this.state.played === true ? (
            <input className="submit-btn" type="submit" value="Submit" />
          ) : (
            <input className="" type="submit" value="Submit" />
          )}
        </form>
      </div>
    );
  } //close render
} //close class

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateQuiz: (points) => dispatch(updateQuiz(points)),
  };
};
export default connect(mapState, mapDispatch)(SingleQuestion);