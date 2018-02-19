import axios from 'axios';
import { FETCH_USER, POST_HIGHLIGHTS, CHANGE_LINK, CHANGE_TITLE, FETCH_HIGHLIGHTS,
CHANGE_COMMENT, SUBMIT_HIGHLIGHT, SELECT_HIGHLIGHTS, PLAY_VIDEO, JUMP_TO, SET_ACTION, SET_STATE, SET_TIME, SELECT_HIGHLIGHT,
CHANGE_SEARCH, SEARCH_PROJECT, MY_LIST, SET_SEARCH, ADD_VIDEO_ID, NAV_NEW, NAV_VIDEO, SET_VIDEO, FETCH_USERS,ADD_VIDEO_LINK,
POSTING_HIGHLIGHTS, SELECTING_HIGHLIGHT, PLAYER_LOADED, REFRESH_PLAYER, SUBMITTING_HIGHLIGHT, EDIT_HIGHLIGHT, DELETING_HIGHLIGHT,
DELETE_HIGHLIGHT, REMOVE_LINK, CREATE, EDIT, REMOVE_VIDEO, ADD_VIDEO, UPDATE_HIGHLIGHTS, CHANGE_DESCRIPTION, SET_DV, POST_DV } from './types';

const ytKey = "AIzaSyDNjPIijQMBwx6H7ZO1bPZpv3bmL2ZhIq4";

export const postDv = dv => async dispatch => {                       const res = await axios.post('/api/dv', dv);
                                                                      dispatch({ type: POST_DV, payload: res.data }) }

export const setDv = file => dispatch => {                            dispatch({ type: SET_DV, payload: file }) }

export const changeDesciption = text => dispatch => {                 dispatch({ type: CHANGE_DESCRIPTION, payload: text }) }

export const updateHighlights = (id, videos, title) => async dispatch => {
                                                                      const res = await axios.post('/api/highlights/update', {id, videos, title} );
                                                                      dispatch({ type: UPDATE_HIGHLIGHTS, payload: res.data }) }

export const addVideo = link => async dispatch => {                   const videoId = link.split("v=")[1].split("&")[0];
                                                                      const info = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items/snippet/title,items/snippet/description&key=${ytKey}`);
                                                                      dispatch({ type: ADD_VIDEO, payload: { type: "youtube", videoId, title: info.data.items[0].snippet.title } })}

export const removeVideo = video => dispatch => {                     dispatch({ type: REMOVE_VIDEO, payload: video }) }

export const edit = (editing, infos) => async dispatch => {           dispatch({ type: EDIT, payload: {editing, infos} }) }

export const create = creating => dispatch => {                       dispatch({ type: CREATE, payload: creating }) }

export const removeLink = videoId => dispatch => {                    dispatch({ type: REMOVE_LINK, payload: videoId }) }

export const refreshPlayer = videos => dispatch => {                  dispatch({ type: REFRESH_PLAYER, payload: videos }) }

export const playerLoaded = () => dispatch => {                       dispatch({ type: PLAYER_LOADED }) }

export const navAdmin = history => async dispatch => {                const res = await axios.get('/api/users');
                                                                      dispatch({ type: FETCH_USERS, payload: res.data });
                                                                      history.push("/admin"); }

export const setVideo = index => dispatch => {                        dispatch({ type: SET_VIDEO, payload: index }) }

export const navVideo = (next, length) => dispatch => {               dispatch({ type: NAV_VIDEO, payload: { next, length } }) }

export const navNew = (history) => dispatch => {                      dispatch({ type: NAV_NEW });
                                                                      history.push("/new"); }

export const add_video = link => async dispatch => {                  const videoId = link.split("v=")[1].split("&")[0];
                                                                      const info = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items/snippet/title,items/snippet/description&key=${ytKey}`);
                                                                      dispatch({ type: ADD_VIDEO_ID, payload: { type: "youtube", videoId, title: info.data.items[0].snippet.title } }); }

export const setSearch = search => dispatch => {                      dispatch({ type: SET_SEARCH, payload: search }) }

export const selectMyList = callback => dispatch => {                 dispatch({ type: MY_LIST });
                                                                      callback; }

export const searchProject = (search, history) => async dispatch => { const res = await axios.get(`/api/search/${search}`);
                                                                      if (res.data.length !== 0 && search.length > 2) {
                                                                        dispatch({ type: SEARCH_PROJECT, payload: res.data });
                                                                        history.push('/list'); } }

export const changeSearch = search => dispatch => {                   dispatch({ type: CHANGE_SEARCH, payload: search }) }

export const selectHighlight = (highlight, i, video) => dispatch => { dispatch({ type: SELECT_HIGHLIGHT, payload: { highlight, i, video } }) }

export const setTime = (key, time) => dispatch => {                   dispatch({ type: SET_TIME, payload: { key, time } }) }

export const setState = () => dispatch => {                           dispatch({ type: SET_STATE }) }

export const setAction = action => dispatch => {                      dispatch({ type: SET_ACTION, payload: action }) }

export const jumpTo = (start, stop) => dispatch => {                  dispatch({ type: JUMP_TO, payload: {start, stop} }) }

export const changePlay = () => dispatch => {                         dispatch({ type: PLAY_VIDEO }) }

export const submitHighlight = ( id, highlight, search ) => async dispatch => {
                                                                      dispatch({ type: SUBMITTING_HIGHLIGHT, payload: { h: highlight, s: search }} );
                                                                      const res = await axios.post(`/api/highlights/${id}`, highlight);
                                                                      dispatch({ type: SUBMIT_HIGHLIGHT, payload: { h: res.data, s: search } }); }

export const changeComment = comment => dispatch => {                 dispatch({ type: CHANGE_COMMENT, payload: comment }) }

export const changeTitle = title => dispatch => {                     dispatch({ type: CHANGE_TITLE, payload: title }) }

export const changeLink = link => dispatch => {                       console.log(link);dispatch({ type: CHANGE_LINK, payload: link }) }

export const deleteHighlight = ( _id, id, search ) => async dispatch => {
                                                                      dispatch({ type: DELETING_HIGHLIGHT, payload: id });
                                                                      await axios.delete(`/api/highlights/highlight/${_id}/${id}`);
                                                                      dispatch({ type: DELETE_HIGHLIGHT, payload: id }); }

export const deleteHighlights = _id => async dispatch => {            const res = await axios.delete(`/api/highlights/${_id}`);
                                                                      dispatch({ type: FETCH_HIGHLIGHTS, payload: res.data }); }

export const editHighlight = ( _id, id, start, stop, comment, videoId, search ) => async dispatch => {
                                                                      await axios.post(`/api/highlights/highlight/${_id}/${id}`, { start, stop, comment, videoId });
                                                                      dispatch({ type: EDIT_HIGHLIGHT, payload: { h: { start, stop, comment, videoId, _id: id }, s: search } }); }

export const selectHighlights = ( get, highlight, history ) => async dispatch => {
                                                                      const { _id, title, videos, _uid } = highlight;
                                                                      if (get === true) {
                                                                        dispatch({ type: SELECTING_HIGHLIGHT });
                                                                        const res = await axios.get(`/api/highlights/${_id}`);
                                                                        dispatch({ type: SELECT_HIGHLIGHTS, payload: { _id, title, videos, highlights: res.data, _uid } });
                                                                      } else {
                                                                        dispatch({ type: SELECT_HIGHLIGHTS, payload: { _id, title, videos, highlights: [], _uid } });
                                                                      }
                                                                      if (history !== undefined) { history.push("/editor") } }

export const fetchHighlights = (history) => async dispatch => {       let items = document.getElementsByTagName("li");
                                                                      for(let i = 0; i < items.length; i++){
                                                                        items[i].classList.remove("selected");
                                                                      }
                                                                      const res = await axios.get('/api/highlights');
                                                                      dispatch({ type: FETCH_HIGHLIGHTS, payload: res.data });
                                                                      history; }

export const postHighlights = ( title, description, videos ) => async dispatch => {
                                                                      dispatch({ type: POSTING_HIGHLIGHTS });
                                                                      const res = await axios.post(`/api/highlights`, { title, description, videos });
                                                                      dispatch({ type: POST_HIGHLIGHTS, payload: res.data }); }

export const fetchUser = () => async dispatch => {                    const response = await axios.get('/api/current_user');
                                                                      dispatch({ type: FETCH_USER, payload: response.data }); }
