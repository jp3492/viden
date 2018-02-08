import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeComment, setAction } from '../actions';

class Controls extends Component{
  componentDidMount(){
    const { setAction }                     = this.props;
    const save                              = document.getElementById("save");
    const del                               = document.getElementById("delete")
    if (save !== null && del !== null) {
      save.addEventListener("click", () => {      setAction("save")   });
      del.addEventListener("click", () => {       setAction("delete") });
    }
  }
  renderEnter(setAction){
    const { auth, selectedHighlights }      = this.props;
    if (auth._id === selectedHighlights._uid) {
      return <button className="btn col s2 controlsBtn" id="enter" onClick={ () => setAction("enter") }> Mark </button> }
  }
  render() {
    const { setAction } = this.props;
    return(
      <div id="controls" className="row bottomFixed col s 12">
          <div className="btn col s2 controlsBtn" onClick={ () => setAction("play") } >   Play/Pause  </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("left") } >   Rewind      </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("right") }>   Forward     </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("slow") } >   Slow        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("fast") } >   Fast        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("mute") } >   Mute        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("jump") } >   Jump        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("up" ) }  >   Back        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("down") } >   Next        </div>
          {this.renderEnter(setAction)}
      </div>
    );
  }
}
const mapStateToProps = ({ auth, highlights: { selectedHighlights } }) => {
  return { auth, selectedHighlights }
}

export default connect(mapStateToProps, { changeComment, setAction })(Controls);
