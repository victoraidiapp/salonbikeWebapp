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
var app = {
    // Application Constructor
    initialize: function() {
        this.manejadores();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    manejadores: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
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

jQuery(document).on("tap", function(){
	$( ".estacion" ).click( function () {
		alert("Este es el tabbar-nav de la visualización de las estaciones bici.");
		console.log("Pulsado estacion.");
	}); 
	$( ".ruta" ).click( function () {
		alert("Este es el tabbar-nav para trazar la ruta desde la posición actual hasta el carril bici más cercano.");
		console.log("Pulsado ruta.");
	});
	$( ".carril" ).click( function () {
		alert("Este es el tabbar-nav de la visualización de los carriles bici.");
		console.log("Pulsado carril.");
	});
	$( ".rutabici" ).click( function () {
		alert("Este es el tabbar-nav para trazar la ruta desde la posición actual hasta la estación bici más cercana.");
		console.log("Pulsado Ruta en bici.");
	});
	$( ".listado" ).click( function () {
		alert("Este es el tabbar-nav que muestra el listado de los carriles bici.");
		console.log("Pulsado Listado.");
	});
});
