import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectHighlights, deleteHighlights, fetchHighlights, fetchUser } from '../actions';

const load = (<div className="preloader-wrapper small active"><div className="spinner-layer spinner-green-only"><div className="circle-clipper left">
        <div className="circle"></div></div><div className="gap-patch"><div className="circle"></div></div><div className="circle-clipper right">
        <div className="circle"></div></div></div></div>);

class Highlights extends Component{
  renderHighlight(highlight){
    const { title, _id }                = highlight;
    return(
      <li id={_id} key={_id}
        onDoubleClick={ () => this.props.selectHighlights( true, this.props.selectedHighlights, this.props.history ) }
        onClick={ () => {
          let items = document.getElementsByTagName("li");
          for(let i = 0; i < items.length; i++){
            items[i].classList.remove("selected");
          }
          document.getElementById(_id).classList.add("selected");
          this.props.selectHighlights( false, highlight );
        } }
        className="collection-item">
        <h4>{title}</h4>
      </li>
    )
  }
  renderButtons(){
    const { selectedHighlights, auth, deleteHighlights, history, selectHighlights, load: { select } }  = this.props;
    if (selectedHighlights === null) {
      return;
    } else if (!select) {
      if (selectedHighlights._uid === auth._id) {
        return(
          <div>
            <button className="btn projBtn" onClick={ () => selectHighlights( true, selectedHighlights, history )}>Select</button>
            <button className="btn projBtn" onClick={ () => deleteHighlights(selectedHighlights._id)}>Delete</button>
            <a onClick={ () => alert("newProject") } className="secondary-content btn-floating btn-large waves-effect waves-light orange new"><i className="material-icons">add</i></a>
          </div>
        )
      } else {
        return (
          <div>
            <button className="btn" onClick={ () => this.props.history.push("/editor")}>Select</button>
            <a onClick={ () => alert("newProject") } className="secondary-content btn-floating btn-large waves-effect waves-light orange new"><i className="material-icons">add</i></a>
          </div>
        )
      }
    } else {
      return load;
    }
  }
  renderVideos(video, i){
    return <p>{i}: {video.title}</p>;
  }
  renderInfos(selectedHighlights){
    if (selectedHighlights === null) { return <span className="card-title">Select Project</span> }
    const { title, videos, _id } = selectedHighlights;
    return (
      <div>
        <div className="card-title">{title}<a className="secondary-content btn-floating btn-large waves-effect waves-light new"><i className="material-icons editProj">edit</i></a></div>
        <p>ID:{_id}</p>
        Videos:
        {videos.map( (v, i) => this.renderVideos(v, i))}
      </div>
    )

  }
  render(){
    const { list, search, selectedHighlights } = this.props;
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
                 {this.renderInfos(selectedHighlights)}
               </div>
               <div className="card-action infoCardFoot">
                 {this.renderButtons()}

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

const mapStateToProps = ({ load, auth, search, highlights: { list, selectedHighlights } }) => {
  return{ auth, search, list, selectedHighlights, load } }

export default connect(mapStateToProps, { selectHighlights, deleteHighlights, fetchHighlights, fetchUser })(Highlights);
