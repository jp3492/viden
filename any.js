const { players, counter } = this.props;
const id = "_id12903u1udnp93n9d7nd";
const high = filteredHighlights.filter( h => { return h._id === id });
const { start, stop, video } = high;

players[video].seekTo(start);
const setTime = setInterval( () => {
  if (players[video].getCurrentTime().toFixed(1) === start) {
    this.seeking(highlight, counter);
  }
}, 10);

seeking(highlight, count){
  const { start, stop, video } = highlight;
  const timer = setInterval( () => {
    const { dispatch, counter, players, playList } = this.props;
    if (counter !== count) {
      clearInterval(timer);
    } else {
      if (players[video].getCurrentTime().toFixed(1) === stop) {
        if (playList === true) {
          const { filteredHighlights } = this.props;
          
        } else {
          dispatch({ type: PP });
        }
      }
    }
  }, 10);
}
