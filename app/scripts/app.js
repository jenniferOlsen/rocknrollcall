var RocknrollcallYeoman = window.RocknrollcallYeoman = Ember.Application.create({

});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');

Ember.Handlebars.helper('hotttnesss-badge', function(value, options) {
 var h = parseFloat(value);
  var hotttnesss_num = Math.round(h * 100);
  var hotttnesss_css = Math.ceil(h * 10) - 1;
  var html = "<h4>Hotness: ";
  if (hotttnesss_num > 0) {
    html += '<i class="hotttnesss">';
    for (var i=0;i<hotttnesss_css;i++) {
      html += '<i class="glyphicon glyphicon-fire hotttnesss'+i+'"></i>';
    }
    html += "</i>";
    html += '<span class="hotttnesss-badge">'+hotttnesss_num+'</span></h4>';
  } else {
    html += "0</h4>";
  }
  return new Handlebars.SafeString(html);
});

RocknrollcallYeoman.ApplicationController = Em.ObjectController.extend({
  searchTerms: '',
  applicationName: function() {
    var st = this.get('searchTerms');
    if (st) {
      return st
    } else {
      return "Rock'n'Roll Call"
    }
  }.property('searchTerms'),
  actions: {
    submit: function() {
      this.transitionToRoute('search-results', this.get('searchTerms'));
    }
  }
});
RocknrollcallYeoman.SearchResultsController = Em.ObjectController.extend({
  artistsIsChecked: true,
  songsIsChecked: true,
  actions: {
    viewedArtist: function(model) {
      var date = Date.now();
      var activity = this.store.createRecord('activity', {
        display_id: model.enid,
        type: model.type,
        display_name: model.name,
        hotttnesss: model.hotttnesss,
        timestamp: date
      });
      activity.save();
      this.transitionToRoute('artist', model.enid);
  },
    viewedSong: function(model) {
      var date = Date.now();
      var activity = this.store.createRecord('activity', {
        display_id: model.enid,
        type: model.type,
        display_name: model.artist_name,
        hotttnesss: model.hotttnesss,
        timestamp: date
      });
      activity.save();
      this.transitionToRoute('song', model.enid);
    }
  },
});