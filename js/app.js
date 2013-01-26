define(["jquery","underscore","backbone","views/searchModule","views/currentPlaylist","views/playerViewModule","jqueryUI"], function($, _, Backbone,searchModule,currentPlaylist,playerView){
  var app={};
  app.init = function(){
  	new searchModule();
  	playerView;
  }
  return app;
});