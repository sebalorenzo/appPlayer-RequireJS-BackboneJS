// Este modulo se utiliza para armar la lista que el usuario (CurrentPlaylist)
define (["jquery","backbone","APISound","collections/controlCurrentPlaylistCollection","views/songViewModule","jqueryUI"], function($, Backbone, SC, controlCurrentPlaylist, songViewModule, playerView){
	"use strict";
	var currentPlaylist = Backbone.View.extend({
		el: "#currentPlaylist",
		ul: $("<ul/>",{
				id:"playlistNow",
				class:"playlistNow-SoundClound"
			}),
		events:{
			"click li.playCloud":"player"
		},
		initialize: function(){
			this.collection = new controlCurrentPlaylist();
			this.collection.on("add", this.addTrackList, this);
			//this.collection.on("remove", this.deleteTrackList, this);   <-- listener de cuando se borra una cancion de CurrentPlayer
		},
		addTrackList: function(song){
			if(song.get("class") == "searchSoundCloud"){
				var songPlayList = new songViewModule({
				model: song,
				attributes:{ type:"PlayList", className: "playCloud" }
				});
				this.$el.append(this.ul.append(songPlayList.render().el))
			}
			if(song.get("class") == "searchYoutube"){
				var songPlayList = new songViewModule({
				model: song,
				attributes:{ type:"PlayList", className: "playTube" }
				});
				this.$el.append(this.ul.append(songPlayList.render().el))
			}
			
		},
		player: function(liSong){
			var idSong={};
			if(isNaN(liSong)){
				if($(liSong.target).attr("classname") == "playCloud"){
					if($(liSong.target).attr("class") != "active"){
						$(liSong.target).addClass("active");
					}
					liSong.preventDefault();
	   				idSong["id"] = this.separatorIdPLay(liSong.target.id)
	   				require("views/playerViewModule").collection.reset(idSong);
				}
					
			}
			
		},
		separatorIdPLay: function(id){
			var idSong = id.split("_");
			return parseInt(idSong[1]);
		}
		
	});
	return new currentPlaylist();
});
	