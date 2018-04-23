import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CHANGE_VIEW } from '../actions/types';

class Menu extends Component{
  renderTab(tab){
    const { view, dispatch, access, friends } = this.props;
    const className = (view === tab[0]) ? "tab col s3 tabSelected": "tab col s3";
    const friendRequests = friends.filter( f => { return f.status === "requested" });
    const accessRequests = access.filter( a => { return (a.status === "requested" || a.status === "invited")});
    const number = (tab[0] === "notifications") ? <a id="numNotif">{friendRequests.length+accessRequests.length}</a>: null;
    return (
      <li key={tab} className={className} onClick={ () => dispatch({ type: CHANGE_VIEW, payload: tab[0] })}>
        <i id={tab[0]} className="material-icons">
          {tab[1]}
        </i>
        {number}
      </li>
    )
  }
  render(){
    const tabs = [ [ "profile", "person" ], [ "groups", "people" ], [ "directory", "folder" ], [ "notifications", "notifications" ] ];
    return(
      <div id="menu" className="col s3">
        <div className="col s12">
          <ul className="tabs">
            {tabs.map( t => this.renderTab(t))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ main: { view, access, friends } }) => {
  return { view, access, friends };
}

export default connect(mapStateToProps)(Menu);
