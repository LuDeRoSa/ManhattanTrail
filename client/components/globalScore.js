import React, { Component } from 'react';
import { connect } from 'react-redux';
//should make a backend call and find the score by current user id
import {fetchScore} from '../store/globalscore';

class GlobalScore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    let userId = this.props.userid;
    console.log("userId", userId);
    this.props.fetchScore(userId);
  }

  render() {
    // console.log("userid")
    let scoreResult = this.props.score;
    let scoreResultLen = Object.keys(scoreResult).length
    console.log("scoreResult", scoreResult)
    console.log("score result len", scoreResultLen)
    return (
      <div>
        {/* <p>testing this scores component</p> */}
        <div className="scores-box">
        {
          scoreResultLen > 0 ?
          <div id="scores-box">{"Current Score:" + scoreResult.score.total_score}</div> : ""
        }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    score: state.score,
    userid: state.auth.id
  };
};

const mapDispatch = {
  fetchScore,
};



export default connect(mapState, mapDispatch)(GlobalScore);

