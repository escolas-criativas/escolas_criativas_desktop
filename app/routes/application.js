import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { hash } from 'rsvp';
import { inject } from '@ember/service';

export default Route.extend ({
  news: inject(),
  history: inject(),
  learning: inject(),

  ENV: null,

  init() {
    this.set('ENV', getOwner(this).resolveRegistration('config:environment'));
    this._super(...arguments);
  },

  model() {
    return hash({
      minimumLoadingDelay: new window.Promise( (resolve)=> {
        setTimeout( ()=> {
          resolve();
        }, 300);
      }),
      news: this.get('news').preloadAll(),
      history: this.get('history').preloadAll(),
      learning: this.get('learning').preloadAll()
    });
  },

  actions: {
    goTo(route, params) {
      if (params) {
        this.transitionTo(route, params);
      } else {
        this.transitionTo(route);
      }
    },
    showLoginModal() {
      this.set('showLoginModal', true);
    },
    scrollToTop() {
      // move scroll to top:
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
});