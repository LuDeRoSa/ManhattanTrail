import React from "react";
import { connect } from "react-redux";
import { fetchQuiz, updateQuiz } from "../store/quiz";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
import globalScope from "./GlobalScore";
import GlobalScore from "./GlobalScore";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // question1: "",
      // question2: "",
      // question3: "",
      // question4: "",
      // question5: "",
      // points: 0,
      // right_wrong: [],
      // showResult: false,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  //1
  componentDidMount() {
    this.props.fetchQuiz(1);
    // this.props.fetchQuiz(this.props.restaurantId);

    // console.log("componentdidmount");
    // console.log(this.props.game.gameStage - 1);
  }

  // handleQuestionChange(ev) {
  //   let quizArray = this.props.quiz;

  //   let value = {};

  //   for (let i = 0; i < quizArray.length; i++) {
  //     let currentQObj = quizArray[i];
  //     for (let keys in currentQObj) {
  //       if (currentQObj[keys] === ev.target.value) {
  //         if (currentQObj["choice_correct_answer"] === ev.target.value) {
  //           // console.log("points will be added to the state.points");
  //           this.setState((state) => {
  //             return { points: state.points + 1 };
  //           });
  //           value["isCorrect"] = true;
  //           // console.log(this.state.points);
  //         } else {
  //           value["isCorrect"] = false;
  //         }
  //       }
  //     }
  //     // console.log(value);
  //   } //end for loop

  //   this.setState({
  //     [ev.target.name]: {
  //       [ev.target.value]: value,
  //     },
  //   });
  // }

  // handleSubmit(event) {
  //   //loop thru state - check is correct flag --- if correct --- populate check mark else populate "x"
  //   let currentState = this.state;
  //   let right_wrong = [];

  //   for (let keys in currentState) {
  //     let currentKey = currentState[keys];
  //     // console.log("currentKey", currentKey);

  //     if (typeof currentKey === "object") {
  //       // console.log("in the if stmt")
  //       for (let answers in currentKey) {
  //         let isCorrectObj = currentKey[answers];
  //         let bool = isCorrectObj["isCorrect"];
  //         right_wrong.push(bool);
  //       }
  //     }
  //     // console.log(right_wrong);
  //   } //close for loop

  //   this.setState({
  //     ...this.state,
  //     right_wrong: right_wrong,
  //     showResult: true,
  //   });

  //   this.props.updateQuiz(this.state.points);
  //   event.preventDefault();
  // }

  // render() {
  //   const { handleQuestionChange } = this;
  //   console.log(this.props);

  //   return (
  //     <div className="quiz">
  //       <form onSubmit={this.handleSubmit}>
  //         {this.props.quiz.length !== 0
  //           ? this.props.quiz.map((currentQuestionObj, index) => {
  //               return (
  //                 <div key={index}>
  //                   <InputLabel id="quiz-form">
  //                     {currentQuestionObj.question}

  //                     <Select
  //                       name={"question" + (index + 1)}
  //                       value={this.state.value}
  //                       onChange={handleQuestionChange}
  //                     >
  //                       <MenuItem value="">Pick a choice!</MenuItem>

  //                       <MenuItem value={currentQuestionObj.choice_a}>
  //                         {currentQuestionObj.choice_a}
  //                       </MenuItem>

  //                       <MenuItem value={currentQuestionObj.choice_b}>
  //                         {currentQuestionObj.choice_b}
  //                       </MenuItem>

  //                       <MenuItem value={currentQuestionObj.choice_c}>
  //                         {currentQuestionObj.choice_c}
  //                       </MenuItem>

  //                       <MenuItem
  //                         value={currentQuestionObj.choice_correct_answer}
  //                       >
  //                         {currentQuestionObj.choice_correct_answer}
  //                       </MenuItem>
  //                     </Select>
  //                     <br />
  //                     {this.state.showResult && (
  //                       <span
  //                         className={
  //                           this.state.right_wrong[index] ? "correct" : "wrong"
  //                         }
  //                       ></span>
  //                     )}
  //                   </InputLabel>
  //                 </div>
  //               );
  //             })
  //           : ""}
  //         <br />
  //         <input type="submit" value="Submit" />
  //       </form>
  //       <GlobalScore points={this.state.points} show={this.state.showResult} />
  //     </div>
  //   );
  // } //end render method
  // }

  render() {
    // const { game } = this.props;
    // console.log("render");
    // console.log(t
    console.log(this.props.quiz.questions);

    return (
      <div>
        {this.props.quiz.questions &&
          this.props.quiz.questions.map((question) => (
            <span>{question.question}</span>
          ))}
      </div>
    );
  }
}

const mapState = (state) => {
  // console.log("this is state rest", state.rest);
  // console.log("this is restaurant", state.rest.rests);
  // console.log(state.rest.rests[state.game.gameStage - 1].id);

  return {
    quiz: state.quiz,
    auth: state.auth,
    game: state.game,
    state: state,
    rests: state.rest.rests,
    restaurantId: state.rest.rests[state.game.gameStage - 1],
  };
};

const mapDispatch = {
  fetchQuiz,
};

export default connect(mapState, mapDispatch)(Quiz);
