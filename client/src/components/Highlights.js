import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectHighlights, resetSelected, deleteHighlights, fetchHighlights } from '../actions';

class Highlights extends Component{
  componentWillMount(){
    this.props.fetchHighlights();
    this.props.resetSelected();
  }
  renderHighlight(highlight){
    const { title, videoId, _id } = highlight;
    return(
      <li key={_id} onClick={ () => this.props.selectHighlights( true, highlight ) } className="collection-item">
        <h4>{title}</h4>
      </li>
    )
  }

  render(){
    const { list, selectedHighlights, deleteHighlights } = this.props;
    const title = (selectedHighlights === null) ? "Select Project": selectedHighlights.title;
    const videoId = (selectedHighlights === null) ? "": selectedHighlights.videoId;
    const listt = (selectedHighlights === null) ? 0: list.length;
    return(
      <div className="row">
        <div className="col s4">
          <div className="row">
           <div className="col s12">
             <div className="card blue-grey darken-1">
               <div className="card-content white-text">
                 <span className="card-title">{title}</span>
                 <p>{videoId}</p>
                 <p>{listt}</p>
               </div>
               <div className="card-action">
                 <button className="btn" onClick={ () => this.props.history.push("/editor")}>Select</button>
                 <button className="btn">Save</button>
                 <button className="btn" onClick={ () => deleteHighlights(selectedHighlights._id)}>Delete</button>
               </div>
             </div>
           </div>
         </div>
        </div>
        <div className="col s8">
          <ul className="collection">
            {list.map( highlight => this.renderHighlight(highlight) )}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ highlights: { list, selectedHighlights } }) => {
  return{
    list,
    selectedHighlights
  }
}

export default connect(mapStateToProps, { selectHighlights, resetSelected, deleteHighlights, fetchHighlights })(Highlights);
