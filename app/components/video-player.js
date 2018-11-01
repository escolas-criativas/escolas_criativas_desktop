import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

const embed = requireNode('embed-video');

export default Component.extend({
  html: null,
  url: null,

  init() {
    this._super(...arguments);
    this.updateHTML();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.updateHTML();
  },

  updateHTML() {
    let url = this.get('url');

    if (!url) {
      return;
    }
    let html = embed(url, {
      attr: {
        class: 'embed-responsive-item history-video-preview'
      }
    });

    if (!html) {
      return;
    }

    html = html.replace('src="', 'src="https://');

    this.set('html', htmlSafe(html));
  }

});
