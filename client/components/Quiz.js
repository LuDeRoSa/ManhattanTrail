import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, updateQuiz } from '../store/quiz';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.auth.id,
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      points: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuiz();
  }

  handleQuestionChange(ev) {
    //before you set state, determine whether answer is true or false. and then pass in the value and an additional boolean value such as true or false
    let quizArray = this.props.quiz;
    // let currentQuestion = ev.target.name;
    // console.log("quiz Array", quizArray);

    let value = {};

    for (let i = 0; i < quizArray.length; i++) {
      let currentQObj = quizArray[i];
      // console.log("current Q obj in the for loop",currentQObj)
      for (let keys in currentQObj) {
        if (currentQObj[keys] === ev.target.value) {
          if (currentQObj['choice_correct_answer'] === ev.target.value) {
            console.log('points will be added to the state.points');
            this.setState((state) => {
              return { points: state.points + 1 };
            });
            console.log(this.state.points);
          }
        }
      }
    } //end for loop

    // console.log("value object",value);

    this.setState({
      [ev.target.name]: {
        [ev.target.value]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('the following points will be sent', this.state.points);
    this.props.updateQuiz(this.state.points);
  }

  render() {
    const { handleQuestionChange } = this;
    const userId = this.props.auth.id;

    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          {
            this.props.quiz.length !== 0
              ? this.props.quiz.map((currentQuestionObj, index) => {
                  return (
                    <div key={index}>
                      <label>
                        {currentQuestionObj.question}

                        <select
                          name={'question' + (index + 1)}
                          value={this.state.value}
                          onChange={handleQuestionChange}
                        >
                          <option>Pick a choice!</option>

                          <option value={currentQuestionObj.choice_a}>
                            {currentQuestionObj.choice_a}
                          </option>

                          <option value={currentQuestionObj.choice_b}>
                            {currentQuestionObj.choice_b}
                          </option>

                          <option value={currentQuestionObj.choice_c}>
                            {currentQuestionObj.choice_c}
                          </option>

                          <option
                            value={currentQuestionObj.choice_correct_answer}
                          >
                            {currentQuestionObj.choice_correct_answer}
                          </option>
                        </select>
                      </label>
                    </div>
                  );
                })
              : '' //close map
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  } //end render method
}

const mapState = (state) => {
  return {
    quiz: state.quiz,
    auth: state.auth,
  };
};

const mapDispatch = {
  fetchQuiz,
  updateQuiz,
};

// const mapDispatch = (dispatch) => {
//   return {
//     getQuiz: () => dispatch(fetchQuiz()),
//     updateQuiz: (questionObj) => dispatch(updateQuiz(questionObj)),
//   };
// };

export default connect(mapState, mapDispatch)(Quiz);
