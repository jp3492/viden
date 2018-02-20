import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectHighlights, deleteHighlights, fetchHighlights, fetchUser, create, postHighlights, edit, changeTitle, changeLink, removeLink, removeVideo, addVideo
, updateHighlights, setSearch, searchProject } from '../actions';

import NewHighlights from './NewHighlights';

const load = (<div className="preloader-wrapper small active"><div className="spinner-layer spinner-green-only"><div className="circle-clipper left">
        <div className="circle"></div></div><div className="gap-patch"><div className="circle"></div></div><div className="circle-clipper right">
        <div className="circle"></div></div></div></div>);

class Highlights extends Component{
  componentDidMount(){
    this.removeSelected();
  }
  removeSelected(){
    let items = document.getElementsByClassName("projectsItem");
    for(let i = 0; i < items.length; i++){
      items[i].classList.remove("selected");
    }
  }
  renderHighlight(highlight){
    const { title, _id, description }                = highlight;
    return(
        <div className="col s4">
          <div
            onDoubleClick={ () => this.props.selectHighlights( true, this.props.selectedHighlights, this.props.history ) }
            onClick={ () =>  {
              this.removeSelected();
              document.getElementById(_id).classList.add("selected");
              this.props.selectHighlights( false, highlight ); }}
            className="card projectsItem" id={_id}>
            <div className="card-content white-text">
              <span className="card-title">{title}</span>
              <p>{description}</p>
            </div>
            <div className="card-action">
              <a href="#" className="projOwner">Jan-Philipp Marks</a>
            </div>
          </div>
        </div>
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
      const linkTo = (process.env.NODE_ENV === 'production') ? `https://serene-caverns-45409.herokuapp.com/view/${selectedHighlights._id}`: `http://localhost:3000/view/${selectedHighlights._id}`;
      return (
        <div>
          <p><b>Link to Project:</b></p>
          <p>{linkTo}</p><br/>
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
      title, videos, postHighlights, selectHighlights, deleteHighlights, description } = this.props;
    if (creating) {
      return <a onClick={ () => postHighlights( title, description, videos ) } className="secondary-content btn-floating btn-large waves-effect waves-light orange new"><i className="material-icons">check</i></a>;
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
  renderSearch(term){
    const { setSearch, history, searchProject } = this.props;
    setSearch(term);
    searchProject(term, history);
  }
  render(){
    const { list, search } = this.props;
    let listt = list;
    if (search.active === true) {
      listt = search.list;
    }
    if (!this.props.auth) {
      if (!search.active) {
        listt = [];
      }
      return (
        <div className="row">
          <div className="row" id="mainW">
            <div className="col s4" id="links">
             <div className="card blue-grey darken-1 infoCard">
             <div className="card-content white-text" id="profile">
               <h1>Viden</h1>
               <p>A social and interactive cross-plattform Video Player</p>
             </div>
              <div className="card-content white-text">
                <span className="card-title">What you can do...</span>
                <p>Analyze Videos with an interactive video player</p>
                <br />
                <p>Share your projects with others</p>
                <br />
                <p>Provide instant reporting on live streams</p>
                <br />
                <p>Upload DataVolley videos and scouting files</p>
              </div>
              <div className="card-action infoCardFoot">
                <p>For access, please register with given authentication services (Google, Facebook...) and <a href="mailto:viden.adm@gmail.com">contact me </a> for approved access.</p>
              </div>
             </div>
            </div>
            <div className="col s8" id="rechts">
              <div id="searchProjects" >
                <input onChange={ e => this.renderSearch(e.target.value)} value={search.term} id="searchProj" placeholder="Search Projects and User..."/>
              </div>
              <ul className="row" id="projectsCollection">
                {listt.map( highlight => this.renderHighlight(highlight) )}
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return(
      <div className="row">
        <div className="row" id="mainW">
          <div className="col s4" id="links">
           <div className="card blue-grey darken-1 infoCard">
           <div className="card-content white-text" id="profile">
             <h1>Profile</h1>
           </div>
            <div className="card-content white-text">
              {this.renderCardHeader()}
              {this.renderCardBody()}
            </div>
            <div className="card-action infoCardFoot">
              {this.renderCardFooter()}
            </div>
           </div>
          </div>
          <div className="col s8" id="rechts">
            <div id="searchProjects" >
              <input onChange={ e => this.renderSearch(e.target.value)} value={search.term} id="searchProj" placeholder="Search Projects and User..."/>
            </div>
            <ul className="row" id="projectsCollection">
              {listt.map( highlight => this.renderHighlight(highlight) )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ create: { creating, videos, title, description, editing, link, editedVideos, fuckOff }, load, auth, search, highlights: { list, selectedHighlights } }) => {
  return{ auth, search, description, list, selectedHighlights, load, creating, title, videos, editing, link, editedVideos, fuckOff } }

export default connect(mapStateToProps, { selectHighlights, deleteHighlights, fetchHighlights, fetchUser, create, postHighlights, edit, changeTitle,
changeLink, removeLink, removeVideo, addVideo, updateHighlights, setSearch, searchProject })(Highlights);
