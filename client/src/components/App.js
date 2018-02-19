import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser } from '../actions';

import Header from './Header';
import NewHighlights from './NewHighlights';
import Highlights from './Highlights';
import VideoEditor from './VideoEditor';
import Settings from './Settings';
import Admin from './Admin';
import MenuButton from './ButtonMenu';
import Grid from './Grid';
import DataVolley from './DataVolley';

class App extends Component {
  componentWillMount(){
    this.props.fetchUser();
    // alert("need to edit delete");
  }
  render(){
    return(
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={Header} />
              <div>
                <Route exact path="/new" component={NewHighlights} />
                <Route exact path="/list" component={Highlights} />
                <Route exact path="/editor" component={VideoEditor} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/dv" component={DataVolley} />
              </div>
              <Route exact path="/grid" component={Grid} />
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

const mapStateToProps = ({ auth, highlights }) => {
  return { auth, highlights }
}

export default connect(mapStateToProps, {fetchUser})(App);
