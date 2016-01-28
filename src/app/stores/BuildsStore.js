var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var assign = require('react/lib/Object.assign');

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  builds: {}
};

var setState = (newState) => {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
};

var update = (updates) => {
  var key = updates.url;
  if(state.builds.hasOwnProperty(key)) {
    state.builds[key] = assign({}, state.builds[key], updates.job);
    events.emit(CHANGE_EVENT);
  }
};

var remove = (key) => {
  delete state.builds[key];
  events.emit(CHANGE_EVENT);  
};

var createBuildsIfNeeded = (builds) => {
  var newBuilds = builds.reduce((prev, curr) => {
    if(state.builds.hasOwnProperty(curr)) {
      prev[curr] = state.builds[curr];
    } else {
      prev[curr] = {
        job: {},
        lastBuild: {},
        url: curr
      };
    }
    return prev;
  }, {});
  setState({
    builds: newBuilds
  });
};

var BuildsStore = {
  addChangeListener (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState () {
    return state;
  }
};

BuildsStore.dispatchToken = AppDispatcher.register((payload) => {
  var { action } = payload;
  if (action.type === ActionTypes.BUILD_REMOVED) {
    remove(action.build);
  } else if (action.type === ActionTypes.BUILD_LOADED) {
    update(action.build);
  } else if (action.type === ActionTypes.BUILDS_GRABBED) {
    createBuildsIfNeeded(action.builds);
  } else if (action.type === ActionTypes.NO_QUERY) {
    setState({
      builds: {}
    });
  }
});

module.exports = BuildsStore;
