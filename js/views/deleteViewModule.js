// Este modulo se utiliza para eliminar una cancion de la lista del usuario. (CurrentPLaylist)
define(["jquery","underscore","backbone","jqueryUI"],function($, _, Backbone){
	var deleteView = Backbone.View.extend({
		tagName: "div",
		className: "delete",
		render: function(){
			this.addtoDelete();
			return this
		},
		addtoDelete: function(){
			this.$el.css({
				"display":"inline",
				"width":"15px",
				"height":"15px",
				"background-image":"url(img/borrarCancion.png)",
				"background-size":"15px 15px",
				"float":"right"
			});
			
		}
	});
	return deleteView;
});
	