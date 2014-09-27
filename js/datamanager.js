// JavaScript Document
var DataManager={
	getBikeLanes:function(callBack){
		$.ajax({
    type: "GET",
    url: "assets/BikeLanesZones.xml",
    dataType: "xml",
    success: function(xml){
		callBack($(xml));
		
	}
  });
		
		
	},
	getBikeStations:function(callBack){
		$.ajax({
			type:"GET",
			url:"https://clientes.domoblue.es/onroll_data/infoMarquesinas.php?key=bdedb8602218ecd22136f9546942b00e",
			dataType:"xml",
			success:function(xml){
				callBack($(xml).find("ciudad"));
	}
	
	})
	}
	
};