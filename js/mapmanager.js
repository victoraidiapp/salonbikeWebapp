// JavaScript Document


var MapManager={
	//En este objeto almacenaremos el mapa de Google.
	flagStationLayer:false,
	flagLanesLayer:false,
	mapObject:null,
	BikeLanes:null,
	BikeLanesPolyLine:new Array(),//Este array contiene una colección de google.maps.Polyline que luego se pintan en el mapa con el método setMap
	BikeStations:null,
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
		if(this.BikeLanesPolyLine.length>0){//Si ya tenemos las lineas guardadas, simplemente las pintamos
		for(l in this.BikeLanesPolyLine){
		this.BikeLanesPolyLine[l].setMap(this.mapObject);//Pintamos las lineas en el mapa	
		}
		LoadingDialog.hide();
			return;
		}
		
		if(this.BikeLanes!=null){//Ya tenemos los datos convertidos en el objeto jQuery pero no los hemos pintado
		//Aquí hay que pintar las lineas recorriendo los nodos del jQuery parseado desde el XML
			
			this.BikeLanes.find("LanesZone").each(function(){
				// Compruebo que accedo al los hijos del nodo
				console.log("El título de esta zona es "+$(this).children("name").text());
				console.log("Distancia "+$(this).children("length").text());
				console.log("Descripccion "+$(this).children("description").text());
				var color = $(this).children("color").text();
				console.log("Color: "+color);
				
				$(this).find("Folder").each(function(){
					$(this).find("Placemark").each(function(){
						// Compruebo que accedo a los hijos del nodo
						console.log("Nombre"+$(this).children("name").text())
						var tipoLinea = $(this).children("styleUrl").text();
						console.log("Tipo de Línea: " + tipoLinea);
						
						$(this).find("LineString").each(function(){
							var coordinates = $(this).children("coordinates").text();
							var separador = coordinates.split(",0.0");
							console.log("Coordenadas: "+separador);
							var grosorLinea = $(this).children("tessellate").text();
							console.log("Grosor de linea: " + grosorLinea);
							var flagCoordinates = [new google.maps.LatLng(separador)];
							this.BikeLanesPolyLine = ({
								path: flagCoordinates,
								stokeColor: color,
								strokeOpacity: 1.0,
								strokeWeigth: grosorLinea
							})
							this.BikeLanesPolyLine.setMap(this.mapObject);
						})
					})
				})

			})	
			//this.showBikeLaneLayer();
			return;
		}
		console.log("Vamos a obtener los carriles");
		
		DataManager.getBikeLanes(function(b){
			MapManager.BikeLanes=b;
			//console.log("Ya estamos de vuelta");
			MapManager.showBikeLaneLayer();
			
		});
		//
		return;
		
	},
	//Esta función ocultará la capa con los carriles bici,
	hideBikeLaneLayer:function(){
		MapManager.flagLanesLayer=false;
		
	},
	//Esta funcion muestra el cuadro de diálogo con la info del intercambiador seleccionado
	showBikeStationDialog:function(station){
		$.UIPopup({
			id:'bsDialog',
			title:'Nombre de la Station',
			message:'<div class="dialogLine"><span class="icon_algo"></span></div>',
			cancelButton:'Volver',
			continueButton:'Ruta'
		})
	},
	//Esta funcion muestra el cuadro de diálogo con la info del intercambiador seleccionado
	showBikeLaneDialog:function(lane){
		
	},
	showBikeLanesList:function(){
		
	}
	
	
}