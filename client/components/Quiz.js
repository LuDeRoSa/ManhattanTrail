import React from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, updateQuiz } from '../store/quiz';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import Button from "@material-ui/core/Button";
import globalScope from './GlobalScore';
import GlobalScore from './GlobalScore';
import SingleQuestion from './SingleQuestion';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  //1
  componentDidMount() {
    this.props.fetchQuiz(1);
    // console.log(this.props.game.gameStage - 1);
  }

  componentDidUpdate() {
    //responsive to restaurant id  - COME BACK
  }

  render() {
    // console.log("the rest id??!!",this.props.restaurantId)
    // console.log("this.prop.rests", this.props.rests)
    // console.log("the quiz state on the props!!!",this.props.quiz.questions);
    //after the component mounts, the quiz object gets called {id:, question:}
    //pass in the singleQuestion component here with the prop
    //the prop will be the entire question object

    return (
      <div>
        <h2>QUIZ</h2>
        {this.props.quiz.questions &&
          this.props.quiz.questions.length > 0 &&
          this.props.quiz.questions.map((question) => (
            <SingleQuestion key={question.id} question={question} />
          ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    quiz: state.quiz,
    auth: state.auth,
    // game: state.game,
    // state: state,
    rests: state.rest.rests,
    restaurantId: state.rest.rests[state.game.gameStage - 1] || 0,
  };
};

const mapDispatch = {
  fetchQuiz,
};

export default connect(mapState, mapDispatch)(Quiz);
