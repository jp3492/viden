import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPlayer, uploadTeam, uploadLeague, uploadCompetition, uploadGame,
  uploadScout, uploadReport, uploadStats } from '../actions';



class CheckSave extends Component {
  componentDidMount(){
    const { file, history, uploadPlayer, uploadTeam, uploadLeague,
      uploadCompetition, uploadGame, uploadScout, uploadReport, uploadStats } = this.props;
    if (!file) {  return history.push('/games/new') }
    const { name, players, match, scout, sets, teams: { home, visit } } = file;
    uploadLeague(match, (league, seas) => {
        uploadCompetition(league, seas, (competition) => {
          uploadTeam(home, (home_id) => {
            uploadTeam(visit, (visit_id) => {
              uploadGame(competition, home_id, visit_id, (game_id) => {
                uploadScout(game_id, name, async (scout_id) => {
                  let newPlayers = {};
                  function getPlayer(player){
                    return new Promise((resolve, reject) => {
                      uploadPlayer(player, (player) => {
                        resolve(player);
                      });
                    });
                  }
                  let home = players.home.map( player => {
                    return getPlayer(player);
                  });
                  Promise.all(home).then( player_h => {
                    newPlayers.home = player_h;
                    let visit = players.visit.map( player => {
                      return getPlayer(player);
                    });
                    Promise.all(visit).then( player_v => {
                      newPlayers.visit = player_v;
                      const report = { result: sets, players: newPlayers };
                      uploadReport(report, scout_id, () => {
                        uploadStats(scout, scout_id, () => {
                          this.props.history.push('/games');
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        })
      });
  }
  render(){
    return(
      <div><h5>Creating and Uploading Report</h5></div>
    )
  }
}
function mapStateToProps({ file }){
  return{
    file
  }
}
export default connect(mapStateToProps,
  { uploadPlayer, uploadTeam, uploadReport, uploadLeague,
    uploadCompetition, uploadGame, uploadScout, uploadStats })(CheckSave);
