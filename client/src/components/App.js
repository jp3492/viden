import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser } from '../actions';

import Header from './Header';
import NewHighlights from './NewHighlights';
import Highlights from './Highlights';
import VideoEditor from './VideoEditor';
import VideoViewer from './VideoViewer';
import Settings from './Settings';

class App extends Component {
  componentWillMount(){
    this.props.fetchUser();
  }
  render(){
    return(
        <div className="container-fluid fullHeight">
          <BrowserRouter>
            <div className="fullHeight">
              <Route path="/" component={Header} />
              <div>
                <Route exact path="/new" component={NewHighlights} />
                <Route exact path="/list" component={Highlights} />
                <Route exact path="/editor" component={VideoEditor} />
                <Route exact path="/viewer" component={VideoViewer} />
                <Route exact path="/settings" component={Settings} />
              </div>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default connect(null, {fetchUser})(App);
