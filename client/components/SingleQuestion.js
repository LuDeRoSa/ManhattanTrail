// import React from 'react';
// import { connect } from 'react-redux';
// import { updateQuiz } from '../store/quiz.js';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';

// //handle submit inside the single question
// //that will just send a score of 1 or 0 to the question
// // handle change for whatever the user clicks
// // conditional logic - once a user has submitted, they can't change their mind. - disable the components

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import { makeStyles, StylesProvider } from '@material-ui/core/styles';

// class SingleQuestion extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       points: 0,
//       played: false,
//       value: ``,
//       status: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(ev) {
//     this.setState({
//       value: ev.target.value,
//     });
//   }

//   /// send the changes to our database/backend
//   handleSubmit(ev) {
//     ev.preventDefault();
//     let userResponse = this.state.value;
//     const correctAnswer = this.props.question.answers.find(
//       (answer) => answer.isCorrect
//     ).answer;
//     const points = userResponse === correctAnswer ? 1 : 0;
//     this.setState({
//       played: true,
//       points,
//       status: points > 0 ? 'correct' : 'wrong',
//     });
//     this.props.updateQuiz(points);
//   }

//   render() {
//     const { question } = this.props;
//     return (
//       <div className={this.state.status}>
//         {/* <form id='quiz-form' onSubmit={this.handleSubmit}>
//           <InputLabel id='question'>
//             {question.question}
//             <Select
//               value={this.state.value}
//               onChange={this.handleChange}
//               disabled={this.state.played}
//             >
//               <MenuItem value='Pick a choice!' disabled={this.state.played}>
//                 Pick a choice!
//               </MenuItem>
//               {question.answers.map((answerObj, index) => (
//                 <MenuItem
//                   name={answerObj.answer}
//                   value={answerObj.answer}
//                   key={index}
//                 >
//                   {answerObj.answer}
//                 </MenuItem>
//               ))}
//             </Select>
//           </InputLabel>

//           <input type='submit' value='Submit' disabled={this.state.played} />
//         </form> */}
//         <form id='quiz-form' onSubmit={this.handleSubmit}>
//           <FormControl
//             id='form-control'
//             component='fieldset'
//             // className={useStyles.formControl}
//           >
//             <FormLabel id='question' component='legend'>
//               {question.question}
//             </FormLabel>
//             <RadioGroup
//               value={this.state.value}
//               onChange={this.handleChange}
//               disabled={this.state.played}
//               // value='radioA'
//               inputprops={{ 'aria-label': 'Radio A' }}
//             >
//               {/* <FormControlLabel
//                 value='Pick a choice!'
//                 control={<Radio />}
//                 disabled={this.state.played}
//               >
//                 Pick a choice!
//               </FormControlLabel> */}
//             </RadioGroup>
//           </FormControl>
//           <input type='submit' value='Submit' disabled={this.state.played} />
//         </form>
//       </div>
//     );
//   } //close render
// } //close class

// const mapState = (state) => {
//   return {
//     state,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     updateQuiz: (points) => dispatch(updateQuiz(points)),
//   };
// };
// export default connect(mapState, mapDispatch)(SingleQuestion);

import React from 'react';
import { connect } from 'react-redux';
import { updateQuiz } from '../store/quiz.js';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

//handle submit inside the single question
//that will just send a score of 1 or 0 to the question
// handle change for whatever the user clicks
// conditional logic - once a user has submitted, they can't change their mind. - disable the components

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';

class SingleQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.questions.question);
    return <div>{this.props.questions.question}</div>;
  }
}

const mapState = (state) => {
  return {
    state,
  };
};
const mapDispatch = (dispatch) => {
  return {
    updateQuiz: (points) => dispatch(updateQuiz(points)),
  };
};
export default connect(mapState, mapDispatch)(SingleQuestion);
