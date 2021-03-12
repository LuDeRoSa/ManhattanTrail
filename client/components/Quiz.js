import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchQuiz} from "../store/quiz";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";


export class Quiz extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        userId: this.props.auth.id,
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  componentDidMount(){
    console.log("in the component did mount")
    this.props.getQuiz();
  }

  handleQuestionChange(ev){
    //before you set state, determine whether answer is true or false. and then pass in the value and an additional boolean value such as true or false
    let quizArray = this.props.quiz;
    let currentQuestion = ev.target.name;
    console.log("quiz Array", quizArray);
    for (let i = 0; i < quizArray.length; i++){
      let current
    }

    this.setState({
      [ev.target.name]: ev.target.value
    });

  }

  handleSubmit(event){
    event.preventDefault();
    console.log("in the handleSubmit!!!")
    //when we make a post - we'll need another axios call
    //which means we'll need another dispatch
    //and that's where the handle submit will come in
  }


  render(){
    console.log("in q change hook",this.state)
    const {handleQuestionChange}=this;
    console.log("in the map!", this.props.quiz)
    const userId = this.props.auth.id;
    console.log("state auth", userId)

    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
        {
        this.props.quiz.length !== 0 ?

         this.props.quiz.map( (currentQuestionObj, index) => {

           return (
             <div key={index}>
                <label>{currentQuestionObj.question}

               <select name={"question"+(index+1)} value={this.state.value} onChange={handleQuestionChange}>

               <option >Pick a choice!</option>

               <option value={currentQuestionObj.choice_a}>{currentQuestionObj.choice_a}</option>


               <option value={currentQuestionObj.choice_b} >{currentQuestionObj.choice_b}</option>

              <option value={currentQuestionObj.choice_c} >{currentQuestionObj.choice_c}</option>

              <option value={currentQuestionObj.choice_correct_answer}>{currentQuestionObj.choice_correct_answer}</option>

              </select>
               </label>

              </div>
           )
           }

          ) : "" //close map
         }
          <input type="submit" value="Submit" />
         </form>
         </div>

      );
  }//end render method

};


const mapState = (state) => {
  return {
    quiz: state.quiz,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    getQuiz: () => dispatch(fetchQuiz())
  };
};


export default connect(mapState, mapDispatch)(Quiz);
