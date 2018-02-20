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
import Loading from './Loading';

class App extends Component {
  componentWillMount(){
    alert("need to make search and arrow nav functioning!!! works when not iltered")
    this.props.fetchUser();
  }
  render(){
    return(
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={Header} />
              <Route exact path="/" component={Highlights} />
              <div>
                <Route exact path="/editor" component={VideoEditor} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/dv" component={DataVolley} />
                <Route path="/view/:id" component={Loading} />
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
