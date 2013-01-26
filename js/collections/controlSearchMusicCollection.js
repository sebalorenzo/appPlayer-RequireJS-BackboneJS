// Es la colleccion que usa SearchMusic.
define(["backbone","models/songsModel"],function(Backbone, Songs){
	var controlSearchMusic = Backbone.Collection.extend({ 
		model: Songs,
		url: 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&max-results=10',
		parse: function(resp){
			return resp.data.items ;
			
		} 
	});
	return controlSearchMusic;
});
