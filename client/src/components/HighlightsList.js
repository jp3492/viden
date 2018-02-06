import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpTo, setAction, selectHighlight, changeSearch } from '../actions';

class HighlightsList extends Component{
  onTextChange(text){
    this.props.changeComment(text);
  }
  renderHighlight(highlight, id, i){
    const { start, stop, comment, _id } = highlight;
    const { setAction, selectHighlight } = this.props;
    return(
      <tr id={_id} key={i}>
        <td onClick={ () => selectHighlight(highlight, i) }>{i}</td>
        <td onClick={ () => selectHighlight(highlight, i) }>{start}</td>
        <td onClick={ () => selectHighlight(highlight, i) }>{stop}</td>
        <td onClick={ () => selectHighlight(highlight, i) }>{comment}</td>
        <td className="editCell" onClick={ () => {  selectHighlight(highlight, i); setAction("edit"); } }><a>edit</a></td>
      </tr>
    )
  }
  renderSearch(){
    const { searchKey } = this.props;
    if (searchKey === null || searchKey === "") {
      return "";
    } else {
      return searchKey;
    }
  }
  render () {
    const { highlights, _id, changeSearch, filteredHighlights, searchKey } = this.props;
    console.log(filteredHighlights, highlights);
    let list = (filteredHighlights === null) ? highlights: filteredHighlights;
    return (
      <div className="col-lg-4">
        <div className="row">
          <input id="search" onChange={ e => changeSearch(e.target.value) } value={this.renderSearch()} type="text" placeholder="Search Hihglights..." />
          <table className="table striped">
            <thead>
              <tr>
                <th>#</th>
                <th>START</th>
                <th>STOP</th>
                <th>COMMENT</th>
                <th className="editCell">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {list.map( (h, i) => this.renderHighlight(h, _id, i))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ controls: { action, searchKey }, highlights: { selectedHighlights: { highlights, _id }, filteredHighlights } }) => {
  return{
    searchKey,
    action,
    filteredHighlights,
    highlights,
    _id
  }
}

export default connect(mapStateToProps, { jumpTo, setAction, selectHighlight, changeSearch })(HighlightsList);
