import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject } from '@ember/service';

export default Route.extend ({
  learning: inject(),

  model(params) {
    const s = this.get('learning');

    return hash({
      record: s.getOneById(params.id),
      relatedRecord: s.getRelatedRecords(params.id)
    });
  }
});
