import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMiniGameScore } from "../store/game.js"
class PhaserGameScore extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            this.props.updatePhaserGameScore(this.props.game.score);
        }
    render() {
        return <div>hi you have this many points! {this.props.game.score}</div>;
        }
}
function mapDispatchToProps(dispatch) {
    return {
        updatePhaserGameScore: (points) => dispatch(updateMiniGameScore(points))
    }
}
export default connect((state) => state, mapDispatchToProps)(PhaserGameScore);