import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CHANGE_VIEW } from '../actions/types';

class Menu extends Component{
  renderTab(tab){
    const { view, changeView, dispatch } = this.props;
    const className = (view === tab[0]) ? "tab col s3 tabSelected": "tab col s3";
    return (
      <li className={className} onClick={ () => dispatch({ type: CHANGE_VIEW, payload: tab[0] })}>
        <i id={tab[0]} className="material-icons">
          {tab[1]}
        </i>
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

const mapStateToProps = ({ main: { view } }) => {
  return { view };
}

export default connect(mapStateToProps)(Menu);
