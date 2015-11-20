import moment from 'moment';
import Immutable from 'immutable';
import Reflux from 'reflux';

const actions = Reflux.createActions([
  "create", 
]);

const state = {
  data: Immutable.Map(),
}

const store = Reflux.createStore({

  listenables: [actions],

  getInitialState: function(){
    return state;
  },

  onCreate(person){
    console.log(person);
  },

});

export {store as personsStore, actions as personsActions};


