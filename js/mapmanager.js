// JavaScript Document


var MapManager={
	//En este objeto almacenaremos el mapa de Google.
	flagStationLayer:false,
	flagLanesLayer:false,
	mapObject:null,
	BikeLanes:null,
	BikeLanesPolyLine:new Array(),//Este array contiene una colección de google.maps.Polyline que luego se pintan en el mapa con el método setMap
	
	BikeStations:null,
	BikeStationsMarker:new Array(),
	//Esta función inicializa y pinta el mapa Google, para ello recibe el identificador del contenedor donde pintar el mapa
	init:function(mapId){
		var infoWindow=new google.maps.InfoWindow();
	 var height = $(window).height();
                var width = $(window).width();

                $("#"+mapId).height(height-50);
                $("#"+mapId).width(width);
		var mapOptions = {
			    zoom: 13,
			    center: new google.maps.LatLng(40.9705347,-5.6637995),
				maxZoom:15,
				minZoom:12,
				//overviewMapControl:false,
				streetViewControl:false,
				//draggable:false,
				mapTypeControl:false
			  };
		MapManager.mapObject=new google.maps.Map(document.getElementById(mapId),
			      mapOptions);
				  
		
	},
	//Esta función mostrará la capa con los intercambiadores
	showBikeStationLayer:function(){
		LoadingDialog.show("Cargando contenido");
		if(MapManager.BikeStationsMarker.length>0){
			for(m in MapManager.BikeStationsMarker){
				MapManager.BikeStationsMarker[m].setMap(MapManager.mapObject);	
			}
		MapManager.flagStationLayer=true;
		LoadingDialog.hide();
		return;	
		}
		
		if(MapManager.BikeStations!=null){
			
		MapManager.BikeStations.find("parada").each(function(){
			console.log("Procesamos la parada "+$(this).attr("nombre"));
			var marker = new google.maps.Marker({
    position: new google.maps.LatLng($(this).attr("lat"),$(this).attr("lng")),
	title:$(this).attr("codigo"),
	icon:'icons/show_bike_stations.png'
  });
  google.maps.event.addListener(marker, 'click', function() {
    MapManager.showBikeStationDialog(marker.getTitle());
  });
  MapManager.BikeStationsMarker.push(marker);
		})
		MapManager.showBikeStationLayer();
		return;
		}
		
		DataManager.getBikeStations(function(bs){
			MapManager.BikeStations=bs;
			MapManager.showBikeStationLayer();
		})
			
		
	},
	//Esta función ocultará la capa con los intercambiadores,
	hideBikeStationLayer:function(){
		for(m in MapManager.BikeStationsMarker){
				MapManager.BikeStationsMarker[m].setMap(null);	
			}
		MapManager.flagStationLayer=false;
	},
	//Esta función mostrará la capa con los carriles bici
	showBikeLaneLayer:function(){
		
		
		LoadingDialog.show("Cargando contenido");
		console.log("El tmaaño de las lineas es "+MapManager.BikeLanesPolyLine.length);
		if(MapManager.BikeLanesPolyLine.length>0){//Si ya tenemos las lineas guardadas, simplemente las pintamos
		
		for(l in this.BikeLanesPolyLine){
		this.BikeLanesPolyLine[l].setMap(this.mapObject);//Pintamos las lineas en el mapa	
		}
		MapManager.flagLanesLayer=true;
		LoadingDialog.hide();
			return;
		}
		
		if(MapManager.BikeLanes!=null){//Ya tenemos los datos convertidos en el objeto jQuery pero no los hemos pintado
		//Aquí hay que pintar las lineas recorriendo los nodos del jQuery parseado desde el XML
			console.log("Intentamos obtener");
			MapManager.BikeLanes.find("LanesZone").each(function(){
				console.log("El título de esta zona es "+$(this).children("name").text());
				//console.log("Distancia "+$(this).children("length").text());
				//console.log("Descripccion "+$(this).children("description").text());
				var color = $(this).children("color").text();
				//console.log("Color: "+color);
				$(this).find("Folder").each(function(){
					$(this).find("Placemark").each(function(){
						//console.log("Nombre"+$(this).children("name").text())
						var tipoLinea = $(this).children("styleUrl").text();
						//console.log("Tipo de Línea: " + tipoLinea);
						$(this).find("LineString").each(function(){
							var coordinates = $(this).children("coordinates").text();
							var pareja = coordinates.split(",0.0");
							
							
							
							var flagCoordinates =new Array();
							for( c in pareja){
								var ll=pareja[c].split(",");
								//console.log("Vamos a añadir las coordenadas "+ll[0]+","+ll[1]);
								if(typeof(ll[1])=="undefined"){
									//console.log("Esta no la añadimos "+separador[c]);
								continue;	
								}
								flagCoordinates.push(new google.maps.LatLng(parseFloat(ll[1]), parseFloat(ll[0])))
							}
							var polyline = new google.maps.Polyline ({
								path: flagCoordinates,
								strokeColor: color,
								strokeOpacity: 1.0,
								strokeWeight: 5
							})
							MapManager.BikeLanesPolyLine.push(polyline);
							//polyline.setMap(MapManager.mapObject);
							
						})
						
					})
					
				})
			})		
			MapManager.showBikeLaneLayer();
			return;
		}
		console.log("Vamos a obtener los carriles");
		
		DataManager.getBikeLanes(function(b){
			MapManager.BikeLanes=b;
			console.log("Ya estamos de vuelta");
			MapManager.showBikeLaneLayer();
			
		});
		//
		return;
		
	},
	//Esta función ocultará la capa con los carriles bici,
	hideBikeLaneLayer:function(){
		for(l in this.BikeLanesPolyLine){
		this.BikeLanesPolyLine[l].setMap(null);//Pintamos las lineas en el mapa	
		}
		MapManager.flagLanesLayer=false;
		
	},
	//Esta funcion muestra el cuadro de diálogo con la info del intercambiador seleccionado
	showBikeStationDialog:function(station){
		
		
		
		var $station=MapManager.BikeStations.find('parada[codigo="'+station+'"]');
		MapManager.getDistanceToStation($station.attr("lat"),$station.attr("lng"));
		$.UIPopup({
			id:'bsDialog',
			title:$station.attr("nombre"),
			message:'<div class="dialogLine"><span class="icon icon_candados"></span>Candados disponibles: <strong>'+$station.attr("candadosLibres")+'</strong></div>'+
			'<div class="dialogLine"><span class="icon icon_bicis"></span>Bicis disponibles: <strong>'+$station.attr("bicicletas")+'</strong></div>'+
			'<div class="dialogLine"><span class="icon icon_length"></span>Distancia a estación: <strong id="distanceToStation" class="calculating"></strong></div>',
			cancelButton:'Volver',
			continueButton:'Ruta'
		})
	},
	//Esta funcion muestra el cuadro de diálogo con la info del intercambiador seleccionado
	showBikeLaneDialog:function(lane){
		
	},
	showBikeLanesList:function(){
		
	},
	getDistanceToStation:function(stLat,stLng){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log("Hemos obtenido la posición");
			DataManager.getDistance(stLat,stLng,position.coords.latitude ,position.coords.longitude,function(d){
				$("#distanceToStation").text(d).removeClass("calculating");
			});
		})
	},
	
	//Esta función mostrará el listado de los carriles bici
	showLaneList:function() {
		//Condición 1: Si el role-content del article listaZonas ya tiene algo, muestralo
		if($("#listaZonas .role-content ul").length>0){
			$.UIGoToArticle("#listaZonas");
			return;
		}

		//Condicion 2: Si mapmanager.bikelane !=null recorrer el DOM y coger los títulos y añadirlos a un ul en el role-content del article del listado de mapas
		
		if(MapManager.BikeLanes!=null){
			$("#listaZonas .role-content").append("<ul><span><strong>ZONAS BICI</strong><br><br></span></ul>");		
			console.log("Obtenemos las zonas");
			MapManager.BikeLanes.find("LanesZone").each(function(){
				var $zones = $(this).children("name").text();
				var $color = $(this).children("color").text();
				console.log("El título de esta zona es "+$zones);
				console.log("Color: "+$color);
				$("#listaZonas .role-content ul").append(''+$zones+'');			
				$("#listaZonas .role-content li").css("font-size","18px");			
			})
			// Supongo que esto hay que quitarlo por el toggle en el index.js
			$("#mapa").css("visibility","hidden");
		}
		
		DataManager.getBikeLanes(function(b){
			MapManager.BikeLanes=b;
			console.log("Ya estamos de vuelta");
			MapManager.showLaneList();			
		});
		return;
		
		//Al final si no se ha cumplido ninguna de las dos condiciones habrá que hacer una llamada a DataManager.getBikeLanes
		
	}
	
	
}