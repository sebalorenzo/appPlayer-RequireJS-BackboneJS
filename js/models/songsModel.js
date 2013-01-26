// Es el modelo en el que se guardan el JSON con los datos de la SoundCloud API
define(["backbone"],function(Backbone){
	var songs = Backbone.Model.extend({
		 defaults:{
		 	url: "/some/url"
		 }
	});
	return songs;
});
