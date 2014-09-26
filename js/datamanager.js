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
		
	}
	
};