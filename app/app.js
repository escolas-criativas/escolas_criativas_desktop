import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import Route from '@ember/routing/route';
import $ from 'jquery';

const electron = requireNode('electron');

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

Route.reopen({
  activate: function() {
    this._super.apply(this, arguments);
    window.scrollTo(0,0);
    $('body').attr('class', this.routeName.replace(/\./g, '-').dasherize());
  }
});

let comp = new RegExp(location.host);

$('body').on('click', 'a', (event) => {
  if (!comp.test( event.currentTarget.href ) ) {
    event.preventDefault();
    let link = event.currentTarget.href;
    electron.shell.openExternal(link);
  }
});

export default App;
