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
			var idSong = this.collection.pluck("id"), thatPlayer = this;
			$("#statusPlayer").css("background-image", "url(img/pauseIcon.png)");
			this.addListenerPlayer(idSong);
			SC.stream("/tracks/"+idSong,{useHTML5Audio: true},function(sound){
				thatPlayer.addListenerSoundObject(idSong, sound)
				soundManager.stopAll()
				sound.play({
  					onfinish: function(){
  						this.destruct();
  						$("#statusPlayer").css("background-image", "url(img/playIcon.png)")
  						if($("#playCloud_"+idSong).next().attr("id") != undefined){
  							$("#playCloud_"+idSong).removeClass("active").next().trigger("click");
						}
					},
					onpause: function(){
						$("#statusPlayer").css("background-image", "url(img/playIcon.png)");
					},																			// onpause y onplay se puede reemplazar cuando se activa togglePause usando toggleClass.
					onplay: function(){
						$("#statusPlayer").css("background-image", "url(img/pauseIcon.png)");
					},
				});
  				$("#statusPlayer").click(function(e) {
					e.preventDefault();
					sound.togglePause();
				});
  			});
			
		},
		addListenerPlayer: function(idSong){
			$("#nextSong").click(function(e) {
				e.preventDefault()
				if($("#playCloud_"+idSong).is(".active")){
					$("#playCloud_"+idSong).trigger("next")
				}
			});
			$("#playCloud_"+idSong).on("next",function(e){
				e.preventDefault()
				if($(this).next().attr("id") != undefined){
					//alert($(this).next().attr("id"))
					$(this).removeClass("active").next().click();
				}
				
			});
			$("#previousSong").click(function(e){
				e.preventDefault()
				if($("#playCloud_"+idSong).is(".active")){
					$("#playCloud_"+idSong).trigger("previous")
				}
			});
			$("#playCloud_"+idSong).on("previous", function(e){
				e.preventDefault()
				if($(this).prev().attr("id") != undefined){
					//alert($(this).prev().attr("id"))
					$(this).removeClass("active").prev().click();
					
				}
			});
		},
		addListenerSoundObject: function(idSong, sound){
			$("li.playCloud").click(function(){
				sound.destruct();
			});
			$("#playCloud_"+idSong).on("next previous", function(){
				sound.destruct();
			});
			
		}
	});
	return new playerView();
});
	