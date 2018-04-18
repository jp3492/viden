import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { copyAdd } from '../actions';
import { COPY_SELECT_FOLDER, COPY_ADD_TARGET } from '../actions/types';

class ProjectList extends Component{
  componentDidMount(){
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
  renderFolder(f, folders){
    const { dispatch, copy: { folder } } = this.props;
    const { name, description, parent, _id } = f;
    const className = (folder === _id) ? "folderSelected collapsible-header": "collapsible-header";
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
        <div className={className} onClick={ () => dispatch({ type: COPY_SELECT_FOLDER, payload: _id })}><i className="material-icons">folder</i>{name}</div>
        {nested}
      </li>
    )
  }
  renderProject(p, i){
    const { title, _id } = p;
    const { dispatch, copy: { targets } } = this.props;
    const checked = (targets.indexOf(_id) === -1) ? false: true;
    return <li className="collection-item">
            <div>
              {title}
              <a id={`checkp${i}`} className="secondary-content" onClick={ e => {
                e.preventDefault();
                dispatch({ type: COPY_ADD_TARGET, payload: _id });
                 } }>
                <input type="checkbox" className="filled-in" id={`check${i}`} checked={checked} />
                <label htmlFor={`check${i}`}></label>
              </a>
            </div>
          </li>
  }
  render(){
    if (this.props.copy === false) {
      return null;
    }
    const { folders, projects, copy: { folder, targets }, action: { copyAdd } } = this.props;
    const mapOver = folders.filter( f => { return f.parent === null });
    const mapProjects = (folder === null) ? projects: projects.filter( p => { return p.parent === folder });
    const add = (targets.length === 0) ? null:
      <a className="btn" onClick={ () => { copyAdd(this.props.copy); $('.modal').modal('close'); }}>Add</a>
    return (
      <div id="projectList" className="row">
        <h4>Add to projects...</h4>
        <div className="col s6">
          <ul id="directory" className="collapsible" data-collapsible="accordion">
            {mapOver.map( f => this.renderFolder(f, folders) )}
          </ul>
        </div>
        <div className="col s6">
          <ul className="collection">
            {mapProjects.map( (p, i) => this.renderProject(p, i))}
          </ul>
        </div>
        {add}
      </div>
    )
  }
}
const mapStateToProps = ({ player: { copy }, main: { projects, folders, selectedFolder } }) => {
  return { copy, projects, folders, selectedFolder }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ copyAdd }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
