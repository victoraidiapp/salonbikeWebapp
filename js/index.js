/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var $loc;
var app = {
    // Application Constructor
    initialize: function() {
        this.manejadores();
		
		LoadingDialog.init();
		$.UIGoToArticle("#mapa");
		
		setTimeout(MapManager.init("gmapa"),3000);
		
		$("nav.zonas h1").text(Lang[$lang]["CARRILES BICI"]);


		
		
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    manejadores: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		jQuery(document).off("tap",".toolbar .button");
		jQuery(".toolbar").off("singletap",".button");
		$('body').find('.toolbar').off('singletap', '.button');
		$('body').find('.toolbar').off('tap', '.button');
		
		
		
		//Manejamos el singletap en el home button para que muestre el diálogo con los créditos
		$(document).on("tap","#btnCreditos",function(event){
			console.log("El idioma es "+$lang);
			$.UIPopup({
			id:'creditsDialog',
			title:'<div class="dialogZone" style="background-color:#38a0f9;">Créditos</div>',
			message:'<div class="creditDialog">Desarrollado por: <br> <img src="img/logoaidiapp.png"/></div>'+
			'<div class="creditDialog">Desarrolladores:<br></div>'+
			'<p class="creditDialogP" style="text-align:left; margin-top:10px;">Víctor Pérez Tapia <br> Álvaro Benéitez Martín</p>'+
			'<div class="creditDialog">Agradecimientos:<br></div>'+'<p class="creditDialogP" style="text-align:left; margin-top:10px;"> A la empresa DomoBlue por '+  
			'proporcionarnos acceso a la API del servicio OnRoll y así poder mostrar información en tiempo real de los intercambiadores de biciletas.</p>',
			cancelButton:'Volver',
			continueButton:null
			
		})
		})
		$(document).on("tap","#btnNearestStation",function(e){
			MapManager.showNearestStation();
		})
		
		$(document).on("tap","#btnNearestLane",function(e){
			MapManager.showNearestLane();
		})
		$(document).on("tap","#btnZoneList",function(e){
			MapManager.showLaneList();;
		})
		
		$(document).on("tap","li.listZoneDialog",function(event){
			//console.log("Queremos mostrar el lane del color "+$(this).find("h3").css("borderColor"));
			console.log("Queremos mostrar el lane del color "+rgb2hex($(this).find("h3").css("border-left-color")));
			$.UIGoToArticle("#mapa");
			
			
			//Como jquery nos devuelve el color en formato rgb lo tenemos que convertir a hexadecimal (Que es el valor que espera la función showBikeLaneDialog
			//La función rgb2hex está definida en el archivo util.js
			MapManager.flagShowLaneInfo=rgb2hex($(this).find("h3").css("border-left-color"));
			//MapManager.showBikeLaneDialog(rgb2hex($(this).find("h3").css("border-left-color")));
		})
		
		$('#mapa').on('navigationend', function(e) {
			if(MapManager.flagShowLaneInfo!=null){
				MapManager.showBikeLaneDialog(MapManager.flagShowLaneInfo);
				MapManager.flagShowLaneInfo=null;
			}
		})
		$(document).on("tap",".toolbar",function(e){
			$(this).removeClass("opened");
			$("#gmapa").removeClass("opened");
		})
		$(".toolbar").on("singletap",".button",function(event){
			event.preventDefault();
			return false;
		})
		$(".toolbar").on("tap",".button",function(event){
			event.preventDefault();
			
			if($(this).attr("id")=="bikestationsbtn"){
				$(this).toggleClass("selected");
				console.log("Has picado en el botón de bikestation");
				if($(this).hasClass("selected")){
					console.log("Queremos mostrar la capa de  stations");
					MapManager.showBikeStationLayer();
				}else{
					MapManager.hideBikeStationLayer();
				}
				//alert("Me tocas");
				return false;
			}else if($(this).attr("id")=="bikelanebtn"){
				$(this).toggleClass("selected");
				if($(this).hasClass("selected")){
					console.log("Queremos mostrar la capa de  stations");
					MapManager.showBikeLaneLayer();
				}else{
					MapManager.hideBikeLaneLayer();
				}
				return false;
			}else if($(this).hasClass("menu")){
				console.log("Has picado en el menu");
				$(this).toggleClass("selected");
				$(".toolbar").toggleClass("opened");
				$("#gmapa").toggleClass("opened");
				return false;
			}
			
		})
		
		jQuery(document).on("singletap",".tabbar .button", function(event){
			//event.stopPropagation();
	if($(this).hasClass("estacion")){
		$(this).toggleClass("selected");
		if(MapManager.flagLanesList){
		MapManager.hideLaneList();	
		$(".tabbar .listado").removeClass("selected");
		}
		
			if(MapManager.flagStationLayer){
				MapManager.hideBikeStationLayer();
				
			}else{
		MapManager.showBikeStationLayer();
			}
		return false;
	}else if($(this).hasClass("ruta")){
		console.log("Pulsado ruta.");
		MapManager.showNearestStation();
		return false;
	}else if($(this).hasClass("carril")){
		console.log("Pulsado carril.");
		//alert("Paramos un momento");
		$(this).toggleClass("selected");
		if(MapManager.flagLanesList){
		MapManager.hideLaneList();	
		$(".tabbar .listado").removeClass("selected");
		}
			if(MapManager.flagLanesLayer){
				MapManager.hideBikeLaneLayer()
			}else{
		MapManager.showBikeLaneLayer();
			}
		return false;
	}else if($(this).hasClass("rutabici")){
		MapManager.showNearestLane();
		console.log("Pulsado Ruta en bici.");
		return false;
	}else if($(this).hasClass("listado")){
		$(this).toggleClass("selected");
		if(MapManager.flagLanesList){
		MapManager.hideLaneList();	
		}else{
		MapManager.showLaneList();
		}
		console.log("Pulsado Listado.");
		return false;
	}

});
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};


