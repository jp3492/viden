import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'materialize-css';

class Header extends Component {
  componentDidMount(){
    if (!this.props.auth) {
      this.props.history.push('/');
    }
  }

  render() {
    let log;
    if (this.props.auth) {
      log = <div>
        <li><Link to="/games/new">UploadGame</Link></li>
        <li><Link to="/games">MyGames</Link></li>
        <li><a href="/api/logout">Logout</a></li>
      </div>;
    }else{
      log = <li><a href="/auth/google">Google Singin</a></li>;
    }
    return(
      <nav>
       <div className="nav-wrapper">
         <Link to="/" className="brand-logo"></Link>
         <ul id="nav-mobile" className="right hide-on-med-and-down">
          {log}
         </ul>
       </div>
     </nav>
    );
  }
}
function mapStateToProps({ auth }){
  return{
    auth
  }
}
export default connect(mapStateToProps)(Header);
