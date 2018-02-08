import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectHighlights, deleteHighlights, fetchHighlights, fetchUser } from '../actions';

class Highlights extends Component{
  componentWillMount(){
    console.log(this.props);

  }
  componentDidMount(){
    console.log(this.props);
  }
  renderHighlight(highlight){
    const { title, _id } = highlight;
    return(
      <li key={_id} onClick={ () => this.props.selectHighlights( true, highlight ) } className="collection-item">
        <h4>{title}</h4>
      </li>
    )
  }
  renderButtons(){
    const { selectedHighlights, auth } = this.props;
    if (selectedHighlights === null) {
      return;
    } else if (selectedHighlights._uid === auth._id) {
      return(
        <div>
          <button className="btn" onClick={ () => this.props.history.push("/editor")}>Select</button>
          <button className="btn" onClick={ () => deleteHighlights(selectedHighlights._id)}>Delete</button>
        </div>
      )
    } else {
      return (
        <div>
          <button className="btn" onClick={ () => this.props.history.push("/editor")}>Select</button>
        </div>
      )
    }

  }
  render(){
    const { list, search, selectedHighlights } = this.props;
    const title = (selectedHighlights === null) ? "Select Project": selectedHighlights.title;
    const videoId = (selectedHighlights === null) ? "": selectedHighlights.videoId;
    const projectId = (selectedHighlights === null) ? "": selectedHighlights._id;
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
                 <span className="card-title">{title}</span>
                 <p>{videoId}</p>
                 <p>{projectId}</p>
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

const mapStateToProps = ({ auth, search, highlights: { list, selectedHighlights } }) => {
  return{
    auth,
    search,
    list,
    selectedHighlights
  }
}

export default connect(mapStateToProps, { selectHighlights, deleteHighlights, fetchHighlights, fetchUser })(Highlights);
