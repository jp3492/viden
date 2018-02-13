import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLink, changeTitle, postHighlights, add_video, removeLink } from '../actions';

const load = (<div className="preloader-wrapper small active"><div className="spinner-layer spinner-green-only"><div className="circle-clipper left">
        <div className="circle"></div></div><div className="gap-patch"><div className="circle"></div></div><div className="circle-clipper right">
        <div className="circle"></div></div></div></div>);

class NewHighlights extends Component{
  renderLink(link, removeLink){
    return <li key={link} className="collection-item link"><div>{link.title}<a onClick={ () => removeLink(link.videoId)} className="secondary-content"><i className="material-icons">clear</i></a></div></li>
  }
  renderAddButton(link){
    const { add_video, load: { addLink } } = this.props;
    if (addLink) {
      return load;
    } else {
      return <button className="btn col s2 addLink" onClick={ () => add_video(link)}>Add</button>;
    }
  }
  renderCreateButton(title, videos){
    const { postHighlights, load: { create }, history } = this.props;
    if (create) {
      return load;
    } else {
      return <button onClick={ () => postHighlights( title, videos, history ) } className="btn create">Create</button>;
    }
  }
  render(){
    const { changeLink, changeTitle, create: { title, link, videos }, removeLink } = this.props;
    return(
      <div className="container">
        <input value={title} onChange={ e => changeTitle(e.target.value) } type="text" placeholder="Title" />
        <div className="row">
          <input value={link} className="col s10" onChange={ e => changeLink(e.target.value) } type="text" placeholder="Youtube Link" />
          {this.renderAddButton(link)}
        </div>
        <div className="row">
          <ul className="collection links">
            {videos.map( v => this.renderLink(v, removeLink))}
          </ul>
        </div>
        {this.renderCreateButton(title, videos)}
      </div>
    );
  }
}

const mapStateToProps = ({ create, load }) => {
  return{ create, load } }

export default connect(mapStateToProps, { changeLink, changeTitle, postHighlights, add_video, removeLink })(NewHighlights);
