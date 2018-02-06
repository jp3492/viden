import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLink, changeTitle, postHighlights } from '../actions';

class NewHighlights extends Component{

  render(){
    const { changeLink, changeTitle, postHighlights, create: { title, videoId } } = this.props;
    return(
      <div className="container">
        <input onChange={ e => changeLink(e.target.value) } type="text" placeholder="Youtube Link" />
        <input onChange={ e => changeTitle(e.target.value) } type="text" placeholder="Title" />
        <button onClick={ () => postHighlights( title, videoId ) } className="btn">Create</button>
      </div>
    );
  }
}

const mapStateToProps = ({ create }) => {
  return{
    create
  };
}

export default connect(mapStateToProps, { changeLink, changeTitle, postHighlights })(NewHighlights);
