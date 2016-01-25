import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
  increment() {
    this.props.dispatch({
      type: 'increment'
    });
  }
  render() {
    return <div>
      <button className="btn btn-success" onClick={this.increment.bind(this)}>+ {this.props.counter}</button>
    </div>;
  }
}

export default connect(state => ({counter: state.counter}))(Counter);
