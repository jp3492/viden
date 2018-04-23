import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { SELECT_GROUP } from '../actions/types';

class Groups extends Component{
  componentDidMount(){
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
  renderGroup(g, groups){
    const { dispatch, selectedGroup } = this.props;
    const { name, _id } = g;
    const className = (selectedGroup === _id) ? "groupSelected collapsible-header": "collapsible-header";
    const children = groups.filter( g => { return g.parent === _id });
    const mapOver = (children.length !== 0) ? children: null;
    const nested = (mapOver !== null) ? (
      <div className="collapsible-body">
        <span>
          {mapOver.map( g => this.renderGroup(g, groups))}
        </span>
      </div>
    ): null;
    return (
      <li>
        <div className={className} onClick={ () => dispatch({ type: SELECT_GROUP, payload: _id })}><i className="material-icons">people</i>{name}</div>
        {nested}
      </li>
    )
  }
  render(){
    const { groups } = this.props;
    const mapOver = groups.filter( g => { return g.parent === null });
    return(
      <ul id="groups" className="collapsible" data-collapsible="accordion">
        {mapOver.map( g => this.renderGroup(g, groups) )}
      </ul>
    )
  }
}
const mapStateToProps = ({ main: { groups, selectedGroup } }) => {
  return { groups, selectedGroup };
}

export default connect(mapStateToProps)(Groups);
