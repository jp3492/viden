import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCreate, createProject, createFolder, createGroup } from '../actions';

class CardFooter extends Component{
  // removeSelected(){
  //   let items = document.getElementsByClassName("projectsItem");
  //   for(let i = 0; i < items.length; i++){
  //     items[i].classList.remove("selected");
  //   }
  // }

  renderSubmit(_id){
    const { create, type, createProject, createFolder, createGroup, name, description, privacy, parent, dataArray  } = this.props;
    if (create === true) {
      if (type === "project") {
        createProject({ name, description, privacy, parent, dataArray });
      } else if (type === "folder") {
        createFolder({ name, description, privacy, parent });
      } else if (type === "group") {
        createGroup({ name, description, parent, dataArray });
      }
    }
  }
  render(){
    const { view, type, create, setCreate, loading } = this.props;
    if (loading) {
      return (
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left"><div className="circle"></div></div>
            <div className="gap-patch"><div className="circle"></div></div>
            <div className="circle-clipper right"><div className="circle"></div></div>
          </div>
        </div>
      );
    }
    if (type !== null) {
      return (
        <a onClick={ () => this.renderSubmit()}
          className="secondary-content btn-floating btn-large waves-effect waves-light orange new">
          <i className="material-icons">
            check
          </i>
        </a>
      );
    }
    switch (view) {
      case "profile":
        return <a href="/api/logout"
                className="secondary-content btn btn-large waves-effect waves-light orange">
                  <i className="material-icons">
                  exit_to_app
                  </i>
                </a>;
      case "contacts":
        return <a onClick={ () => setCreate("group", true)}
                className="secondary-content btn-floating btn-large waves-effect waves-light orange new">
                  <i className="material-icons">
                  group_add
                  </i>
                </a>;
      case "directory":
        return <a onClick={ () => setCreate("folder", true)}
                className="secondary-content btn-floating btn-large waves-effect waves-light orange new">
                  <i className="material-icons">
                  create_new_folder
                  </i>
                </a>;
      case "notifications":
        return null;
    }
    return null;
  }
}

const mapStateToProps = ({ main: { view }, creating: { type, create, name, description, privacy, parent, dataArray, loading } }) => {
  return { view, create, type, name, description, privacy, parent, dataArray, loading };
}

export default connect(mapStateToProps, { setCreate, createProject, createFolder, createGroup })(CardFooter);
