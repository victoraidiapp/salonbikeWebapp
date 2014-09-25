// JavaScript Document
var bs,bl; 

var MapManager={
	//En este objeto almacenaremos el mapa de Google.
	flagStationLayer:false,
	flagLanesLayer:false,
	mapObject:null,
	//Esta función inicializa y pinta el mapa Google, para ello recibe el identificador del contenedor donde pintar el mapa
	init:function(mapId){
		
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