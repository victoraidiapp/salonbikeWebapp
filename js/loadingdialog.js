// JavaScript Document
var LoadingDialog={
init:function(){
	console.log("Inicializamos el LoadingDialog");
	jQuery('article section').prepend('<div class="loading"></div>');
	this.hide();	
	this.manejadores();
},
manejadores:function(){
	
},
show:function(texto){
	$('article.current .loading').text(texto).show();
	$('article.current .loading').nextAll().addClass('whenloading');
},
hide:function(){
	$('article.current .loading').hide();	
	$('.whenloading').removeClass('whenloading');
}
	
}