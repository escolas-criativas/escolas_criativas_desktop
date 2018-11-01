import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject } from '@ember/service';

export default Route.extend ({
  learning: inject(),

  queryParams: {
    searchTime: {
      refreshModel: true
    },
    haveText: {
      type: 'boolean'
    },
    HaveImage: {
      type: 'boolean'
    },
    haveVideo: {
      type: 'boolean'
    },
    haveAudio: {
      type: 'boolean'
    }
  },

  model(params) {
    return hash({
      records: this.get('learning').getAll(params)
    });
  },

});