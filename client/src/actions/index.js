import axios from 'axios';
import { FETCH_USER, UPLOAD_FILE, NAME_CHANGE, PROCESS_FILE, UPLOAD_PLAYER, UPLOAD_TEAM, UPLOAD_LEAGUE, UPLOAD_COMPETITION, UPLOAD_GAME,
  UPLOAD_SCOUT, UPLOAD_REPORT, UPLOAD_STATS, FETCH_SCOUTS, FILTER_STATS, SELECT_GAME, SET_FILTER } from './types';

export const setFilter = filter => dispatch => {
  dispatch({type: SET_FILTER, payload: filter});
}

export const filterStats = (stats, filter) => dispatch => {
  dispatch({type: FILTER_STATS, payload: { stats, filter } });
}

export const selectGame = (id, history) => async dispatch => {
  const res = await axios.get(`/api/game/${id}`);
  dispatch({type: SELECT_GAME, payload: res.data});
  history.push('/game');
}

export const fetchScouts = () => async dispatch => {
  const res = await axios.get('/api/games');
  dispatch({type: FETCH_SCOUTS, payload: res.data});
}

export const uploadStats = (stats, scout, callback) => async dispatch => {
  await axios.post('/api/scout/stats', {stats, scout});
  callback();
  dispatch({type: UPLOAD_STATS});
}

export const uploadReport = (report, scout, callback) => async dispatch => {
  await axios.post('/api/scout/report', {report, scout});
  callback();
  dispatch({type: UPLOAD_REPORT});
}

export const uploadScout = (game, name, callback) => async dispatch => {
  const res = await axios.get(`/api/scout/${game}/${name}`);
  callback(res.data._id);
  dispatch({type: UPLOAD_SCOUT});
}

export const uploadGame = (competition, home, visit, callback) => async dispatch => {
  const res = await axios.get(`/api/game/${competition}/${home}/${visit}`);
  callback(res.data._id);
  dispatch({type: UPLOAD_GAME});
}

export const uploadCompetition = (league, season, callback) => async dispatch => {
  const seas = season.split('/')[0];
  const res = await axios.get(`/api/competition/${league}/${seas}`);
  callback(res.data._id);
  dispatch({type: UPLOAD_COMPETITION});
}

export const uploadLeague = (match, callback) => async dispatch => {
  const { league, season } = match;
  const res = await axios.get(`/api/league/${league}`);
  callback(res.data._id, season);
  dispatch({type: UPLOAD_LEAGUE});
}

export const uploadTeam = (team, callback) => async dispatch => {
  const { id, name } = team;
  const res = await axios.get(`/api/team/${name}/${id}`);
  callback(res.data._id);
  dispatch({type: UPLOAD_TEAM});
}

export const uploadPlayer = (player, callback) => async dispatch => {
  const { lastName, firstName, id, jersey } = player;
  let res = await axios.get(`/api/player/${firstName}/${lastName}/${id}`);
  res.data.number = jersey;
  delete res.data.__v;
  delete res.data.dvIds;
  callback(res.data);
  dispatch({type: UPLOAD_PLAYER});
}

export const processFile = (file, name, history) => dispatch => {
  file.name = name;
  dispatch({type: PROCESS_FILE, payload: file});
  history.push('/games/new/check');
}

export const changeName = name => dispatch => {
  dispatch({type: NAME_CHANGE, payload: name});
}

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data });
}

export const uploadFile = (file, name) => dispatch => {
  // here all the scripts that split the string into a useable object
  let header = file.split("[3DATAVOLLEYSCOUT]")[1].split("[3MATCH]")[0].split('\n'); header.shift(); header.pop();
  let match = file.split("[3MATCH]")[1].split("[3TEAMS]")[0].split('\n'); match.shift(); match.pop();
  let teams = file.split("[3TEAMS]")[1].split("[3MORE]")[0].split('\n'); teams.shift(); teams.pop();
  let sets = file.split("[3SET]")[1].split("[3PLAYERS-H]")[0].split('\n'); sets.shift(); sets.pop();
  let home = file.split("[3PLAYERS-H]")[1].split("[3PLAYERS-V]")[0].split('\n'); home.shift(); home.pop();
  let visit = file.split("[3PLAYERS-V]")[1].split("[3ATTACKCOMBINATION]")[0].split('\n'); visit.shift(); visit.pop();
  let attack_combs = file.split("[3ATTACKCOMBINATION]")[1].split("[3SETTERCALL]")[0].split('\n'); attack_combs.shift(); attack_combs.pop();
  let setter_calls = file.split("[3SETTERCALL]")[1].split("[3WINNINGSYMBOLS]")[0].split('\n'); setter_calls.shift(); setter_calls.pop();
  let scout = file.split("[3SCOUT]")[1].split('\n'); scout.shift(); scout.pop();

  let match_info = match[0].split(';');
  let match_info_b = match[1].split(';');
  const female = (match_info[3].includes('Frauen')) ? true : false;
  match = { date: match_info[0], time: match_info[1], season: match_info[2], league: match_info[3], round: match_info[4], female, id: match_info_b[2] };

  let team_home = teams[0].split(';');
  let team_visit = teams[1].split(';');
  teams = { home: { id: team_home[0], name: team_home[1], coach: team_home[3], staff: team_home[4] },
            visit: { id: team_visit[0], name: team_visit[1], coach: team_visit[3], staff: team_visit[4] } }

  sets = sets.map((set, i) => { const splitset = set.split(';'); const result = splitset[4].split('-'); const time = splitset[5];
                           if (result[0]) { return { set: i+1, home: Number(result[0]), visit: Number(result[1]), time: Number(time) } } return null; } );

  home = home.map(player => {
    const infos = player.split(';');
    const position = infos[13];
    return { id: infos[8], lastName: infos[9], firstName: infos[10], jersey: infos[1], position } } );

  visit = visit.map(player => {
    const infos = player.split(';');
    const position = infos[13];
    return { id: infos[8], lastName: infos[9], firstName: infos[10], jersey: infos[1], position } } );

  const players = { home, visit };

  scout = scout.map(stat => stat.split(';'));
  let clean_scout = [];
  let left_scout = [];
  scout.map(stat => {
    if (stat[0].includes('>') || stat[0].includes('$$') || stat[0].includes('z') || stat[0][1] === 'T' || stat[0].includes('c') || stat[0][1] === 'P' || stat[0].includes('s')) {
      left_scout.push(stat) } else {
      clean_scout.push(stat) } return null } );

  function alterQuality(quality) {
    switch (quality) {
      case "#": return 5; case "+": return 4; case "!": return 3; case "/": return 2; case "-": return 1; case "=": return 0; default: return null;
    }
  }
  function alterHome(home){
    if (home === "*") {
      return true;
    }
    return false;
  }
  let s_h = 0, s_v = 0, p_h = 0, p_v = 0, s = 1, reset = false;
  function setScores(stat){
    if (reset === true) {
      p_h = 0;
      p_v = 0;
      reset = false;
    }
    if (stat.includes('*p')) {
      p_h++;
      const diff = p_h - p_v;
      if (p_h >= 25 && diff > 1) {
        s_h++;
        s++;
        reset = true;
      }
    } else if (stat.includes('ap')) {
      p_v++;
      const diff = p_v - p_h;
      if (p_v >= 25 && diff > 1) {
        s_v++;
        s++;
        reset = true;
      }
    }
  }

  scout = clean_scout.map(stat => {
    setScores(stat[0]);
    if (!stat[0].includes('p')) {
      let isHome;
      let quality;
      isHome = alterHome(stat[0][0]);
      quality = alterQuality(stat[0][5]);
      return { home: isHome, player: Number(stat[0].substr(1,2)), action: stat[0][3], type: stat[0][4], quality, s, s_h, s_v, p_h, p_v };
    }
  });
  scout.map((stat, i) => {
    if (stat === undefined) {
      scout.splice(i, 1);
    }
  });
  scout = scout.map((stat, i) => {
    stat.index = i+1;
    return stat;
  });
  const report = { name: "na", match, teams, sets, players, scout };
  dispatch({type: UPLOAD_FILE, payload: report});
}
