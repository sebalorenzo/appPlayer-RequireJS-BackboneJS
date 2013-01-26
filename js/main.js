require.config({
  paths: {
    "jqueryUI": "libs/jquery-ui",
    "jquery": "empty:",
    "underscore": "libs/underscore-min",
    "backbone": "libs/backbone-min",
    "APISound": "libs/sdk"
  },
  shim: {
  	jqueryUI:{
  		 deps: ["jquery"],
  		 exports:"$"
  	},
  	APISound:{
  		exports:"SC"
  	},
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
  
});


require(["app"], function(App){ 
  var application =  App.init();
});


// "jquery","jqueryUI","json2","underscore","backbone","APISound",
// $, $UI, JSON2, _, Backbone, SC,