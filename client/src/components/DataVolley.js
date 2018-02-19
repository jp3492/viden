import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postDv, add_video, changeLink, changeDesciption, changeTitle, removeLink, setDv } from '../actions';

class DataVolley extends Component{
  renderLink(link, removeLink){
    return <li key={link} className="collection-item link"><div>{link.title}<a onClick={ () => removeLink(link.videoId)} className="secondary-content"><i className="material-icons">clear</i></a></div></li>
  }
  readTextFile(file) {
    const { setDv } = this.props;
    var reader = new FileReader();
    reader.onload = function(event)
    {
        var contents = event.target.result;
        setDv(contents);
    };
    reader.readAsText(file);
  }
  render(){
    const { changeTitle, changeDesciption, changeLink, postDv, add_video, removeLink, create: { title, link, videos, description, dv }, history } = this.props;
    return (
      <div className="container">
        <input value={title} onChange={ e => changeTitle(e.target.value) } type="text" placeholder="Title" />
        <textarea className="materialize-textarea" value={description} onChange={ e => changeDesciption(e.target.value) } type="text" placeholder="Desciption..." />
        <div className="row">
          <input value={link} className="col s9" onChange={ e => changeLink(e.target.value) } type="text" placeholder="Youtube Link" />
          <button className="btn col s2 offset-s1 addLink" onClick={ () => add_video(link)}>Add</button>
        </div>
        <div className="row">
          <ul className="collection links">
            {videos.map( v => this.renderLink(v, removeLink))}
          </ul>
        </div>
        <div className="row">
          <form action="#">
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input id="dv" type="file" accept=".dvw" onChange={ e => this.readTextFile(e.target.files[0])} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </form>
        </div>
        <button onClick={ () => postDv({ title, videos, description, dv }) } className="btn create">Create</button>
      </div>
    );
  }
}

const mapStateToProps = ({ create, load }) => {
  return { create, load };
}

export default connect(mapStateToProps, { postDv, add_video, changeLink, changeDesciption, changeTitle, removeLink, setDv })(DataVolley);
