import axios from 'axios';
import { FETCH_USER, CREATE_POST, REMOVE, CHANGE_SEARCH_TERM, SUBMIT_HIGHLIGHT, UPDATE_HIGHLIGHT,
DELETE_HIGHLIGHT, REQUEST, ANSWER_REQUEST, COPY_CREATE, DELETE_MULTIPLE, DELETE_HIGHLIGHTS, LOG, GET_PROJECT, COPY_ADDED,
DISSMISS_HIGHLIGHT } from './types';

export const copyAdd = copy => async dispatch => {
  const res = await axios.post('/api/addHighlights', copy);
  dispatch({ type: COPY_ADDED, payload: res.data })
}

export const getProject = id => async dispatch => {
  const res = await axios.get(`/api/project/${id}`);
  dispatch({ type: GET_PROJECT, payload: res.data });
}

export const log = inn => async dispatch => {
  dispatch({ type: LOG, payload: inn });
}

export const deleteHighlights = (highlights, project) => async dispatch => {
  const highs = highlights.map( h => { return h._id });
  await axios.post('/api/deleteHighlights', { highlights: highs, project });
  dispatch({ type: DELETE_HIGHLIGHTS, payload: { highlights: highs, project } });
}

export const deleteMultiple = projects => async dispatch => {
  await axios.post('/api/deleteMultiple', projects);
  dispatch({ type: DELETE_MULTIPLE, payload: projects });
}

export const copyCreate = (copy, project) => async dispatch => {
  const videos = copy.highlights.reduce((arr, highlight) => {
    const { link } = highlight;
    if (arr.includes(link)) {
      return arr;
    } else {
      arr.push(link);
      return arr;
    }
  }, []);
  const highlights = copy.highlights.map( h => {
    const video = videos.indexOf(h.link);
    return { start: h.start, stop: h.stop, comment: h.comment, video, _opid: project, _ohid: h._id };
  });
  const create = { type: "project", title: "", parent: null, privacy: "public", description: "", videos, highlights }
  dispatch({ type: COPY_CREATE, payload: create });
}

export const answerRequest = (me, type, target, user, confirm) => async dispatch =>{
  const res = await axios.post('/api/answerRequest', { me, type, target, user, confirm });
  dispatch({ type: ANSWER_REQUEST, payload: res.data });
}

export const request = (me, type, target, user) => async dispatch => {
  const res = await axios.post('/api/request', { me, type, target, user });
  dispatch({ type: REQUEST, payload: res.data });
}

export const deleteHighlight = (project, highlight, index) => async dispatch => {
  const res = await axios.post('/api/deleteHighlight', { project, highlight, index });
  dispatch({ type: DELETE_HIGHLIGHT, payload: res.data });
}

export const updateHighlight = (project, highlight, start, stop, comment) => async dispatch => {
  const res = await axios.post('/api/updateHighlight', { project, highlight, start, stop, comment });
  dispatch({ type: UPDATE_HIGHLIGHT, payload: res.data });
}

export const submitHighlight = (project, video, start, stop, comment) => async dispatch => {
  dispatch({ type: DISSMISS_HIGHLIGHT });
  const res = await axios.post('/api/submitHighlight', { project, video, start, stop, comment });
  dispatch({ type: SUBMIT_HIGHLIGHT, payload: res.data });
}

export const search_global = (type, term, _id) => async dispatch => {
  const res = await axios.post('/api/search_global', { type, term, _id });
  dispatch({ type: CHANGE_SEARCH_TERM, payload: res.data });
}

export const removeObj = (obj, _id) => async dispatch => {
  const res = await axios.post('/api/remove', { obj, _id });
  dispatch({ type: REMOVE, payload: res.data });
}

export const create_update = (update, create, _id, invites) => async dispatch => {
  const res = await axios.post('/api/create_update', { update, create, _id, invites });
  console.log(res.data);
  dispatch({ type: CREATE_POST, payload: res.data });
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}
