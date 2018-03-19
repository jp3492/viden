import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeComment, setAction } from '../actions';

class Controls extends Component{

  renderEnter(setAction){
    const { auth, selectedHighlights }      = this.props;
    if (auth._id === selectedHighlights._uid) {
      return <button className="btn col s2 controlsBtn" id="enter" onClick={ () => setAction("enter") }> <i className="material-icons ctrl">content_cut</i> </button> }
  }
  render() {
    const { setAction }                     = this.props;
    return(
      <div id="controls" className="row bottomFixed col s 12">
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("play") } >   <i className="material-icons ctrl">play_arrow</i>  </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("left") } >   <i className="material-icons ctrl">fast_rewind</i>      </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("right") }>   <i className="material-icons ctrl">fast_forward</i>     </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("slow") } >   <div className="ctrl">-</div>        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("fast") } >   <div className="ctrl">+</div>        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("mute") } >   <i className="material-icons ctrl">volume_mute</i>        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("up" ) }  >   <i className="material-icons ctrl">keyboard_arrow_up</i>        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("down") } >   <i className="material-icons ctrl">keyboard_arrow_down</i>        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("backv") }>   <i className="material-icons ctrl">arrow_back</i>       </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("nextv") }>   <i className="material-icons ctrl">arrow_forward</i>       </div>
          {this.renderEnter(setAction)}
      </div>
    );
  }
}
const mapStateToProps = ({ auth, highlights: { selectedHighlights } }) => {
  return { auth, selectedHighlights }
}

export default connect(mapStateToProps, { changeComment, setAction })(Controls);
