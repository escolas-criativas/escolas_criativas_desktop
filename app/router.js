import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('history', function() {
    this.route('item', { path: ':id' }, function(){});
  });

  this.route('learning-object', function() {
    this.route('item', { path: ':id' }, function(){});
  });

  this.route('news', function() {
    this.route('item', { path: ':id' }, function(){});
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;
