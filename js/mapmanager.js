// JavaScript Document
var bs,bl; 

var MapManager={
	//En este objeto almacenaremos el mapa de Google.
	flagStationLayer:false,
	flagLanesLayer:false,
	mapObject:null,
	//Esta función inicializa y pinta el mapa Google, para ello recibe el identificador del contenedor donde pintar el mapa
	init:function(mapId){
		var infoWindow=new google.maps.InfoWindow();
	 var height = $(window).height();
                var width = $(window).width();

                $("#"+mapId).height(height-50);
                $("#"+mapId).width(width);
		var mapOptions = {
			    zoom: 14,
			    center: new google.maps.LatLng(40.9741682, -5.6504373)
			  };
		new google.maps.Map(document.getElementById(mapId),
			      mapOptions);
		
	},
	//Esta función mostrará la capa con los intercambiadores
	showBikeStationLayer:function(){
		
	},
	//Esta función ocultará la capa con los intercambiadores,
	hideBikeStationLayer:function(){
		
	},
	//Esta función mostrará la capa con los carriles bici
	showBikeLaneLayer:function(){
		LoadingDialog.show("Cargando contenido");
		DataManager.getBikeLanes(function(b){
			
			bs=b;
			MapManager.flagLanesLayer=true;
			LoadingDialog.hide();
		})
		
	},
	//Esta función ocultará la capa con los carriles bici,
	hideBikeLaneLayer:function(){
		MapManager.flagLanesLayer=false;
		
	},
	//Esta funcion muestra el cuadro de diálogo con la info del intercambiador seleccionado
	showBikeStationDialog:function(station){
		
	},
	//Esta funcion muestra el cuadro de diálogo con la info del intercambiador seleccionado
	showBikeLaneDialog:function(lane){
		
	}
	
	
}