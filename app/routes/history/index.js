import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject } from '@ember/service';

export default Route.extend ({
  history: inject(),

  model() {
    return hash({
      records: this.get('history').getAll()
    });
  },

});