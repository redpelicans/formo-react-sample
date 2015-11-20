import Immutable from 'immutable';
import Reflux from 'reflux';
import {personsActions} from './persons';

const actions = Reflux.createActions([
  "load", 
]);

const companies = {
  1: {_id: 1, name: "Sonso"},
  2: {_id: 2, name: "Donnelly"},
  3: {_id: 3, name: "Stamm and Green"},
}

const state = {
  data: Immutable.fromJS(companies),
}

const store = Reflux.createStore({

  listenables: [actions],

  getInitialState: function(){
    return state;
  },

  onLoad: function({forceReload=false, ids=[]} = {}){
    this.trigger(state);
  },

});

export {store as companiesStore, actions as companiesActions};


