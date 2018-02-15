import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectHighlights, deleteHighlights, fetchHighlights, fetchUser, create, postHighlights, edit, changeTitle, changeLink, removeLink, removeVideo, addVideo
, updateHighlights } from '../actions';

import NewHighlights from './NewHighlights';

const load = (<div className="preloader-wrapper small active"><div className="spinner-layer spinner-green-only"><div className="circle-clipper left">
        <div className="circle"></div></div><div className="gap-patch"><div className="circle"></div></div><div className="circle-clipper right">
        <div className="circle"></div></div></div></div>);

class Highlights extends Component{
  componentDidMount(){
    this.removeSelected();
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
  }
  removeSelected(){
    let items = document.getElementsByTagName("li");
    for(let i = 0; i < items.length; i++){
      items[i].classList.remove("selected");
    }
  }
  renderHighlight(highlight){
    const { title, _id }                = highlight;
    return(
      <li id={_id} key={_id}
        onDoubleClick={ () => this.props.selectHighlights( true, this.props.selectedHighlights, this.props.history ) }
        onClick={ () => {
          this.removeSelected();
          document.getElementById(_id).classList.add("selected");
          this.props.selectHighlights( false, highlight );
        } }
        className="collection-item projects">
        <h4>{title}</h4>
      </li>
    )
  }
  renderAddButton(link){
    const { load: { addLink }, addVideo } = this.props;
    if (addLink) {
      return load;
    } else {
      return <button className="btn col s2 offset-s1 addLink" onClick={ () => addVideo(link)}>Add</button>;
    }
  }
  renderVideos(video, i){
    const { editing, link, removeVideo } = this.props;
    if (editing === true) {
      return (
        <div>
          <div className="collection-item editLinks">
            {video.title}
            <a onClick={ () => removeVideo(video.videoId)} className="secondary-content">
              <i className="material-icons">
                clear
              </i>
            </a>
          </div>

        </div>
      );
    }
    return <div className="collection-item editLinks">{video.title}</div>;
  }
  renderUpdate(deleteHighlights,updateHighlights,id, videos, title){
    if (videos.length !== 0) {
      updateHighlights(id, videos, title);
    } else {
      deleteHighlights(id);
    }
  }
  renderCardHeader(){
    const { selectedHighlights, creating, edit, editing, title, changeTitle, updateHighlights, editedVideos, deleteHighlights }  = this.props;
    if (creating === true) {
      return <span className="card-title">Create Project</span>;
    }
    if (selectedHighlights === null) {
      return <span className="card-title">Select Project</span>;
    } else {
      if (editing === true) {
        return <div className="card-title"><input onChange={ e => changeTitle(e.target.value) } id="editTitle" value={title} /><a onClick={() => this.renderUpdate(deleteHighlights,updateHighlights,selectedHighlights._id, editedVideos, title)} className="secondary-content btn-floating btn-large waves-effect waves-light new"><i className="material-icons editProj">check</i></a></div>;
      }
      return <div className="card-title">{selectedHighlights.title}<a onClick={ () => edit(true, { title: selectedHighlights.title, videos: selectedHighlights.videos }) }className="secondary-content btn-floating btn-large waves-effect waves-light new"><i className="material-icons editProj">edit</i></a></div>;
    }
  }
  renderAdd(){
    const { editing, link, changeLink } = this.props;
    if (editing) {
      return (
        <div className="row addingLink">
          <input value={link} className="col s9" onChange={ e => changeLink(e.target.value) } type="text" placeholder="Youtube Link" />
          {this.renderAddButton(link)}
        </div>
      );
    }
    return;
  }
  renderCardBody(){
    const { selectedHighlights, creating, videos, editing, editedVideos } = this.props;
    if (creating) {
      return <NewHighlights />;
    }
    if (selectedHighlights !== null) {
      const { _id } = selectedHighlights;
      const vids = (!editing) ? selectedHighlights.videos: editedVideos;
      return (
        <div>
          <p>ID:{_id}</p>
          Videos:
          <div className="collection">
            {vids.map( (v, i) => this.renderVideos(v, i))}
            {this.renderAdd()}
          </div>
        </div>
      )
    } else {
      return;
    }
  }
  renderCardFooter(){
    const { selectedHighlights, creating, editing, auth, history, create,
      title, videos, postHighlights, selectHighlights, deleteHighlights } = this.props;
    if (creating) {
      return <a onClick={ () => postHighlights( title, videos ) } className="secondary-content btn-floating btn-large waves-effect waves-light orange new"><i className="material-icons">check</i></a>;
    }
    if (selectedHighlights !== null && editing === false) {
      if (auth._id === selectedHighlights._uid) {
        return (
          <div>
            <button className="btn projBtn" onClick={ () => selectHighlights( true, selectedHighlights, history )}>Select</button>
            <button className="btn projBtn" onClick={ () => deleteHighlights(selectedHighlights._id)}>Delete</button>
            <a onClick={ () => { this.removeSelected(); create(true); } } className="secondary-content btn-floating btn-large waves-effect waves-light orange new"><i className="material-icons">add</i></a>
          </div>
        )
      } else {
        return (
          <div>
            <button className="btn projBtn" onClick={ () => selectHighlights( true, selectedHighlights, history )}>Select</button>
            <a onClick={ () => { this.removeSelected(); create(true); } } className="secondary-content btn-floating btn-large waves-effect waves-light orange new"><i className="material-icons">add</i></a>
          </div>
        )
      }
    } else {
      if (editing) {
        return;
      }
      return <a onClick={ () => { this.removeSelected(); create(true); } } className="secondary-content btn-floating btn-large waves-effect waves-light orange new"><i className="material-icons">add</i></a>;
    }
  }
  render(){
    const { list, search } = this.props;
    let listt = list;
    if (search.active === true) {
      listt = search.list;
    }
    return(
      <div className="row">
        <div className="col s4">
          <div className="row">
           <div className="col s12">
             <div className="card blue-grey darken-1 infoCard">
              <div className="card-content white-text">
                {this.renderCardHeader()}
                {this.renderCardBody()}
              </div>
              <div className="card-action infoCardFoot">
                {this.renderCardFooter()}
              </div>
             </div>
           </div>
         </div>
        </div>
        <div className="col s8">
          <ul className="collection">
            {listt.map( highlight => this.renderHighlight(highlight) )}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ create: { creating, videos, title, editing, link, editedVideos, fuckOff }, load, auth, search, highlights: { list, selectedHighlights } }) => {
  return{ auth, search, list, selectedHighlights, load, creating, title, videos, editing, link, editedVideos, fuckOff } }

export default connect(mapStateToProps, { selectHighlights, deleteHighlights, fetchHighlights, fetchUser, create, postHighlights, edit, changeTitle,
changeLink, removeLink, removeVideo, addVideo, updateHighlights })(Highlights);
