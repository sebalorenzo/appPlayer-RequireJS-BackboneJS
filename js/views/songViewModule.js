/*
		Este modulo se utiliza para añadir una cancion a las listas.
		Distingue cuando se trata de una cancion que se añade al Modulo de Busqueda o se añade al Modulo de CurrentPlaylist
*/
define(["jquery","backbone","views/deleteViewModule","jqueryUI"],function($, Backbone, deleteView){
	var songViewModule = Backbone.View.extend({
		tagName:"li",
		render: function () {
				this.addAttributes(this.attributes)
				return this;
	   },
	   events:{
	   		"dblclick .delete": "deleteSongPlayList"
	   },
	   addAttributes: function(type){
	   		this.$el.attr({
	   			id: this.model.get("id"),
	   			class: type.className,
				duration: this.model.get("duration"),
				genre: this.model.get("genre"),
				uri: this.model.get("uri"),
				description: this.model.get("description"),
				title: this.model.get("title")
			});
			this.$el.text(this.model.get("title"));
			if(type.type == "PlayList"){
				this.$el.width(180);
				var deleteButton = new deleteView();
	   			this.$el.append(deleteButton.render().el)
			}
	   	},
	   	deleteSongPlayList: function(){
	   		this.model.destroy();
	   		this.remove()
	   	}
	   		
	   
	});
	
	return songViewModule;
});	
	