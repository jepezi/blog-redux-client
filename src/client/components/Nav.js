import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  render() {
    return <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header page-scroll">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">Start Bootstrap</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <a href="about.html">About</a>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li>
                        <a href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>;
  }
}

export default Nav;
