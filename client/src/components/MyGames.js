import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScouts, selectGame } from '../actions';

class MyGames extends Component {
  componentDidMount(){
    this.props.fetchScouts();
  }
  renderScouts(scout){
    return (
      <li onClick={() => this.props.selectGame(scout._id, this.props.history)} className="collection-item" key={scout._id}>
        {scout.name}
      </li>
    )
  }
  render(){
    const { scouts } = this.props;
    if (scouts) {
      return(
        <div>
          <div className="row">
            <h5>My Scouting Reports:</h5>
          </div>
          <div className="row">
            <ul className="collection" >
              {scouts.map(scout => this.renderScouts(scout))}
            </ul>
          </div>
        </div>
      );
    }
    return <h5>Loading Scouting Reports</h5>;
  }
}
function mapStateToProps({scouts}){
  return{
    scouts
  };
}
export default connect(mapStateToProps, {fetchScouts, selectGame})(MyGames);
