import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpTo, setAction, selectHighlight, changeSearch } from '../actions';

class HighlightsList extends Component{
  onTextChange(text){
    this.props.changeComment(text);
  }
  renderHighlight(highlight, id, i, admin){
    const { start, stop, comment, _id } = highlight;
    const { setAction, selectHighlight } = this.props;
    return(
      <tr id={_id} key={i} className="tableRow">
        <td onClick={ () => selectHighlight(highlight, i) } className="col1">          {i}       </td>
        <td onClick={ () => selectHighlight(highlight, i) } className="col2">          {start}   </td>
        <td onClick={ () => selectHighlight(highlight, i) } className="col3">          {stop}    </td>
        <td onClick={ () => selectHighlight(highlight, i) } className="comment col4">  {comment} </td>
        {this.renderEditBody(admin, setAction, selectHighlight, highlight, i)}
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
  renderEditHead(admin){
    if (admin === true) {
      return <th className="editCell col5"></th>;
    }
  }
  renderEditBody(admin, setAction, selectHighlight, highlight, i){
    if (admin === true) {
      return ( <td className="editCell col5" onClick={ () => {  selectHighlight(highlight, i); setAction("edit"); } }><a>edit</a></td> );
    }
  }
  render () {
    const { highlights, _id, changeSearch, filteredHighlights, _uid, auth } = this.props;
    let list = (filteredHighlights === null) ? highlights: filteredHighlights;
    const admin = (_uid === auth._id) ? true: false;
    return (
      <div className="col-lg-4">
        <div className="row">
          <input id="search" onChange={ e => changeSearch(e.target.value) } value={this.renderSearch()} type="text" placeholder="Search Hihglights..." />
          <table className="table striped">
            <thead>
              <tr>
                <th className="col1">#</th>
                <th className="col2">></th>
                <th className="col3">|</th>
                <th className="col4">COMMENT</th>
                {this.renderEditHead(admin)}
              </tr>
            </thead>
            <tbody>
              {list.map( (h, i) => this.renderHighlight(h, _id, i, admin))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, controls: { action, searchKey, highlight }, highlights: { selectedHighlights: { highlights, _id, _uid }, filteredHighlights } }) => {
  return{ searchKey, action, highlight, filteredHighlights, highlights, _id, _uid, auth }
}

export default connect(mapStateToProps, { jumpTo, setAction, selectHighlight, changeSearch })(HighlightsList);
