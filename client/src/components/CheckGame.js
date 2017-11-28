import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CheckGame extends Component {
  componentDidMount(){
    if (!this.props.file) {
      this.props.history.push('/games/new');
    }
  }
  renderPosition(position){
    switch (position) {
      case "1":
        return "Libero";
      case "2":
        return "Outside";
      case "4":
        return "Middle";
      case "3":
        return "Opposite";
      case "5":
        return "Setter";
      default:
        return "Other";
    }
  }
  renderPlayer(player){
    return <li key={player.id} className="collection-item">{player.id}: {player.lastName}, {player.firstName} - {this.renderPosition(player.position)}</li>;
  }
  renderSet(set, i){
    if (set) {
      return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{set.home}</td>
          <td>{set.visit}</td>
          <td>{set.time}</td>
        </tr>
      )
    }
  }
  render(){
    if (this.props.file) {
      const { home, visit } = this.props.file.teams;
      const { players, match, name, sets, scout } = this.props.file;
      return (
        <div>
          <div className="row">
            <div className="row">
              <h5 className="left">Match: {name}</h5>
              <div className="right">
                <Link to="/games/new/check/save" className="btn">Save</Link>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <h5 >Match Info</h5>

                <ul className="collection">
                  <li className="collection-item"><div>Date:<a className="secondary-content">{match.date}</a></div></li>
                  <li className="collection-item"><div>Time:<a className="secondary-content">{match.time}</a></div></li>
                  <li className="collection-item"><div>Season:<a className="secondary-content">{match.season}</a></div></li>
                  <li className="collection-item"><div>league:<a className="secondary-content">{match.league}</a></div></li>
                  <li className="collection-item"><div>round:<a className="secondary-content">{match.round}</a></div></li>
                  <li className="collection-item"><div>ID:<a className="secondary-content">{match.id}</a></div></li>
                </ul>
              </div>
              <div className="col s6">
                <h5>Result</h5>
                <table className="striped">
                  <thead>
                    <tr>
                        <th>Set</th>
                        <th>Home</th>
                        <th>Visit</th>
                        <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sets.map((set, i) => this.renderSet(set, i))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <h5>Home Team - {home.name} - {home.id}</h5>
              <ul className="collection">
                <li key="coach" className="collection-item">Coach: {home.coach}</li>
                <li key="staff" className="collection-item">Staff: {home.staff}</li>
              </ul>
              <ul className="collection">
                {players.home.map(player => this.renderPlayer(player))}
              </ul>
            </div>
            <div className="col s6">
              <h5>Visiting Team - {visit.name} - {visit.id}</h5>
              <ul className="collection">
                <li key="coach" className="collection-item">Coach: {visit.coach}</li>
                <li key="staff" className="collection-item">Staff: {visit.staff}</li>
              </ul>
              <ul className="collection">
                {players.visit.map(player => this.renderPlayer(player))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return <div>Loading Game...</div>;
  }
}
function mapStateToProps({file}){
  return {
    file
  }
}
export default connect(mapStateToProps)(CheckGame);
