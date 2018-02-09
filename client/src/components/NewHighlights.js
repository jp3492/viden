import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLink, changeTitle, postHighlights, add_video } from '../actions';

class NewHighlights extends Component{
  renderLink(link){
    return <li className="collection-item">{link.title}</li>
  }
  render(){
    const { add_video, changeLink, changeTitle, postHighlights, create: { title, link, videos } } = this.props;
    console.log(this.props);
    return(
      <div className="container">
        <input value={title} onChange={ e => changeTitle(e.target.value) } type="text" placeholder="Title" />
        <div className="row">
          <input value={link} className="col s10" onChange={ e => changeLink(e.target.value) } type="text" placeholder="Youtube Link" />
          <button className="btn col s2 addLink" onClick={ () => add_video(link)}>Add</button>
        </div>
        <div className="row">
          <ul className="collection">
            {videos.map( v => this.renderLink(v))}
          </ul>
        </div>
        <button onClick={ () => postHighlights( title, videos ) } className="btn create">Create</button>
      </div>
    );
  }
}

const mapStateToProps = ({ create }) => {
  return{ create } }

export default connect(mapStateToProps, { changeLink, changeTitle, postHighlights, add_video })(NewHighlights);
