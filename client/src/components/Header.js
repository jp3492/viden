import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Search from './Search';
import Create from './Create';
import Login from './Login';

class Header extends Component{
  render(){
    const { auth } = this.props;
    if (auth === false) {
      return <Login />;
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
