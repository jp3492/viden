export const changeLocal = () => dispatch => {                        dispatch({ type: CHANGE_LOCAL })}
export const changeGroupOfFriend = (friend, group) => async dispatch => {
                                                                      await axios.post('/api/friend/group', {friend, group}),
                                                                      dispatch({ type: CHANGE_GROUP_OF_FRIEND, payload: { friend, group }})}
export const removeFriend = _id => async dispatch => {                await axios.delete(`/api/friend/${_id}`);
                                                                      dispatch({ type: REMOVE_FRIEND, payload: _id})}
export const selectGroup = group => dispatch => {                     dispatch({ type: SELECT_GROUP, payload: group })}
export const selectFolder = folder => dispatch => {                   dispatch({ type: SELECT_FOLDER, payload: folder })}
export const createProject = project => async dispatch => {           dispatch({ type: CREATING });
                                                                      const res = await axios.post('/api/project', project );
                                                                      dispatch({ type: PROJECT_CREATED, payload: res.data }); }
export const createFolder = folder => async dispatch => {             dispatch({ type: CREATING });
                                                                      const res = await axios.post('/api/folder', folder );
                                                                      dispatch({ type: FOLDER_CREATED, payload: res.data }); }
export const createGroup = group => async dispatch => {               dispatch({ type: CREATING });
                                                                      const res = await axios.post('/api/group', group );
                                                                      dispatch({ type: GROUP_CREATED, payload: res.data }); }
export const addLink = link => async dispatch => {                    const videoId = link.split("v=")[1].split("&")[0];
                                                                      const info = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items/snippet/title,items/snippet/description&key=${ytKey}`);
                                                                      dispatch({ type: ADD_LINK, payload: { type: "youtube", videoId, title: info.data.items[0].snippet.title } }); }
export const changePrivacy = privacy => dispatch => {                 dispatch({ type: CHANGE_PRIVACY, payload: privacy })}
export const changeDesciption = description => dispatch => {          dispatch({ type: CHANGE_DESCRIPTION, payload: description })}
export const changeName = name => dispatch => {                       dispatch({ type: CHANGE_NAME, payload: name })}
export const changeParent = parent => dispatch => {                   dispatch({ type: CHANGE_PARENT, payload: parent })}
export const addToDataArray = (group, data) => dispatch => {          dispatch({ type: ADD_TO_DATA_ARRAY, payload: data})}
export const setCreate = (type, create) => dispatch => {              dispatch({ type: SET_CREATE, payload: { type, create }})}
export const setFolder = _id => dispatch => {                         dispatch({ type: SET_FOLDER, payload: _id})}

export const subscribeToTimer = cb => dispatch =>  {                  socket.on('timer', timestamp => cb(null, timestamp));
                                                                      socket.emit('subscribeToTimer', 1000);}

export const confirmRequest = _id => async dispatch => {              await axios.post('/api/friend', { _id });
                                                                      dispatch({ type: CONFIRM_REQUEST, payload: _id }); }

export const selectFriend = _id => async dispatch => {                const res = await axios.get(`/api/friend/${_id}`);
                                                                      dispatch({ type: SELECT_FRIEND, payload: res.data })}

export const sendFriendRequest = _id => async dispatch => {           const res = await axios.post('/api/user/request', { _id });
                                                                      dispatch({ type: SEND_FRIEND_REQUEST, payload: res.data })}

export const selectUser = user => dispatch => {                       dispatch({ type: SELECT_USER, payload: user }) }

export const changeSearchOption = option => dispatch => {             dispatch({ type: CHANGE_SEARCH_OPTION, payload: option })}

export const deleteFolder = _id => async dispatch => {                await axios.delete(`/api/folder/${_id}`);
                                                                      dispatch({ type: DELETE_FOLDER, payload: _id }); }

export const updateFolder = (_id, name) => async dispatch => {        await axios.post('/api/folder/update', {name, _id});
                                                                      dispatch({ type: UPDATE_FOLDER, payload: {name, _id} })}

export const filterFolder = (_id, list) => dispatch => {              dispatch({ type: FILTER_FOLDER, payload: {_id, list} }) }

export const saveProjectToFolder = (pid, fid) => async dispatch => {  dispatch({ type: SAVE_PROJECT_TO_FOLDER }) }

export const changeFolderOfProject = (pid, fid, name) => async dispatch => {
                                                                      await axios.post('/api/highlights/folder', { pid, fid, name });
                                                                      dispatch({ type: CHANGE_FOLDER_OF_PROJECT, payload: { pid, fid } }) }

export const changeSite = site => dispatch => {                       dispatch({ type: CHANGE_SITE, payload: site }) }
export const changeView = view => dispatch => {                       dispatch({ type: CHANGE_VIEW, payload: view }) }
export const selectProject = project => dispatch => {                 dispatch({ type: SELECT_PROJECT, payload: project }) }

export const addFolder = title => async dispatch => {                 const res = await axios.post('/api/folder', {title});
                                                                      dispatch({ type: ADD_FOLDER, payload: res.data }) }

export const changeFolderName = title => dispatch => {                dispatch({ type: CHANGE_FOLDER_NAME, payload: title }) }

export const addingFolder = () => dispatch => {                       dispatch({ type: ADDING_FOLDER }) };

export const searchFocused = () => dispatch => {                      dispatch({ type: FOCUS_SEARCH }) }

export const fetchHighlight = (id, history) => async dispatch => {    const res = await axios.get(`/api/view/${id}`);
                                                                      dispatch({ type: FETCH_HIGH, payload: res.data });
                                                                      history.push("/editor")}

export const postDv = dv => async dispatch => {                       const res = await axios.post('/api/dv', dv);
                                                                      dispatch({ type: POST_DV, payload: res.data }) }

export const setDv = file => dispatch => {                            dispatch({ type: SET_DV, payload: file }) }

export const updateHighlights = (id, videos, title) => async dispatch => {
                                                                      const res = await axios.post('/api/highlights/update', {id, videos, title} );
                                                                      dispatch({ type: UPDATE_HIGHLIGHTS, payload: res.data }) }

export const addVideo = link => async dispatch => {                   const videoId = link.split("v=")[1].split("&")[0];
                                                                      const info = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items/snippet/title,items/snippet/description&key=${ytKey}`);
                                                                      dispatch({ type: ADD_VIDEO, payload: { type: "youtube", videoId, title: info.data.items[0].snippet.title } })}

export const removeVideo = video => dispatch => {                     dispatch({ type: REMOVE_VIDEO, payload: video }) }

export const editProject = (editing, infos) => async dispatch => {    console.log(editing, infos);dispatch({ type: EDIT, payload: {editing, infos} }) }

export const create = creating => dispatch => {                       dispatch({ type: CREATE, payload: creating }) }

export const removeLink = videoId => dispatch => {                    dispatch({ type: REMOVE_LINK, payload: videoId }) }

export const refreshPlayer = videos => dispatch => {                  dispatch({ type: REFRESH_PLAYER, payload: videos }) }

export const playerLoaded = () => dispatch => {                       dispatch({ type: PLAYER_LOADED }) }

export const navAdmin = history => async dispatch => {                const res = await axios.get('/api/users');
                                                                      dispatch({ type: FETCH_USERS, payload: res.data });
                                                                      history.push("/admin"); }

export const setVideo = index => dispatch => {                        dispatch({ type: SET_VIDEO, payload: index }) }

export const navVideo = (next, length) => dispatch => {               dispatch({ type: NAV_VIDEO, payload: { next, length } }) }

export const add_video = link => async dispatch => {                  const videoId = link.split("v=")[1].split("&")[0];
                                                                      const info = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items/snippet/title,items/snippet/description&key=${ytKey}`);
                                                                      dispatch({ type: ADD_VIDEO_ID, payload: { type: "youtube", videoId, title: info.data.items[0].snippet.title } }); }

export const setSearch = search => dispatch => {                      dispatch({ type: SET_SEARCH, payload: search }) }

export const selectMyList = callback => dispatch => {                 dispatch({ type: MY_LIST });
                                                                      callback; }

export const searchProject = (search, history, option) => async dispatch => {
                                                                      const res = await axios.get(`/api/search/${option}/${search}`);
                                                                      dispatch({ type: SEARCH_PROJECT, payload: { option, data: res.data } });
                                                                      history.push('/'); }

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

export const changeLink = link => dispatch => {                       dispatch({ type: CHANGE_LINK, payload: link }) }

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
