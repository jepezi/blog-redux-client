import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { flash: null }
  }

  componentWillReceiveProps(nextProps) {
    // console.warn('app cWRP', nextProps, this.props);
    if (nextProps.location.state
      && nextProps.location.state.flash
    ) {
      // console.warn('FLASH!!!!');
      this.setState({
        flash: nextProps.location.state.flash
      });
    } else {
      this.setState({
        flash: null
      });
    }
  }

  render() {
    return <div>
      <Nav user={this.props.user}/>
      <div style={{marginLeft: 220}}>
        {this.state.flash && <div>{this.state.flash}</div>}
        {this.props.children}
      </div>
    </div>;
  }
}

export default connect(
  state => ({
    error: state.error,
    user: state.entities.user[state.user],
  })
)(App);
