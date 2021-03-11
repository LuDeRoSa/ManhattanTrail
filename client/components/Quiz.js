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
      choiceA: "",
      choiceB: "",
      choiceC: "",
      choiceCorrect: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  componentDidMount(){
    console.log("in the component did mount")
    this.props.getQuiz();
  }

  handleQuestionChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
    console.log("in q change hook",this.state)
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("in the handleSubmit!!!")
  }


  render(){

    const {handleQuestionChange}=this;
    console.log("in the map!", this.props.quiz)

    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>

        {

        this.props.quiz.length !== 0 ?

         this.props.quiz.map( (currentQuestionObj, index) => {

           return (
             <div>
                <label>{currentQuestionObj.question}

               <select value={this.state.value} onChange={handleQuestionChange}>

               <option >Pick a choice!</option>

               <option value="choiceA">{currentQuestionObj.choice_a}</option>


               <option value="choiceB" >{currentQuestionObj.choice_b}</option>

              <option value="choiceC" >{currentQuestionObj.choice_c}</option>

              <option value="choiceCorrect">{currentQuestionObj.choice_correct_answer}</option>

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






    //   <div className="app">
    //     {
    //     this.props.quiz.length !== 0 ?
    //      this.props.quiz.map( (currentQuestionObj, index) => {

    //        return (
    //          <div>
    //            <form key={index} onSubmit={this.handleSubmit}>

    //             <label>{currentQuestionObj.question}

    //               <select value={this.state.value} onChange={handleQuestionChange}>

    //               <option >Pick a choice!</option>

    //               <option value="choiceA">{currentQuestionObj.choice_a}</option>


    //               <option value="choiceB" >{currentQuestionObj.choice_b}</option>


    //               <option value="choiceC" >{currentQuestionObj.choice_c}</option>


    //               <option value="choiceCorrect">{currentQuestionObj.choice_correct_answer}</option>

    //               </select>
    //               </label>
    //               <input type="submit" value="Submit" />
    //           </form>
    //           <br/>
    //         </div>
    //        )
    //      }) : ""






    // return (
    //   <div className="app">
    //     {
    //     this.props.quiz.length !== 0 ?
    //      this.props.quiz.map( (currentQuestionObj, index) => {
    //        console.log("in the map!", currentQuestionObj);
    //        return (
    //          <div>
    //            <form onSubmit={this.handleSubmit}>

    //             <p key={index}>{currentQuestionObj.question}</p>

    //               <input type="radio" id="choiceA" name="choiceA" value={this.state.value} onChange={handleQuestionChange}/>
    //               <label>{currentQuestionObj.choice_a}</label>

    //               <input type="radio" id="choiceB" name="choiceA" value={currentQuestionObj.choice_b} />
    //               <label >{currentQuestionObj.choice_b}</label>

    //               <input type="radio" id="choiceC" name="choiceA" value={currentQuestionObj.choice_c} />
    //               <label >{currentQuestionObj.choice_c}</label>

    //               <input type="radio" id="choice_correct_answer" name="choiceA" value={currentQuestionObj.choice_correct_answer} />
    //               <label >{currentQuestionObj.choice_correct_answer}</label>
    //               <input type="submit" value="Submit" />
    //           </form>
    //           <br/>
    //         </div>
    //        )
    //      }) : ""
     //   }

      );
  }//end render method

};


const mapState = (state) => {
  return {
    quiz: state.quiz
  };
};

const mapDispatch = (dispatch) => {
  return {
    getQuiz: () => dispatch(fetchQuiz())
  };
};


export default connect(mapState, mapDispatch)(Quiz);
