var map = L.map('map-canvas', {
center:[36.172772, -115.157152],
zoom:12
});


function createMap(){
L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
        var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
    
    
    /*L.geoJson(hospitals, {
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);*/
    createEnableLocation(map);
    console.log(Law);

  
    function queryReport(event) {
	 	   
    	event.preventDefault(); // stop form from submitting normally
 	   
 	   var a = $("#QueryTab").serializeArray();
 	   a.push({ name: "tab_id", value: "1" });
 	   a = a.filter(function(item){return item.value != '';});
 	   console.log(a);
 	   $.ajax({
 	     url: 'HttpServlet',
 	     type: 'POST',
 	     data: a,
 	     success: function(reports) {
 	       alert(JSON.stringify(reports));
 	       
 	     	CreatePoints(reports);
 	     },
 	     error: function(xhr, status, error) {
 	       alert("Status: " + status + "\nError: " + error);
 	     }
 	   });
 	 }
 var reports=  $("#QueryTab").on("submit",queryReport);

 
 function filterReport(event){
	 event.preventDefault();
	 var b = $("#FilterTab").serializeArray();
	 b.push({name: "tab_id", value: "2"});
	 b.filter(function(item){return item.value != '';});
	 console.log(b);
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: b,
		 success: function(reports){
			 CreateFilterPoints(reports);
			 alert(JSON.stringify(reports));
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 
	 });
 }
 var reports2 = $("#FilterTab").on("submit", filterReport);
 


 getCensusReportCollege(map);

 var geojsonMarkerOptions4 = {
         radius: 8,
 	    	    fillColor: "red",
 	    	    color: "#000",
 	    	    weight: 1,
 	    	    opacity: 1,
 	    	    fillOpacity: 1
     };
     
 var geojsonMarkerOptions3 = {
         radius: 8,
 	    	    fillColor: "yellow",
 	    	    color: "#000",
 	    	    weight: 1,
 	    	    opacity: 1,
 	    	    fillOpacity: 1
     };
     
     function onEachFeature(feature, layer){
    	 console.log(feature.properties.Name);
         var popupContent = "";
         popupContent += "<p><b> Police Station: " + feature.properties.Name + "</b></p>";
         layer.bindPopup(popupContent);
         layer.on({
             mouseover: function(){
                 this.openPopup();
                 
             },
             mouseout: function(){
                 this.closePopup();
             }
         });
     }
     var Law_points = L.geoJson(Law, {
     pointToLayer: function(feature, latlng){
         return L.circleMarker(latlng, geojsonMarkerOptions4);
     }, 
     onEachFeature: onEachFeature
     
     
 }).addTo(map);
     
     function onEachHospital(feature, layer){
         var popupContent = "";
         popupContent += "<p><b> Hospital: " + feature.properties.Name + " </b><b>Number of Beds: " + feature.properties.NumBeds+"</b></p>";
         layer.bindPopup(popupContent);
         layer.on({
             mouseover: function(){
                 this.openPopup();
             },
             mouseout: function(){
                 this.closePopup();
             }
         });
     }
     var hospital_var = L.geoJSON(hosp, {
         pointToLayer: function(feature, latlng){
             return L.circleMarker(latlng, geojsonMarkerOptions3);
         },
         onEachFeature: onEachHospital
     }).addTo(map);
 
 
 
 
 
     createLegend(map);
}

function createLegend(map){
    //creates our legend in the bottom left of the map
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },
        
        //our function which adds the a container class and adding dates
        onAdd: function (map){
            var container = L.DomUtil.create('div', 'legend-control-container');
            
            $(container).append('<div id="date-legend">');
            
            var svg = '<svg id="attribute-legend" width="180px" height="180px">';
            
            var svg2 = '<svg id="attribute-legend2" width="180px" height="180px">';
            var circles = ["min", "max"];
            var circles2 = ["max"];
            
           
            
           for(x in circles){
               if(circles[x] == 'min'){
                svg2 += '<circle class="legend-circle2" id="' + circles[x] + '" fill="Red" fill-opacity="0.8" stroke="#000000" cx="30"/>';
                svg2 +=  '<text id=">' + x + '-text" x ="65" y="27">Hospitals</text>';
            } else if(circles[x] == 'max'){
                svg2 += '<circle class="legend-circle2" id="' + circles[x] + '" fill="Yellow" fill-opacity="0.8" stroke="#000000" cx="30"/>';
                svg2 +=  '<text id=">' + x + '-text" x ="65" y="58">Police Stations</text>';
            }
           };
                
                svg2 += "</svg>";
           
            
          console.log(container);
            
            
            $(container).append(svg2);
            return container
             
        }
       
    });
    
    map.addControl(new LegendControl());
    updateLegend(map);
}

function getCircleValues(map, attribute){
    //our values for our circles in the legend
    var Hospitals = 5,
    Police = 10;

    
  //  var mean = (max + min) / 2;
  
    return {
        min: Hospitals,
        max: Police
    };
};


function updateLegend(map, attr){
    
    var content = "Static Layers for Crime Map";
    $('#date-legend').html(content);
    //console.log(attribute);
    var circleValues = getCircleValues();
    
    for(var key in circleValues){
        console.log(key);
        if(key == 'min'){
        var radius = calcPropRadius();
        $('#'+key).attr({
            cy: 60 - radius,
            r: radius
        
                        
        });
            $('#' + key + '-text').text('Hospitals');
        } else if(key == 'max'){
            
            var radius = calcPropRadius();
            $('#' + key).attr({
                cy: 30 - radius,
                r: radius
            });
            $('#' + key + '-text').text('Police Stations');
        }
        
    };
    
};
function calcPropRadius(){
    var scaleFactor = 100;
    var area = 1 * scaleFactor;
    var radius = Math.sqrt(area/Math.PI);
    
    return radius;
};



















function getCensusReportCollege(map){
	$("#CensusTab").append('<div><button id="college">percentage with college degree</button></div>');
	$("#CensusTab").append('<div><button id="1519">percentage 15 to 19 years</button></div>');
	$("#CensusTab").append('<div><button id="2024">percentage 20 to 24 years</button></div>');
	$("#CensusTab").append('<div><button id="2534">percentage 25 to 34 years</button></div>'); 
	$("#CensusTab").append('<div><button id="65plus">percentage over 65 years</button></div>');
	$("#CensusTab").append('<div><button id="highschool">percentage high school graduate</button></div>');
	$("#CensusTab").append('<div><button id="income">income per house hold</button></div>');
	$("#CensusTab").append('<div><button id="quitCollege">remove demographic statistisc</button></div>');
	
	$("#college").on("click", function(){
		document.getElementById("highschool").disabled = true;
		document.getElementById("1519").disabled = true;
		document.getElementById("2024").disabled = true;
		document.getElementById("2534").disabled = true;
		document.getElementById("65plus").disabled = true;
		
		getCollegeCensusReport(map);
		document.getElementById("college").disabled = true;
		document.getElementById("income").disabled = true;
		
	});
	$("#1519").on("click", function(){
		document.getElementById("2024").disabled = true;
		document.getElementById("2534").disabled = true;
		document.getElementById("65plus").disabled = true;
		document.getElementById("college").disabled = true;
		get1519CensusReport(map);
		document.getElementById("1519").disabled = true;
		document.getElementById("highschool").disabled = true;
		document.getElementById("income").disabled = true;
	})
	$("#2024").on("click", function(){
		document.getElementById("1519").disabled = true;
		get2024CensusReport(map);
		document.getElementById("2534").disabled = true;
		document.getElementById("65plus").disabled = true;
		document.getElementById("college").disabled = true;
		document.getElementById("2024").disabled = true;
		document.getElementById("highschool").disabled = true;
		document.getElementById("income").disabled = true;
		
	})
	$("#2534").on("click", function(){
		document.getElementById("2024").disabled = true;
		document.getElementById("1519").disabled = true;
		document.getElementById("65plus").disabled = true;
		document.getElementById("college").disabled = true;
		get2534CensusReport(map);
		document.getElementById("2534").disabled = true;
		document.getElementById("highschool").disabled = true;
		document.getElementById("income").disabled = true;
	})
	$("#65plus").on("click", function(){
		document.getElementById("2024").disabled = true;
		document.getElementById("1519").disabled = true;
		document.getElementById("65plus").disabled = true;
		document.getElementById("college").disabled = true;
		get65PlusCensusReport(map);
		document.getElementById("2534").disabled = true;
		document.getElementById("highschool").disabled = true;
		document.getElementById("income").disabled = true;
	})
	$("#highschool").on("click", function(){
		document.getElementById("2024").disabled = true;
		document.getElementById("1519").disabled = true;
		document.getElementById("65plus").disabled = true;
		document.getElementById("college").disabled = true;
		getHighSchoolCensusReport(map);
		document.getElementById("2534").disabled = true;
		document.getElementById("highschool").disabled = true;
		document.getElementById("income").disabled = true;
	})
	$("#income").on("click", function(){
		document.getElementById("2024").disabled = true;
		document.getElementById("1519").disabled = true;
		document.getElementById("65plus").disabled = true;
		document.getElementById("college").disabled = true;
		getIncomeCensusReport(map);
		document.getElementById("2534").disabled = true;
		document.getElementById("highschool").disabled = true;
		document.getElementById("income").disabled = true;
	})
	
	$("#quitCollege").on("click", function(){
		location.reload();

	})
	
	//getHospitals(map);
	//getLaw(map);
	}

function getHospitals(map){
	var x = [];
	x.push({name: "tab_id", value: "3"});
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: x,
		success: function(reports){
			//alert(JSON.stringify(reports));
			CreateHospitalPoints(reports, "hosp");
		},
		error: function(xhr, status, error){
			alert("Status: " + status + "\nError" + error);
		}
	});
}
function getLaw(map){
	var x = [];
	x.push({name: "tab_id", value: "5"});
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: x,
		success: function(reports){
			//alert(JSON.stringify(reports));
			CreateHospitalPoints(reports, "law");
		},
		error: function(xhr, status, error){
			alert("Status: " + status + "\nError" + error);
		}
	});
}

function getIncomeCensusReport(map){
	var d = [];
	 d.push({name: "tab_id", value: "4"});
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: d,
		 success: function(reports){
			 getIncomeCensus(reports);
			 
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 	});
}
function getIncomeCensus(reports){
	function getColor(d){
		   return d > 100000 ? "#0059b3" :
		    d < 40000 ? "#80bfff":
		    d < 50000 ? "#4da6ff": 
		    d < 60000 ? "#1a8cff":
		    d < 70000 ? "#0073e6":
		    d < 80000 ? "#0059b3" :
		    
		    "#00264d";
		    
		}
	
	 function style2(propertiesVar) {	
	        return {
					weight: 1,
					opacity: 0.7,
					color: 'black',
					dashArray: '1',
					fillOpacity: 0.6,
					fillColor: getColor(propertiesVar)
	                        
				};
			}
	 var objectVal = {};
		for (var key in reports){
			
			var coords = JSON.stringify(reports[key]["location"]).replace("MULTIPOLYGON", "").replace("(((", "").replace(")))", "").split(",");
			ListVal = []
		
			for(var key2 in coords){
			var vals = coords[key2].split(' ');
			
			
			var values = L.latLng(parseFloat(vals[1]), parseFloat(vals[0].replace('"', "")));
			
			ListVal.push(values);
			}
			//var name = JSON.stringify(censusResult[key]['name']);
			var collegeEdu = parseInt(JSON.stringify(reports[key]['medianincome']).replace('"','').replace('"',''));
			console.log(collegeEdu);
			objectVal[collegeEdu] = ListVal;
			
				
		}
		for(var key3 in objectVal){
			var poly = L.polygon(objectVal[key3]).toGeoJSON();
			poly['id'] = key3;
			var PolyID = parseFloat(poly['id']);
			//poly['malehead'] = 
			var college = L.geoJSON(poly, {
				style: (function(polyID){
					
					return style2(PolyID);
					
				})
				
			}).addTo(map);
		
	}
}


function getHighSchoolCensusReport(map){
	var d = [];
	 d.push({name: "tab_id", value: "4"});
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: d,
		 success: function(reports){
			 getHighSchoolCensus(reports);
			 
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 	});
}
function getHighSchoolCensus(reports){
	function getColor(d){
		   return d > 1000 ? "#a63603" :
		    d < 0.5 ? "#80bfff":
		    d < 0.6 ? "#4da6ff": 
		    d < 0.7 ? "#1a8cff":
		    d < 0.9 ? "#0073e6":
		    d < 1 ? "#0059b3" :
		    
		    "#004080";
		    
		}
	
	 function style2(propertiesVar) {	
	        return {
					weight: 1,
					opacity: 0.7,
					color: 'black',
					dashArray: '1',
					fillOpacity: 0.6,
					fillColor: getColor(propertiesVar)
	                        
				};
			}
	 var objectVal = {};
		for (var key in reports){
			
			var coords = JSON.stringify(reports[key]["location"]).replace("MULTIPOLYGON", "").replace("(((", "").replace(")))", "").split(",");
			ListVal = []
		
			for(var key2 in coords){
			var vals = coords[key2].split(' ');
			
			
			var values = L.latLng(parseFloat(vals[1]), parseFloat(vals[0].replace('"', "")));
			
			ListVal.push(values);
			}
			//var name = JSON.stringify(censusResult[key]['name']);
			var collegeEdu = parseFloat(JSON.stringify(reports[key]['highschoolgraduate']).replace('"','').replace('"',''));
			console.log(collegeEdu);
			objectVal[collegeEdu] = ListVal;
			
				
		}
		for(var key3 in objectVal){
			var poly = L.polygon(objectVal[key3]).toGeoJSON();
			poly['id'] = key3;
			var PolyID = parseFloat(poly['id']);
			//poly['malehead'] = 
			var college = L.geoJSON(poly, {
				style: (function(polyID){
					
					return style2(PolyID);
					
				})
				
			}).addTo(map);
		
	}
}




function get65PlusCensusReport(map){
	var d = [];
	 d.push({name: "tab_id", value: "4"});
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: d,
		 success: function(reports){
			 get65PlusCensus(reports);
			 
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 	});
}


function get65PlusCensus(reports){
	function getColor(d){
		   return d > 1000 ? "#a63603" :
		    d < 0.1 ? "#ffccff":
		    d < 0.3 ? "#ffb3ff": 
		    d < 0.6 ? "#ff99ff":
		    d < 0.8 ? "#ff80ff":
		    d < 1 ? "#ff66ff" :
		    
		    "#ff33ff";
		    
		}
	
	 function style2(propertiesVar) {	
	        return {
					weight: 1,
					opacity: 0.3,
					color: 'black',
					dashArray: '1',
					fillOpacity: 0.6,
					fillColor: getColor(propertiesVar)
	                        
				};
			}
	 var objectVal = {};
		for (var key in reports){
			
			var coords = JSON.stringify(reports[key]["location"]).replace("MULTIPOLYGON", "").replace("(((", "").replace(")))", "").split(",");
			ListVal = []
		
			for(var key2 in coords){
			var vals = coords[key2].split(' ');
			
			
			var values = L.latLng(parseFloat(vals[1]), parseFloat(vals[0].replace('"', "")));
			
			ListVal.push(values);
			}
			//var name = JSON.stringify(censusResult[key]['name']);
			var collegeEdu = parseFloat(JSON.stringify(reports[key]['over_65_years']).replace('"','').replace('"',''));
			console.log(collegeEdu);
			objectVal[collegeEdu] = ListVal;
			
				
		}
		for(var key3 in objectVal){
			var poly = L.polygon(objectVal[key3]).toGeoJSON();
			poly['id'] = key3;
			var PolyID = parseFloat(poly['id']);
			//poly['malehead'] = 
			var college = L.geoJSON(poly, {
				style: (function(polyID){
					
					return style2(PolyID);
					
				})
				
			}).addTo(map);
		
	}
}

function get2534CensusReport(map){
	var d = [];
	 d.push({name: "tab_id", value: "4"});
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: d,
		 success: function(reports){
			 get2534Census(reports);
			 
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 	});
}


function get2534Census(reports){
	function getColor(d){
		   return d > 1000 ? "#a63603" :
		    d < 0.1 ? "#ffccff":
		    d < 0.15 ? "#ffb3ff": 
		    d < 0.2 ? "#ff99ff":
		    d < 0.25 ? "#ff80ff":
		    d < 0.3 ? "#ff66ff" :
		    
		    "#ff33ff";
		    
		}
	
	 function style2(propertiesVar) {	
	        return {
					weight: 1,
					opacity: 0.3,
					color: 'black',
					dashArray: '1',
					fillOpacity: 0.6,
					fillColor: getColor(propertiesVar)
	                        
				};
			}
	 var objectVal = {};
		for (var key in reports){
			
			var coords = JSON.stringify(reports[key]["location"]).replace("MULTIPOLYGON", "").replace("(((", "").replace(")))", "").split(",");
			ListVal = []
		
			for(var key2 in coords){
			var vals = coords[key2].split(' ');
			
			
			var values = L.latLng(parseFloat(vals[1]), parseFloat(vals[0].replace('"', "")));
			
			ListVal.push(values);
			}
			//var name = JSON.stringify(censusResult[key]['name']);
			var collegeEdu = parseFloat(JSON.stringify(reports[key]['twentyfive_to_thirtyfour_years']).replace('"','').replace('"',''));
			console.log(collegeEdu);
			objectVal[collegeEdu] = ListVal;
			
				
		}
		for(var key3 in objectVal){
			var poly = L.polygon(objectVal[key3]).toGeoJSON();
			poly['id'] = key3;
			var PolyID = parseFloat(poly['id']);
			//poly['malehead'] = 
			var college = L.geoJSON(poly, {
				style: (function(polyID){
					
					return style2(PolyID);
					
				})
				
			}).addTo(map);
		
	}
}
function getCollegeCensusReport(map){
	//$('#Stats').append('<div><button type="submit">submit</button></div>');

	 var d = [];
	 d.push({name: "tab_id", value: "4"});
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: d,
		 success: function(reports){
			 getCollegeCensus(reports);
			 
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 	});
	}
function get2024CensusReport(map){
	 var d = [];
	 d.push({name: "tab_id", value: "4"});
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: d,
		 success: function(reports){
			 get2024Census(reports);
			 
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 	});
}



function get1519CensusReport(map){
	//$('#Stats').append('<div><button type="submit">submit</button></div>');

	 var d = [];
	 d.push({name: "tab_id", value: "4"});
	 $.ajax({
		 url: 'HttpServlet',
		 type: 'POST',
		 data: d,
		 success: function(reports){
			 get1519Census(reports);
			 
		 },
		 error: function(xhr, status, error){
			 alert("Status: " + status + "\nError: " + error);
		 }
	 	});
	}

function get2024Census(reports){
	function getColor(d){
		   return d > 1000 ? "#a63603" :
		    d < 0.01 ? "#ffccff":
		    d < 0.03 ? "#ffb3ff": 
		    d < 0.05 ? "#ff99ff":
		    d < 0.08 ? "#ff80ff":
		    d < 0.1 ? "#ff66ff" :
		    
		    "#ff33ff";
		    
		}
	
	 function style2(propertiesVar) {	
	        return {
					weight: 1,
					opacity: 0.3,
					color: 'black',
					dashArray: '1',
					fillOpacity: 0.6,
					fillColor: getColor(propertiesVar)
	                        
				};
			}
	 var objectVal = {};
		for (var key in reports){
			
			var coords = JSON.stringify(reports[key]["location"]).replace("MULTIPOLYGON", "").replace("(((", "").replace(")))", "").split(",");
			ListVal = []
		
			for(var key2 in coords){
			var vals = coords[key2].split(' ');
			
			
			var values = L.latLng(parseFloat(vals[1]), parseFloat(vals[0].replace('"', "")));
			
			ListVal.push(values);
			}
			//var name = JSON.stringify(censusResult[key]['name']);
			var collegeEdu = parseFloat(JSON.stringify(reports[key]['twenty_to_twentyfour_years']).replace('"','').replace('"',''));
			console.log(collegeEdu);
			objectVal[collegeEdu] = ListVal;
			
				
		}
		for(var key3 in objectVal){
			var poly = L.polygon(objectVal[key3]).toGeoJSON();
			poly['id'] = key3;
			var PolyID = parseFloat(poly['id']);
			//poly['malehead'] = 
			var college = L.geoJSON(poly, {
				style: (function(polyID){
					
					return style2(PolyID);
					
				})
				
			}).addTo(map);
		
	}
}
function get1519Census(reports){
	
	function getColor(d){
		   return d > 1000 ? "#a63603" :
		    d < 0.01 ? "#ffccff":
		    d < 0.03 ? "#ffb3ff": 
		    d < 0.05 ? "#ff99ff":
		    d < 0.08 ? "#ff80ff":
		    d < 0.1 ? "#ff66ff" :
		    
		    "#ff33ff";
		    
		}
	
	 function style2(propertiesVar) {	
	        return {
					weight: 1,
					opacity: 0.3,
					color: 'black',
					dashArray: '1',
					fillOpacity: 0.6,
					fillColor: getColor(propertiesVar)
	                        
				};
			}
	
	
	
	var objectVal = {};
	for (var key in reports){
		
		var coords = JSON.stringify(reports[key]["location"]).replace("MULTIPOLYGON", "").replace("(((", "").replace(")))", "").split(",");
		ListVal = []
	
		for(var key2 in coords){
		var vals = coords[key2].split(' ');
		
		
		var values = L.latLng(parseFloat(vals[1]), parseFloat(vals[0].replace('"', "")));
		
		ListVal.push(values);
		}
		//var name = JSON.stringify(censusResult[key]['name']);
		var collegeEdu = parseFloat(JSON.stringify(reports[key]['fifteen_to_nineteen_years']).replace('"','').replace('"',''));
		console.log(collegeEdu);
		objectVal[collegeEdu] = ListVal;
		
			
	}
	for(var key3 in objectVal){
		var poly = L.polygon(objectVal[key3]).toGeoJSON();
		poly['id'] = key3;
		var PolyID = parseFloat(poly['id']);
		//poly['malehead'] = 
		var college = L.geoJSON(poly, {
			style: (function(polyID){
				
				return style2(PolyID);
				
			})
			
		}).addTo(map);
	
}
}
function getCollegeCensus(censusResult){
	
	function getColor(d){
		   return d > 1000 ? "#a63603" :
		    d < 0.05 ? "#d94801":
		    d < 0.1 ? "#f16913": 
		    d < 0.2 ? "#fd8d3c":
		    d < 0.3 ? "#fdae6b":
		    d < 0.4 ? "#fdd0a2" :
		    d < 0.5 ? "#fee6ce":
		    d < 0.8 ? "#fff5eb":
		    "#7f2704";
		    
		}
	
	 function style2(propertiesVar) {	
	        return {
					weight: 1,
					opacity: 0.3,
					color: 'black',
					dashArray: '1',
					fillOpacity: 0.6,
					fillColor: getColor(propertiesVar)
	                        
				};
			}

	
	
	var objectVal = {};
	for (var key in censusResult){
		
		var coords = JSON.stringify(censusResult[key]["location"]).replace("MULTIPOLYGON", "").replace("(((", "").replace(")))", "").split(",");
		ListVal = []
	
		for(var key2 in coords){
		var vals = coords[key2].split(' ');
		
		
		var values = L.latLng(parseFloat(vals[1]), parseFloat(vals[0].replace('"', "")));
		
		ListVal.push(values);
		}
		//var name = JSON.stringify(censusResult[key]['name']);
		var collegeEdu = parseFloat(JSON.stringify(censusResult[key]['collegegraduate']).replace('"','').replace('"',''));
		console.log(collegeEdu);
		objectVal[collegeEdu] = ListVal;
		
			
	}


	for(var key3 in objectVal){
		var poly = L.polygon(objectVal[key3]).toGeoJSON();
		poly['id'] = key3;
		var PolyID = parseFloat(poly['id']);
		//poly['malehead'] = 
		var college = L.geoJSON(poly, {
			style: (function(polyID){
				
				return style2(PolyID);
				
			})
			
		}).addTo(map);
		
		
		
		
	}
	};

function CreateHospitalPoints(report, type){
	if(type == 'hosp'){
	for (var key in report){
		var wordOne = JSON.stringify(report[key].Location).replace("POINT", "").replace('\"(', "").replace(')\"').split(' ');
		var x = parseFloat(wordOne[0]);
		var y = parseFloat(wordOne[1]);
		var geojsonMarkerOptions = {
	    	    radius: 8,
	    	    fillColor: "red",
	    	    color: "#000",
	    	    weight: 1,
	    	    opacity: 1,
	    	    fillOpacity: 0.8
	    	};
		var Point = L.latLng(Math.abs(y), x);
		var filerMarkers = L.circleMarker(Point, geojsonMarkerOptions).addTo(map);
		
	}
}else if(type == 'law'){
	for (var key in report){
		var wordOne = JSON.stringify(report[key].Location).replace("POINT", "").replace('\"(', "").replace(')\"').split(' ');
		var x = parseFloat(wordOne[0]);
		var y = parseFloat(wordOne[1]);
		var geojsonMarkerOptions = {
	    	    radius: 8,
	    	    fillColor: "yellow",
	    	    color: "#000",
	    	    weight: 1,
	    	    opacity: 1,
	    	    fillOpacity: 0.8
	    	};
		var Point = L.latLng(Math.abs(y), x);
		var filerMarkers = L.circleMarker(Point, geojsonMarkerOptions).addTo(map);
}
}
}

function CreateFilterPoints(report){
	for (var key in report){
		var wordOne = JSON.stringify(report[key].Location).replace("POINT", "").replace('\"(', "").replace(')\"').split(' ');
		var x = parseFloat(wordOne[0]);
		var y = parseFloat(wordOne[1]);
		var geojsonMarkerOptions = {
	    	    radius: 8,
	    	    fillColor: "purple",
	    	    color: "#000",
	    	    weight: 1,
	    	    opacity: 1,
	    	    fillOpacity: 0.8
	    	};
		var Point = L.latLng(Math.abs(y), x);
		var filerMarkers = L.circleMarker(Point, geojsonMarkerOptions).addTo(map);
		
	}
}
function CreatePoints(report){

	console.log(JSON.stringify(report));
	console.log("hi");
	for (var key in report){
	var wordOne = JSON.stringify(report[key].Location).replace("POINT", "").replace('\"(', "").replace(')\"', "").split(' ');
	//var FinalWord = wordOne.replace("(", '').replace(")", '').split(' ');
	var x = parseFloat(wordOne[0]);
	var y = parseFloat(wordOne[1]);
	console.log(x);
	console.log(Math.abs(y));
	
	
    var geojsonMarkerOptions = {
    	    radius: 8,
    	    fillColor: "#ff7800",
    	    color: "#000",
    	    weight: 1,
    	    opacity: 1,
    	    fillOpacity: 0.8
    	};
	
	var Point = L.latLng(Math.abs(y),x);
	console.log(map);
	//L.geoJson( L.circleMarker(Point).addTo(map)
    var  markers = L.circleMarker(Point, geojsonMarkerOptions).addTo(map);
     
  
    	
     
	}
}
	
	
	
	





 function createEnableLocation(map){
    $('#Location').append('<div><button id="EnableLoc">Enable Location</button></div>');

      var btn = $("#EnableLoc");
     
     $("#EnableLoc").on('click', function(){
        
        map.on('locationfound', function(event){
            var radius = event.accuracy /2;
          L.marker(event.latlng).addTo(map).bindPopup("You are here").openPopup();
            L.circle(event.latlng, event.accuracy).addTo(map);
        });
         map.locate({setView: true, maxZoom: 16});
   });
 }





window.onload = createMap();