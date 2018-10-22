import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tags: null,

  tagName: 'span',
  classNames:['we-tags'],

  text: computed('tags', function(){
    let tags = this.get('tags');
    if(!tags || !tags.length) {
      return '';
    }

    let text = '';

    for (let i = 0; i < tags.length; i++) {
      if (!i) {
        text += '<span class="we-tag">'+tags[i]+'</span>';
      } else {
        text += ', '+'<span class="we-tag">'+tags[i]+'</span>';
      }
    }

    return text;
  })
});
