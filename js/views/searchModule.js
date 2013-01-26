//Este modulo se utiliza para hacer las busquedas e interactua con CurrentPlaylist.
define (["jquery","backbone","APISound","collections/controlSearchMusicCollection","views/songViewModule","jqueryUI"], function($, Backbone, SC, controlSearchMusic, songViewModule){
	"use strict";
	var searchModule = Backbone.View.extend({
		el: "#containerSearch",
		ul: $("<ul/>",{
			id:"listSearch",
			class:"listSearch-SoundClound"
		}),
		initialize: function () {
			this.collection = new controlSearchMusic();
			this.collection.on("reset", this.render, this);
			this.iniciarSoundClound();
		},
		events:{
			"click #textSearch":"vaciarText",
			"click #clickSearch":"goSearch",
			"dblclick li":"selectTrack"
		},
  		iniciarSoundClound: function(){
  			SC.initialize({
  				client_id: "916e614d6781d6abe550e92197ffa1db"
  			});
  		},
  		searchSoundClound: function(value){
  			this.$el.find("li").remove();
  			var that = this;
  			SC.get("/tracks", { q: value, limit:10 }, function(tracks, error) {
  				if(!error){
  					that.collection.reset(tracks);
  				}else alert("Error:" + error.message);
			});
			
  		},
		render: function(){
  			_.each(this.collection.models, function (song) {
  				if(!isNaN(song.id)){
  					this.createViewSongCloud(song);
  				}else{
  					this.createViewSongTube(song);
  				}
  			},this);
 		},
  		createViewSongCloud: function(song){
  			var songSearch= new songViewModule({
								model: song,
								attributes:{type:"Search", className: "searchSoundCloud"}
			});
			this.$el.append(this.ul.append(songSearch.render().el));
  			
  		},
  		createViewSongTube: function(song){
  			var songSearch= new songViewModule({
								model: song,
								attributes:{type:"Search", className: "searchYoutube"}
			});
			this.$el.append(this.ul.append(songSearch.render().el));
  		},
  		vaciarText: function(elementEvent){
  			$(elementEvent.target).val("");
  		},
  		goSearch: function(){
  			var textSearch = $("#textSearch").val();
  			if( textSearch != "" ){
  				this.searchSoundClound(textSearch);
  				this.collection.fetch({data:{q:textSearch}});
  			}
  		},
  		selectTrack: function(element){
  			var trackJSON ={};
  			if($(element.target).attr("class") == "searchSoundCloud"){
  				trackJSON["id"]= "playCloud_"+$(element.target).attr("id");
  			}
  			if($(element.target).attr("class") == "searchYoutube"){
  				trackJSON["id"]= "playTube_"+$(element.target).attr("id");
  			}
  			trackJSON["duration"]= $(element.target).attr("duration");
  			trackJSON["title"]= $(element.target).attr("title");
  			trackJSON["genre"]= $(element.target).attr("genre");
  			trackJSON["description"]= $(element.target).attr("description");
  			trackJSON["class"]= $(element.target).attr("class")
  			require("views/currentPlaylist").collection.add(trackJSON);
  			
  		}
	});
	
	return searchModule;
});
	