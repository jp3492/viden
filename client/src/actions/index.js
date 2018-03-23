import axios from 'axios';
import { FETCH_USER, CREATE_UPDATE, CREATE_POST, CREATING_UPDATE, CREATING_POST, REMOVE, CHANGE_SEARCH_TERM, SUBMIT_HIGHLIGHT, UPDATE_HIGHLIGHT,
DELETE_HIGHLIGHT, REQUEST, ANSWER_REQUEST, COPY_CREATE } from './types';

const ytKey = "AIzaSyDNjPIijQMBwx6H7ZO1bPZpv3bmL2ZhIq4";

export const copyCreate = (copy, project) => async dispatch => {
  const videos = copy.highlights.reduce((arr, highlight) => {
    const { video, link } = highlight;
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

export const deleteHighlight = (project, highlight) => async dispatch => {
  const res = await axios.post('/api/deleteHighlight', { project, highlight });
  dispatch({ type: DELETE_HIGHLIGHT, payload: res.data });
}

export const updateHighlight = (project, highlight, start, stop, comment) => async dispatch => {
  const res = await axios.post('/api/updateHighlight', { project, highlight, start, stop, comment });
  dispatch({ type: UPDATE_HIGHLIGHT, payload: res.data });
}

export const submitHighlight = (project, video, start, stop, comment) => async dispatch => {
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

export const create_update = (update, create, _id) => async dispatch => {
  const res = await axios.post('/api/create_update', { update, create, _id });
  dispatch({ type: CREATE_POST, payload: res.data });
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}
