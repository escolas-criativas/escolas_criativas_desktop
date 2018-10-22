import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

const path = requireNode('path');


export default Component.extend({
  cached: inject(),

  tagName: 'img',
  attributeBindings: ['fsrc:src', 'alt'],

  fsrc: computed('src', function() {
    let folder = path.join(this.get('cached.localCacheFolder'),this.get('src').replace('cacheData/', ''));

    return 'cached:/'+folder;
  })
});



// cached:///home/a/escolasCriativasCacheData/history/items/1/large_1536977796271_5f3fb3f0-b88d-11e8-b692-f93ff8e77e13.jpg