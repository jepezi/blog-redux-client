import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Nav.module.css';

class Nav extends Component {
  render() {
    return <div className={s.navcontainer}>
      <h3 className={s.heading}>MENU</h3>
      <ul className={s.navul + " list-unstyled"}>
        <li>
          <Link to='/'>Dashboard</Link>
        </li>
        <li>
          <div>
            <Link to='/posts'>Posts</Link>
            <Link to='/posts/new' className={s.actionButton}>New</Link>
          </div>
        </li>
        <li>
          <div>
            <Link to='/comments'>Comments</Link>
          </div>
        </li>
      </ul>
      <div className={s.user}>
        <a href='/' target='blank'>Web</a>
        <h6>{this.props.user.email}</h6>
        <a href='/admin/logout'>Logout</a>
      </div>
    </div>;
  }
}

export default Nav;
