// Colleccion qu usa CurrentPlaylist.
define(["backbone","models/songsModel"],function(Backbone,Songs){
	var controlCurrentPlaylist	= Backbone.Collection.extend({ model: Songs });
	return controlCurrentPlaylist;
});
