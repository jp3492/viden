import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpTo, setAction, selectHighlight, changeSearch } from '../actions';

class HighlightsList extends Component{
  onTextChange(text){
    this.props.changeComment(text);
  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
  }
  renderHighlight(highlight, id, i, admin){
    const { start, stop, comment, _id, videoId }        = highlight;
    const { setAction, selectHighlight, video, videos } = this.props;
    let videoIndex;
    videos.map( (v, i) => { if (v.videoId === videoId) { videoIndex = i } });
    const info = (highlight.deleting === true) ? "deleting...": null;
    // return(
    //    <li onDoubleClick={ () => this.renderEdit(admin, setAction) } onClick={ () => selectHighlight(highlight, i, videoIndex) } id={_id} key={i}>
    //      <div className="collapsible-header">{comment}</div>
    //      <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    //    </li>
    // )
    return(
      <tr onDoubleClick={ () => this.renderEdit(admin, setAction) } onClick={ () => selectHighlight(highlight, i, videoIndex) } id={_id} key={i} className="tableRow">
        <td className="col1">          {i}       </td>
        <td className="col2">          {start}   </td>
        <td className="col3">          {stop}    </td>
        <td className="comment col4">  {comment} <a className="right-align">{info}</a></td>
      </tr>
    )
  }
  renderSearch(){
    const { searchKey } = this.props;
    if (searchKey === null || searchKey === "") { return "" }
    else {                                        return searchKey }
  }
  renderEdit(admin, setAction){
    if (admin === true) {                         setAction("edit") }
  }
  // <input id="search" onChange={ e => changeSearch(e.target.value) } value={this.renderSearch()} type="text" placeholder="Search Hihglights..." />
  render () {
    const { highlights, _id, changeSearch, filteredHighlights, _uid, auth } = this.props;
    let list  = (filteredHighlights === null) ? highlights: filteredHighlights;
    const admin = (_uid === auth._id) ? true: false;
    return (
      <div>
        <div className="row">
          <table className="table striped">
            <thead>
              <tr>
                <th className="col1">   #   </th>
                <th className="col2">   >   </th>
                <th className="col3">   |   </th>
                <th className="col4">COMMENT</th>
              </tr>
            </thead>
            <tbody id="tableHigh">

            </tbody>

          </table>
          <ul className="col s12" id="collHigh">
            {list.map( (h, i) => this.renderHighlight(h, _id, i, admin))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, controls: { action, searchKey, highlight, video }, highlights: { selectedHighlights: { highlights, _id, _uid, videos }, filteredHighlights } }) => {
  return{ searchKey, action, highlight, filteredHighlights, highlights, _id, _uid, auth, video, videos }
}

export default connect(mapStateToProps, { jumpTo, setAction, selectHighlight, changeSearch })(HighlightsList);
