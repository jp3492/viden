import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser, fetchHighlights, subscribeToTimer } from '../actions';

import Header from './Header';
import NewHighlights from './NewHighlights';
import Home from './Home';
import VideoEditor from './VideoEditor';
import DataVolley from './DataVolley';
import Loading from './Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet'
    };
  }
  componentWillMount(){
    this.props.subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
    // alert("NExt: select project and user -> then edit functions, after that clean");
    this.props.fetchUser();
    this.props.fetchHighlights();
  }
  render(){
    return(
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={Header} />
              <Route exact path="/" component={Home} />
              <div>
                <Route exact path="/editor" component={VideoEditor} />
                <Route exact path="/dv" component={DataVolley} />
                <Route path="/view/:id" component={Loading} />
              </div>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

const mapStateToProps = ({ auth, highlights }) => {
  return { auth, highlights }
}

export default connect(mapStateToProps, {fetchUser, fetchHighlights, subscribeToTimer})(App);
