// Este modulo es para reproducir, con los comandos para controlar el player	
define (["jquery","backbone","APISound","collections/controlPlayerMusicCollection","jqueryUI"], function($, Backbone, SC, controlPlayerMusic){
	"use strict";
	var playerView = Backbone.View.extend({
		el: "#playerMusic",
		className: "player",
		template: _.template($("#playerTemplate").html()),
		initialize: function(){
			this.collection = new controlPlayerMusic();
			this.collection.on("reset", this.playSong, this);
			this.$el.html(this.template);
		},
		playSong : function(){
			var idSong = this.separatorIdPLay(this.collection.pluck("id")), thatPlayer = this;
			if(idSong[0] == "playCloud"){
				//Aqui va el reproductor de SoundCloud Api
				$("#statusPlayer").css("background-image", "url(img/pauseIcon.png)");
				SC.stream("/tracks/"+idSong[1],{useHTML5Audio: true},function(sound){
					thatPlayer.addListenerPlayer(idSong, sound)
					sound.play({
	  					onfinish: function(){
	  						this.destruct();
	  						$("#statusPlayer").css("background-image", "url(img/playIcon.png)")
	  						if($("#playCloud_"+idSong[1]).next().attr("id") != undefined){
	  							$("#playCloud_"+idSong[1]).next().trigger("click");
							}
						},
						onpause: function(){
							$("#statusPlayer").css("background-image", "url(img/playIcon.png)");
						}, // onpause y onplay se puede reemplazar cuando se activa togglePause usando toggleClass.
						onplay: function(){
							$("#statusPlayer").css("background-image", "url(img/pauseIcon.png)");
						},
					});
	  				$("#statusPlayer").click(function(e) {
						e.preventDefault();
						sound.togglePause();
					});
	  			});
			}
			if(idSong[0] == "playTube"){
				//Aqui va el reproductor de Youtube Api
				this.addListenerPlayer(idSong)
				this.onYouTubeIframeAPIReady(idSong[1]);
			}
		},
		onYouTubeIframeAPIReady: function(idVideoTube) {
			var player = new YT.Player("ytplayer", {
	          height: "400",
	          width: "400",
	          videoId: idVideoTube,
	          events: {
	            'onReady': this.onPlayerReady,
	            'onStateChange': this.onPlayerStateChange
	          }
	    	});
        },
		onPlayerReady: function(event) {
			event.target.playVideo();
      	},
      	onPlayerStateChange: function(event){
      		if(event.data == YT.PlayerState.PAUSED){
      			$("#statusPlayer").css("background-image", "url(img/playIcon.png)");
      		}
      		if(event.data == YT.PlayerState.PLAYING){
      			$("#statusPlayer").css("background-image", "url(img/pauseIcon.png)");
      		}
      		if(event.data == YT.PlayerState.ENDED){
      			$("#statusPlayer").css("background-image", "url(img/playIcon.png)");
      			this.deleteSound();
      			if($("#playTube_"+event.target.b.b.videoId).next().attr("id") != undefined){
      				$("#playTube_"+event.target.b.b.videoId).next().trigger("click");
				}
			}
      	},
      	deleteSound: function(){
      		// funcion encargada de borrar el objeto sound (SoundCloud) y eliminar el iframe (Youtube)
      		$("#ytplayer").remove();
			$("#playerMusic").append("<div id='ytplayer' style='visibility:hidden;'></div>");
			try{
  				$.each(soundManager.sounds, function(val, sound) {
					if(sound){
						sound.destruct();
					}
				});
  			}catch(err){}
      	},
      	addListenerPlayer: function(idSong, sound){
      		var that = this;
      		$("#nextSong").on("click", function(e) {
      			e.preventDefault();
      			that.deleteSound();
				if($("#"+idSong[0]+"_"+idSong[1]).is(".active")){
					if($("#"+idSong[0]+"_"+idSong[1]).next().attr("id") != undefined){
						$("#"+idSong[0]+"_"+idSong[1]).next().trigger("click");
						e.stopImmediatePropagation();
						
					}
				}
			});
			$("#previousSong").on("click", function(e){
				e.preventDefault();
				that.deleteSound();
				if($("#"+idSong[0]+"_"+idSong[1]).is(".active")){
					if($("#"+idSong[0]+"_"+idSong[1]).prev().attr("id") != undefined){
						$("#"+idSong[0]+"_"+idSong[1]).prev().trigger("click");
						e.stopImmediatePropagation();
					}
				}
			});
		},
		separatorIdPLay: function(id){
			var idSongTrack = id[0].split("_");
			return idSongTrack;
		}
	});
	return new playerView();
});
	