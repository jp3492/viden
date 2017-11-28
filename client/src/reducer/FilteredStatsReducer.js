import { FILTER_STATS } from '../actions/types';
import _ from 'lodash';

export default function ( state = null, action ){
  switch (action.type) {
    case FILTER_STATS:
      console.log(action.payload);
      const { filter: { sets, home, visit }, stats } = action.payload;
      let filteredStats = stats.map(stat => {
        const { s, player, action, quality } = stat;
        const h = stat.home;
        const isHome = h ? true: false;
        if (sets.includes(s)) {
          let p;
          if (isHome) {
            p = home.filter( play => {
              return play.number === player && play.actions[action].includes(quality);
            });
          } else {
            p = visit.filter( play => {
              return play.number === player && play.actions[action].includes(quality);
            });
          }
          if (p[0]) {
            return stat;
          }
          return null;
        }
      });
      filteredStats = filteredStats.filter( stat => {
        return stat !== null && stat !== undefined;
      });
      return filteredStats;
    default:
      return state;
  }
}
