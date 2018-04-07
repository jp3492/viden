import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Search from './Search';
import Create from './Create';
import Login from './Login';

class Header extends Component{
  componentDidMount(){
    const { auth, history } = this.props;
    if (auth === false) {
      history.push('/login')
    } else {
      history.push('/home')
    }
  }
  render(){
    const { auth, site } = this.props;
    if (auth === false || (auth !== false && auth.approved === false)) { return null }
    if (site === "player") { return null }
    return(
      <div id="header" className="row">
        <Menu />
        <Search />
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { site } }) => {
  return { auth, site };
}
export default connect(mapStateToProps)(Header);
