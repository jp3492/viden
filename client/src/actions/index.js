import axios from 'axios';
import { EXAMPLE_ACTION } from './types';

export const exampleAction = (params) => async dispatch => {
  dispatch({type: EXAMPLE_ACTION});
}
