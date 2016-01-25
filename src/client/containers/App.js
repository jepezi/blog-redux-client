import React, { Component, PropTypes } from 'react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    return <div>
      <Nav />
      {this.props.children}
      <hr />
      <Footer />
    </div>;
  }
}

export default App;
