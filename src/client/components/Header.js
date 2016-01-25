import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    return <header className="intro-header" style={this.props.headerStyle}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div className={this.props.headerClassname}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
    </header>;
  }
}

Header.defaultProps = {
  headerClassname: "site-heading",
};
export default Header;
