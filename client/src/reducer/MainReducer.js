import { FETCH_USER, CHANGE_VIEW, CHANGE_PAGE, CHANGE_SEARCH_LOCAL, CHANGE_SEARCH_OPTION, CHANGE_SEARCH_TERM, SELECT_USER, SELECT_PROJECT, SELECT_GROUP, SELECT_FOLDER,
CREATE, CHANGE_CREATE_ATTRIBUTE, CLEAR_CREATE, CREATE_REMOVE_VIDEO, CREATE_POST, UPDATE, REMOVE, SUBMIT_HIGHLIGHT, UPDATE_HIGHLIGHT, LOGOUT,
DELETE_HIGHLIGHT, REQUEST, ANSWER_REQUEST, COPY_CREATE, COPY, SELECT_MULTIPLE, ADD_PROJECT, INVITE, DELETE_MULTIPLE, DELETE_HIGHLIGHTS,
LOG, GET_PROJECT, COPY_ADDED } from '../actions/types';
import ReactPlayer from 'react-player';
import $ from 'jquery';
import _ from 'lodash';

const initialState = {
  log: false,
  site: "home",
  view: "directory",
  searchLocal:  true,
  searchOption: "projects",
  searchTerm: "",
  create: null,
  update: false,
  projects: [],
  friends: [],
  folders: [],
  groups: [],
  access: [],
  filteredProjects: [],
  filteredHighlights: [],
  filteredFriends: [],
  selectedUser: null,
  selectedGroup: null,
  selectedFolder: null,
  selectedProject: null,
  selectedProjects: false
}

export default function ( state = initialState, action ){
  let filteredProjects, filteredFriends, selectedProject, selectedUser, create, videos, folder, group, project,
   user, projects, folders, groups, friends, searchOption, searchTerm, view, filteredHighlights, highlights, access, video, invites,
   selectedProjects;
  switch (action.type) {
    case COPY_ADDED:
      //map over state.projects, check if is in received projects, if so, return new project
      const newProjects = action.payload.map( p => { return p._id });
      return { ...state, projects: state.projects.map( p => {
          if (newProjects.indexOf(p._id) !== -1) {
            project = action.payload.filter( t => { return t._id === p._id})
            return project[0];
          } else {
            return p;
          }
        }),
        filteredProjects: state.filteredProjects.map( p => {
          if (newProjects.indexOf(p._id) !== -1) {
            project = action.payload.filter( t => { return t._id === p._id})
            return project[0];
          } else {
            return p;
          }
        })
      }
    case GET_PROJECT:
      return { ...state, site: "player", filteredProjects: [...state.filteredProjects, action.payload ], projects: [ ...state.projects, action.payload], filteredHighlights: action.payload.highlights, selectedProject: action.payload._id };
    case LOG:
      return { ...state, log: true };
    case DELETE_HIGHLIGHTS:
      project = state.projects.filter( p => { return p._id === action.payload.project });
      highlights = project[0].highlights.filter( h => { return action.payload.highlights.indexOf(h._id) === -1 });
      project = { ...project[0], highlights };
      projects = state.projects.map( p => { if (p._id === action.payload.project) { return project } return p });
      filteredProjects = state.filteredProjects.map( p => { if (p._id === action.payload.project) { return project } return p })
      return { ...state, filteredHighlights: highlights, projects, filteredProjects };
    case DELETE_MULTIPLE:
      projects = state.projects.filter( p => { return action.payload.indexOf(p._id) === -1});
      access = state.access.filter( a => { return action.payload.indexOf(a.target) === -1});
      return { ...state, projects, filteredProjects: projects, access, selectedProject: null, selectedProjects: false };
    case ADD_PROJECT:
      if (state.selectedProjects.projects.indexOf(action.payload) === -1) {
        project = state.projects.filter( p => { return p._id === action.payload });
        videos = project[0].videos.filter( v => { return state.selectedProjects.videos.indexOf(v) === -1 } );
        videos = state.selectedProjects.videos.concat(videos);
        highlights = project[0].highlights.map( h => {
          video = videos.indexOf(project[0].videos[h.video]);
          return { ...h, project: state.selectedProjects.projects.length, video }
        });
        highlights = state.selectedProjects.highlights.concat(highlights);
        highlights = _.sortBy(highlights, "start");
        return { ...state, selectedProjects: { ...state.selectedProjects, projects: [ ...state.selectedProjects.projects, action.payload ], videos, highlights } };
      } else {
        return { ...state, selectedProjects: { ...state.selectedProjects, projects: state.selectedProjects.projects.filter( p => {  return p !== action.payload }) } };
      }
    case SELECT_MULTIPLE:
      if (state.selectedProjects === false) { return { ...state, selectedProjects: { videos: [], projects: [], highlights: [] } } }
      else { return { ...state, selectedProjects: false } }
    case ANSWER_REQUEST:
      const { me, target, confirm } = action.payload;
      if (action.payload.type === "friend") {
        if (confirm === true) {
          friends = state.friends.map( f => {
            if (f._id === action.payload.user) {
              return { ...f, status: "confirmed" };
            }
            return f;
          });
          return { ...state, friends };
        } else {
          friends = state.friends.filter( f => { return f._id !== action.payload.user });
          return { ...state, friends };
        }
      } else {
        if (confirm === true) {
          access = state.access.map( a => {
            if (a.user === action.payload.user && a.target === target) {
              return { ...a, status: "confirmed" };
            }
            return a;
          });
          if (action.payload.project !== null) {
            projects = [ ...state.projects, action.payload.project ];
          } else {
            projects = state.projects;
          }

          return { ...state, access, projects, filteredProjects: projects };
        } else {
          access = state.access.filter( a => { return a.user !== action.payload.user && a.target !== target });
          return { ...state, access }
        }
      }
    case REQUEST:
      if (action.payload.type === "friend") {
        return { ...state, friends: [ ...state.friends, { _id: action.payload.user, status: "requestSent", parent: null } ] };
      } else {
        return { ...state, access: [ ...state.access, { user: action.payload.user, target: action.payload.target, type: action.payload.type, status: "requestSent" } ] };
      }
    case DELETE_HIGHLIGHT:
      filteredHighlights = state.filteredHighlights.filter( h => { return h._id !== action.payload.highlight });
      filteredHighlights = filteredHighlights.map( h => {
        if (h.index > action.payload.index) {
          return { ...h, index: h.index - 1 }
        } else {
          return h
        }
      });
      project = state.projects.filter( p => { return p._id === state.selectedProject });
      highlights = project[0].highlights.filter( h => { return h._id !== action.payload.highlight });
      highlights = highlights.map( h => {
        if (h.index > action.payload.index) {
          return { ...h, index: h.index - 1 };
        } else {
          return h;
        }
      });
      projects = state.projects.map( p => {
        if (p._id === action.payload.project) {
          return { ...p, highlights };
        }
        return p;
      });
      return { ...state, projects, filteredHighlights, edit: false };
    case UPDATE_HIGHLIGHT:
      filteredHighlights = state.filteredHighlights.map( h => {
        if (h._id === action.payload.highlight) {
          return { ...h, start: action.payload.start, stop: action.payload.stop, comment: action.payload.comment };
        }
        return h;
      });
      project = state.projects.filter( p => { return p._id === state.selectedProject });
      highlights = project[0].highlights.map( h => {
        if (h._id === action.payload.highlight) {
          return { ...h, start: action.payload.start, stop: action.payload.stop, comment: action.payload.comment };
        }
        return h;
      });
      projects = state.projects.map( p => {
        if (p._id === action.payload.project) {
          return { ...p, highlights };
        }
        return p;
      });
      return { ...state, projects, filteredHighlights, edit: false };
    case SUBMIT_HIGHLIGHT:
      project = state.projects.filter( p => { return p._id === state.selectedProject });
      const index = state.projects.indexOf(project[0]);
      let highlights = project[0].highlights;
      highlights = [ ...highlights, action.payload ];
      highlights = _.sortBy(highlights, "start");
      project = { ...project[0], highlights };
      projects = state.projects.map( p => {
        if (p._id === state.selectedProject) { return project }
        return p
      });
      return { ...state, projects, filteredProjects: projects, filteredHighlights: highlights };
    case REMOVE:
      switch (state.create.type) {
        case "folder":
          folders = state.folders.filter( f => { return f._id !== state.create._id });
          return { ...state, folders, create: null, update: false, selectedFolder: null };
        case "group":
          groups = state.groups.filter( g => { return g._id !== state.create._id });
          return { ...state, groups, create: null, update: false, selectedGroup: null };
        case "project":
          access = state.access.filter( a => { return a.target !== state.create._id });
          projects = state.projects.filter( p => { return p._id !== state.create._id });
          return { ...state, access, projects, filteredProjects: projects, create: null, update: false, selectedProject: null };
        case "user":
          friends = state.friends.filter( f => { return f._id !== state.create._id });
          return { ...state, friends, filteredFriends: friends, create: null, update: false, selectedUser: null };
      }
    case INVITE:
      if (action.payload.type === "user") {
        if (state.create.invites.indexOf(action.payload._id) !== -1) {
          invites = state.create.invites;
          invites = invites.filter( i => { return i !== action.payload._id})
          return { ...state, create: { ...state.create, invites } }
        }
        return { ...state, create: { ...state.create, invites: [ ...state.create.invites, action.payload._id ] } }
      }
      if (action.payload.checked === true) {
        invites = state.create.invites.filter( i => { return action.payload.allFriends.indexOf(i) === -1 });
        return { ...state, create: { ...state.create, invites } };
      } else {
        invites = state.create.invites;
        action.payload.allFriends.map( f => {
          if (invites.indexOf(f) === -1) {
            invites.push(f);
          }
        });
      }
      return { ...state, create: { ...state.create, invites } };
    case UPDATE:
      switch (action.payload) {
        case "folder":
          folder = state.folders.filter( f => { return f._id === state.selectedFolder });
          create = { ...folder[0], type: "folder", invites: [] }; break;
        case "group":
          group = state.groups.filter( g => { return g._id === state.selectedGroup });
          create = { ...group[0], type: "group", invites: [] }; break;
        case "project":
          project = state.projects.filter( p => { return p._id === state.selectedProject });
          create = { ...project[0], type: "project", invites: [] }; break;
        case "user":
          user = state.friends.filter( f => { return f._id === state.selectedUser });
          create = { ...user[0], type: "user" }; break;
      }
      return { ...state, update: true, create };
    case CREATE_POST:
      const { type, data } = action.payload;
      if (state.update === true) {
        switch (type) {
          case "project":
            projects = state.projects.map( p => {
              if (p._id === data._id) { return data }
              return p;
            });
            access = state.access;
            if (data.invites.length !== 0) {
              data.invites.map( i => {
                access.push({ user: i, target: data._id, status: "inviteSent", type: "project"})
              });
            }
            return { ...state, projects, filteredProjects: projects, create: null, update: false, access };
          case "folder":
            folders = state.folders.map( f => {
              if (f._id === data._id) { return data }
              return f;
            });
            return { ...state, folders, create: null, update: false };
          case "group":
            groups = state.groups.map( g => {
              if (g._id === data._id) { return data }
              return g;
            });
            return { ...state, groups, create: null, update: false };
          case "user":
            friends = state.friends.map( f => {
              if (f._id === data._id) { return data }
              return f;
            });
            return { ...state, friends, filteredFriends: friends, create: null, update: false };
        }
      }
      switch (type) {
        case "project":   return { ...state, projects: [ ...state.projects, data ], create: null };
        case "folder":    return { ...state, folders: [ ...state.folders, data ], create: null };
        case "group":     return { ...state, groups: [ ...state.groups, data ], create: null };
      }
    case CREATE_REMOVE_VIDEO:
      videos = state.create.videos.filter( v => { return v !== action.payload });
      create = { ...state.create, videos };
      return { ...state, create };
    case CLEAR_CREATE: return { ...state, create: null };
    case CHANGE_CREATE_ATTRIBUTE:
      const { key, value } = action.payload;
      if (key === "videos" && ReactPlayer.canPlay(value) && state.create.videos.indexOf(value) === -1) {
        videos = state.create.videos;
        videos.push(value);
        create = { ...state.create, videos };
        return { ...state, create };
      } else if (key !== "videos") {
        create = { ...state.create, [key]: value };
        return { ...state, create };
      }
      return state;
    case COPY_CREATE:
      return { ...state, create: { ...action.payload, invites: [] }, update: false };
    case COPY:
      return { ...state, create: { type: "project", title: "", parent: null, privacy: "public", description: "", videos: [], invites: [] } };
    case CREATE:
      switch (action.payload) {
        case "dataVolley":  create = { type: "dataVolley", title: "", parent: null, privacy: "public", description: "", videos: [], file: null, invites: [] }; break;
        case "folder":    create = { type: "folder", name: "", parent: null, privacy: "public", description: "" }; break;
        case "group":     create = { type: "group", name: "", parent: null, description: "", friends: [] }; break;
        case "project":   create = { type: "project", title: "", parent: null, privacy: "public", description: "", videos: [], invites: [] }; break;
        default:          create = null;
      }
      return { ...state, create, update: false };
    case SELECT_FOLDER:
      filteredProjects = state.projects.filter( p => { return p.parent === action.payload });
      return { ...state, selectedFolder: action.payload, filteredProjects };
    case SELECT_GROUP:
      filteredFriends = state.friends.filter( f => { return f.parent === action.payload });
      return { ...state, selectedGroup: action.payload, filteredFriends };
    case SELECT_PROJECT:
      selectedProject = (action.payload === state.selectedProject) ? null: action.payload;
      selectedProjects = (action.payload === null) ? false: state.selectedProjects;
      filteredHighlights = state.projects.filter( p => { return p._id === action.payload});
      if (filteredHighlights[0] === undefined) {
        return { ...state, selectedProject, selectedProjects };
      }
      filteredHighlights = (selectedProject !== null) ? filteredHighlights[0].highlights: [];
      filteredHighlights = _.sortBy(filteredHighlights, "start");
      return { ...state, selectedProject, filteredHighlights, selectedProjects };
    case SELECT_USER:
      selectedUser = (action.payload === state.selectedUser) ? null: action.payload;
      return { ...state, selectedUser };
    case CHANGE_VIEW:
      searchOption = (action.payload === "directory") ? "projects": (action.payload === "groups") ? "people": state.searchOption;
      filteredProjects = state.projects.filter( p => {
        if (state.searchTerm !== "") {
          return p.title.toLowerCase().includes(state.searchTerm.toLowerCase());
        }
        return p;
      });
      filteredFriends = state.friends.filter( f => {
        if (state.searchTerm !== "") {
          return (f.firstName.toLowerCase().includes(state.searchTerm.toLowerCase()) || f.lastName.toLowerCase().includes(state.searchTerm.toLowerCase()));
        }
        return f;
      });
      return { ...state, searchOption, view: action.payload, selectedUser: null, selectedProject: null, filteredFriends: state.friends, filteredProjects, selectedGroup: null, selectedFolder: null };
    case CHANGE_SEARCH_LOCAL:   return { ...state, searchLocal: !state.searchLocal };
    case CHANGE_SEARCH_OPTION:
      view = (action.payload === "people") ? "groups": (action.payload === "projects") ? "directory": state.view;
      return { ...state, searchOption: action.payload, view };
    case CHANGE_SEARCH_TERM:
      if (state.site === "player") {
        project = state.projects.filter( p => { return p._id === state.selectedProject });
        highlights = (state.selectedProjects === false) ? project[0].highlights: state.selectedProjects.highlights;
        filteredHighlights = highlights.filter( h => {
          const comm = h.comment.toLowerCase();
          if (comm.includes(action.payload.toLowerCase())) {
            return true;
          }
          return false;
        });
        filteredHighlights = _.sortBy(filteredHighlights, "start");
        return { ...state, searchTerm: action.payload, filteredHighlights };
      }
      if (state.searchLocal) {
        switch (state.searchOption) {
          case "projects":
            filteredProjects = state.filteredProjects.filter( p => {
              return p.title.toLowerCase().includes(action.payload.toLowerCase());
            });
            return { ...state, filteredProjects, searchTerm: action.payload, selectedProject: null };
          case "people":
            filteredFriends = state.filteredFriends.filter( f => {
              return (f.firstName.toLowerCase().includes(action.payload.toLowerCase()) || f.lastName.toLowerCase().includes(action.payload.toLowerCase()));
            });
            return { ...state, filteredFriends, searchTerm: action.payload, selectedUser: null };
          case "sequences":
            let allSequences = [];
            state.projects.map( p => {
              const aHighlights = p.highlights.map( h => { return { ...h, project: p._id } });
              allSequences.concat(aHighlights);
            })
            console.log(allSequences);
            return state;
        }
      } else {
        searchTerm = (action.payload === "") ? "": (typeof action.payload === "object") ? action.payload.term: state.searchTerm;
        switch (state.searchOption) {
          case "projects":
            filteredProjects = (action.payload.constructor === Array) ? action.payload: state.filteredProjects;
            return { ...state, filteredProjects, searchTerm, selectedProject: null };
          case "people":
            filteredFriends = (action.payload.constructor === Array) ? action.payload: state.filteredFriends;
            return { ...state, filteredFriends, searchTerm, selectedUser: null };
          case "sequences": return { ...state, searchTerm };
        }
      }
    case LOGOUT: return initialState;
    case CHANGE_PAGE:
      if (state.selectedProjects !== false) {
        if (action.payload === "home") {
          return { ...state, site: action.payload, searchTerm: "", create: null, selectedProjects: false, selectedProject: null };
        }
        return { ...state, site: action.payload, searchTerm: "", create: null, filteredHighlights: state.selectedProjects.highlights };
      }
      return { ...state, site: action.payload, searchTerm: "", create: null, selectedProject: null };
    case FETCH_USER:
      if (action.payload === false) {
        return initialState;
      }
      filteredFriends = (state.filteredFriends === []) ? action.payload.friends: state.filteredFriends;
      return { ...initialState, access: action.payload.access, projects: action.payload.projects, filteredProjects: action.payload.projects, friends: action.payload.friends, filteredFriends, folders: action.payload.folders, groups: action.payload.groups };
    default: return state;
  }
}
