import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { hash } from 'rsvp';

export default Route.extend ({
  ENV: null,

  init() {
    this.set('ENV', getOwner(this).resolveRegistration('config:environment'));
    this._super(...arguments);
  },

  beforeModel() {
    this._super(...arguments);

    return hash({});
  },
  model() {
    return hash({
      minimumLoadingDelay: new window.Promise( (resolve)=> {
        setTimeout( ()=> {
          resolve();
        }, 300);
      })
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