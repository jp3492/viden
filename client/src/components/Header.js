import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Search from './Search';

class Header extends Component{
  render(){
    const { auth } = this.props;
    if (auth === false) {
      return <a href="/auth/google">Google OAuth</a>;
    }
    if (auth.approved === false) {
      return <div><h4>Waiting for Admins approval</h4><a href="/auth/google">Switch Account</a></div>;
    }
    return(
      <div id="header" className="row">
        <Menu />
        <Search />
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
}
export default connect(mapStateToProps)(Header);
