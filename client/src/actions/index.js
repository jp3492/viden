import axios from 'axios';
import openSocket from 'socket.io-client';
import { FETCH_USER, CREATE_UPDATE, CREATE_POST, CREATING_UPDATE, CREATING_POST, REMOVE, CHANGE_SEARCH_TERM, SUBMIT_HIGHLIGHT, UPDATE_HIGHLIGHT,
DELETE_HIGHLIGHT, REQUEST, ANSWER_REQUEST } from './types';

const socket = openSocket('http://localhost:8000');
const ytKey = "AIzaSyDNjPIijQMBwx6H7ZO1bPZpv3bmL2ZhIq4";

export const answerRequest = (me, type, target, user, confirm) => async dispatch =>{
  socket.emit('answerRequest', { me, type, target, user, confirm });
  socket.on('answerRequest', res => {
    dispatch({ type: ANSWER_REQUEST, payload: res });
    socket.removeAllListeners();
  });
}

export const request = (me, type, target, user) => async dispatch => {
  socket.emit('request', { me, type, target, user });
  socket.on('request', res => {
    dispatch({ type: REQUEST, payload: res });
    socket.removeAllListeners();
  });
}

export const deleteHighlight = (project, highlight) => async dispatch => {
  socket.emit('deleteHighlight', { project, highlight });
  socket.on('deleteHighlight', res => {
    dispatch({ type: DELETE_HIGHLIGHT, payload: res });
    socket.removeAllListeners();
  });
}

export const updateHighlight = (project, highlight, start, stop, comment) => async dispatch => {
  socket.emit('updateHighlight', { project, highlight, start, stop, comment });
  socket.on('updateHighlight', res => {
    dispatch({ type: UPDATE_HIGHLIGHT, payload: { project, highlight, start, stop, comment } });
    socket.removeAllListeners();
  });
}

export const submitHighlight = (project, video, start, stop, comment) => async dispatch => {
  socket.emit('submitHighlight', { project, video, start, stop, comment });
  socket.on('submitHighlight', res => {
    dispatch({ type: SUBMIT_HIGHLIGHT, payload: res });
    socket.removeAllListeners();
  });
}

export const search_global = (type, term, _id) => async dispatch => {
  socket.emit('search', { type, term, _id });
  socket.on('search', res => {
    dispatch({ type: CHANGE_SEARCH_TERM, payload: res });
    socket.removeAllListeners();
  });
}

export const removeObj = (obj, _id) => async dispatch => {
  socket.emit('remove', { obj, _id });
  socket.on('remove', res => {
    dispatch({ type: REMOVE, payload: res });
    socket.removeAllListeners();
  });
}

export const create_update = (update, create, _id) => async dispatch => {
  socket.emit('post', { update, create, _id });
  socket.on('post', res => {
    dispatch({ type: CREATE_POST, payload: res });
    socket.removeAllListeners();
  })
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}
