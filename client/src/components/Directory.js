import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { SELECT_FOLDER } from '../actions/types';

class Directory extends Component{
  componentDidMount(){
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
  renderFolder(f, folders){
    const { dispatch, selectedFolder } = this.props;
    const { name, description, parent, _id } = f;
    const className = (selectedFolder === _id) ? "folderSelected collapsible-header": "collapsible-header";
    const children = folders.filter( f => { return f.parent === _id });
    const mapOver = (children.length !== 0) ? children: null;
    const nested = (mapOver !== null) ? (
      <div className="collapsible-body">
        <span>
          {mapOver.map( f => this.renderFolder(f, folders))}
        </span>
      </div>
    ): null;
    return (
      <li>
        <div className={className} onClick={ () => dispatch({ type: SELECT_FOLDER, payload: _id })}><i className="material-icons">folder</i>{name}</div>
        {nested}
      </li>
    )
  }
  render(){
    const { folders } = this.props;
    const mapOver = folders.filter( f => { return f.parent === null });
    return(
      <ul id="directory" className="collapsible" data-collapsible="accordion">
        {mapOver.map( f => this.renderFolder(f, folders) )}
      </ul>
    )
  }
}
const mapStateToProps = ({ main: { folders, selectedFolder } }) => {
  return { folders, selectedFolder };
}

export default connect(mapStateToProps)(Directory);
