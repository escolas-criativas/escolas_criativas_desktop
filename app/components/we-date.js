import Component from '@ember/component';
import { computed } from '@ember/object';

const moment = requireNode('moment');

export default Component.extend({
  tagName: 'span',

  value: computed('date', function() {
    if (!this.date) {
      return null;
    }

    return moment(this.date).format(this.format || 'DD/MM/YYYY');
  }),
}).reopenClass({
  positionalParams: ['date', 'format']
});
