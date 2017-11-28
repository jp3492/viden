import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { filterStats, setFilter } from '../actions';

const qual = {
   Serve: { short: "S", qualities: ["#","/","+","!","-","="] },
   Reception: { short: "R", qualities: ["#","+","!","-","/","="] },
   Set: { short: "E", qualities: ["#","+","!","/","-","="] },
   Attack: { short: "A", qualities: ["#","+","!","/","-","="] },
   Block: { short: "B", qualities: ["#","+","!","-","/","="] },
   Dig: { short: "D", qualities: ["#","+","!","-","/","="] },
   FreeBall: { short: "F", qualities: ["#","+","!","-","/","="] }
};

const setsTable = [ "Set", "Team", "Score", "Actions" ];
const teamTable = [ "Number", "First Name", "Last Name", "Actions" ];

class Game extends Component{
  componentDidMount(){
    if (this.props.selectedGame){
      console.log(this.props.selectedGame);
      const { report: { result, players: { home, visit } } } = this.props.selectedGame;
      const initFilter = {
        sets: [],
        home: [],
        visit: []
      };
      home.map( player => {
        const filtPlayer = {
          number: player.number,
          actions: { S: [], R: [], E: [], A: [], B: [], D: [], F: [] }
        }
        initFilter.home.push(filtPlayer);
      });
      visit.map( player => {
        const filtPlayer = {
          number: player.number,
          actions: { S: [], R: [], E: [], A: [], B: [], D: [], F: [] }
        }
        initFilter.visit.push(filtPlayer);
      });
      this.props.setFilter(initFilter);
    } else {
      this.props.history.push('/games');
    }
  }
  addSetToFilter(set){
    let flt = this.props.filter;
    if (flt.sets.includes(set)) {
      flt.sets = flt.sets.filter( s => s !== set);
    } else {
      flt.sets.push(set);
    }
    this.props.setFilter(flt);
  }
  addActionToFilter(action){
    let flt = this.props.filter;
    flt.home.map( play => {
      if (play.actions[action].length === 6) {
        play.actions[action] = [];
      } else {
        play.actions[action] = [0,1,2,3,4,5];
      }
    });
    flt.visit.map( play => {
      if (play.actions[action].length === 6) {
        play.actions[action] = [];
      } else {
        play.actions[action] = [0,1,2,3,4,5];
      }
    });
    this.props.setFilter(flt);
  }
  addQualityToFilter(action, quality){
    let flt = this.props.filter;
    flt.home.map( play => {
      if (play.actions[action].includes(quality)) {
        play.actions[action] = play.actions[action].filter( q => {return q !== quality});
      } else {
        play.actions[action].push(quality);
      }
    });
    flt.visit.map( play => {
      if (play.actions[action].includes(quality)) {
        play.actions[action] = play.actions[action].filter( q => {return q !== quality});
      } else {
        play.actions[action].push(quality);
      }
    });
    this.props.setFilter(flt);
  }
  getSetTotalActions(set, home){
    let { report: { stats } } = this.props.selectedGame;
    const statCount = stats.filter( stat => {
      return stat.s === set && stat.home === home});
    return statCount.length;
  }
  getSetActions(set, home, action, quality){
    let { report: { stats } } = this.props.selectedGame;
    // if (this.props.filteredStats){
    //   stats = this.props.filteredStats;
    // }
    const statCount = stats.filter( stat => {
      return stat.s === set && stat.action === action && stat.quality == quality && stat.home === home});
    return statCount.length;
  }
  getPlayerTotalActions(player, home){
    let { report: { stats } } = this.props.selectedGame;
    // if (this.props.filteredStats){
    //   stats = this.props.filteredStats;
    // }
    const statCount = stats.filter( stat => { return stat.player === player && stat.home === home; });
    return statCount.length;
  }
  getPlayerActions(home, player, action, quality){
    let { report: { stats } } = this.props.selectedGame;
    // if (this.props.filteredStats){
    //   stats = this.props.filteredStats;
    // }
    const statCount = stats.filter( stat => {
      return stat.player === player.number && stat.home === home && stat.action === action && stat.quality === quality
    });
    return statCount.length;
  }

  changeQuality(q){
    switch (q) {
      case "#": return 5;
      case "+": return 4;
      case "!": return 3;
      case "/": return 2;
      case "-": return 1;
      case "=": return 0;
    }
  }

  renderTable(table){
    return (
      <table className="striped col s12">
        <col />
        <tr>
          {this.renderTableTopHeader(table)}
        </tr>
        <tr>
          {this.renderTableSubHeader(table)}
        </tr>
        {this.renderTableBody(table)}
      </table>
    );
  }
  renderTableTopHeader(table){
    let actions = _.keys(qual);
    actions.unshift(table)
    return actions.map(action => this.renderTableTopHeaderActions(action));
  }
  renderTableTopHeaderActions(action){
    let cols = 6;
    const except = ["Result", "Home", "Visiting"];
    if (except.includes(action)) {
      cols = 4;
    }
    return <th colSpan={cols} scope="colgroup">{action}</th>;
  }
  renderTableSubHeader(table){
    let qualities = [];
    if (table === "Result") {
      setsTable.map( q => qualities.push(q));
      _.mapKeys(qual, value => value.qualities.map(q => qualities.push(q)));
      return qualities.map( q => this.renderTableSubHeaderQualities(q));
    } else {
      teamTable.map( q => qualities.push(q));
      _.mapKeys(qual, value => value.qualities.map(q => qualities.push(q)));
      return qualities.map( q => this.renderTableSubHeaderQualities(q));
    }
  }
  renderTableSubHeaderQualities(quality){
    return <th scope="col">{quality}</th>;
  }
  renderTableBody(table){
    if (table === "Result") {
      let { report: { result } } = this.props.selectedGame;
      result = result.filter( set => {return set !== null});
      return result.map( (set, i) => {
        const h_v = [ true, false ];
        return h_v.map( home => {
          const isHome = home ? "home": "visit";
          const cells = [
            set.set,
            isHome,
            result[i][isHome],
            this.getSetTotalActions(i+1, home)
          ];
          let allQ = [];
          _.mapKeys(qual, value => {
            const key = value.short;
            value.qualities.map(q => { const obj = {}; obj[key] = q; allQ.push(obj)});
          });
          allQ.map( aq => {
            const action = _.keys(aq)[0];
            const quality = this.changeQuality(aq[action]);
            const total = this.getSetActions(set.set, home, action, quality);
            cells.push(total);
          });
          return (
            <tr>
              {cells.map( cell => this.renderTableBodyCell(cell))}
            </tr>
          );
        });
      });
    } else {
      const home = (table === "Home") ? true: false;
      let { report: { players } } = this.props.selectedGame;
      players = (home) ? players.home: players.visit;
      return players.map( player => {
        const cells = [
          player.number,
          player.firstName,
          player.lastName,
          this.getPlayerTotalActions(player.number, home)
        ];
        let allQ = [];
        _.mapKeys(qual, value => {
          const key = value.short;
          value.qualities.map(q => { const obj = {}; obj[key] = q; allQ.push(obj)});
        });
        allQ.map( aq => {
          const action = _.keys(aq)[0];
          const quality = this.changeQuality(aq[action]);
          const total = this.getPlayerActions(home, player, action, quality);
          cells.push(total);
        });
        console.log(cells);
        return (
          <tr>
            {cells.map( cell => this.renderTableBodyCell(cell))}
          </tr>
        );
      });
    }
  }
  renderTableBodyCell(cell){
    return <td>{cell}</td>;
  }
  render(){
    if (this.props.selectedGame) {
      return (
        <div className="row">
          {this.renderTable("Result")}
          {this.renderTable("Home")}
          {this.renderTable("Visiting")}
        </div>
      );
    }
    return <div>Loading Game</div>;
  }
}
function mapStateToProps({ selectedGame, filter, filteredStats }){
  return{
    selectedGame,
    filteredStats,
    filter
  };
}
export default connect(mapStateToProps, { filterStats, setFilter })(Game);
