// JavaScript Document



function loadLamb(){
	getData();
//Places API request - Beacon Location
	function getData(){
		var requestURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJP78CcpJvcVMRy9vI_El-hxY&fields=name,geometry,address_component&key=AIzaSyDGvqMTt1orMIidhIJKLK7NwySTZSbR0yA",
			request = new XMLHttpRequest();
			request.open('GET', requestURL);
			request.responseType = 'json';
			request.send();	
		
			request.onload = function(){
				var placeData = request.response;
				console.log(placeData);
				//store lat and lng coordinates
					  lat = placeData.result.geometry.location.lat,
					  lng = placeData.result.geometry.location.lng;
			
				initMap(lat, lng, placeData);
			};
			//CONTENT
			var content = document.getElementById("info");
			content.querySelector("h2").innerHTML = "Lamb Learning Success Center (LLSC)";
			content.querySelector("h3").innerHTML = "Stan Grad/Heritage Hall";
			content.querySelector("p").innerHTML = "The Lamb Learning Services Centre is located on the second floor of Stan Grad in the MC wing. They offer various services from academic coaching, course preparations, workshops and seminars for work ethics and skills improvement, and academic probation support.";
		}	
	
	//GOOGLE MAP
	function initMap(lat, lng, placeData){	
		var mapOptions = {
			/* Initial zoom level */
  			zoom: 17.5,
 			center: {lat:51.064520, lng:-114.089253} //dynamicly change this 
			};
		
		var beacon = {lat:+lat, lng:+lng};
			map = new google.maps.Map(
			mapPlace, mapOptions
			);
		
		//EMBED MAP IMAGES
		var level1Overlay;
		var level2Overlay;
		
		//Map Options
		var overlayOptions = {
      			opacity:1
  			};
		//Map bounds	
		
		var level1Bounds = new google.maps.LatLngBounds(
      		new google.maps.LatLng(51.064058, -114.090097), //SW
      		new google.maps.LatLng(51.065581, -114.088460) //NE
  		);
		var level2Bounds = new google.maps.LatLngBounds(
      		new google.maps.LatLng(51.064065, -114.090074), //SW
      		new google.maps.LatLng(51.065583, -114.088474) //NE
			
  		);
		//Level 1 Map and show by default
		level1Overlay = new google.maps.GroundOverlay('assets/images/new_stan_grad.png',level1Bounds,overlayOptions);
		level1Overlay.setMap(map);
		
		//Level 2 Map
		level2Overlay = new google.maps.GroundOverlay('assets/images/stanGradMap_level_2.png',level2Bounds,overlayOptions);
		
		//MAP LEVEL TOGGLE
		
		var level1Button = true;
		document.getElementById("level1").addEventListener("click", function(){
			//lock current button
			document.getElementById('level1').disabled = true;
			document.getElementById('level2').disabled = false;

			if(level1Button /*&& !level2Button*/){
			level2Overlay.setMap(null);
			level1Overlay.setMap(map);

			deleteMarkers();
			deletePaths();
				
			level1Button = false;
			level2Button = true;
				
			level1Map();
				
			//reset entrance
			document.getElementById("selectEntrance").selectedIndex = 0;
			document.getElementById('selectEntrance').style.visibility='visible';
			}
		});
		
		
		var level2Button = true;
		document.getElementById("level2").addEventListener("click", function(){
			//lock current button
			document.getElementById('level1').disabled = false;
			document.getElementById('level2').disabled = true;

			if(level2Button){
			level1Overlay.setMap(null);
			level2Overlay.setMap(map);
				
			deleteMarkers();
			deletePaths();
			
			level2Button = false;
			level1Button = true;
				
			level2Map();
				
			//hide entrance dropdown
			document.getElementById('selectEntrance').style.visibility='hidden';
			}
			
		});
		
		//LEVEL 1 MAP MARKERS
			
		function level1Map(){
			//Entrance Marker: East 
			eEntranceLambCoords = {lat:51.064390, lng:-114.088590};

			eEntranceLamb = new google.maps.Marker({ 
				position: eEntranceLambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(eEntranceLamb);
			eEntranceLamb.setMap(null);
			
			
			//infowindow	
			eEntranceLamb.addListener('click',function(){
				escalator1Lamb.setMap(map);
				escalator1Lamb.setAnimation( google.maps.Animation.BOUNCE );
				eEntranceLamb.setIcon('assets/images/maps_icons/current_position_small.png');
				nEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1Lamb.setIcon('assets/images/maps_icons/escalator_small.png');
				
				map.setZoom(18.5);
				map.panTo(eEntranceLambCoords);

				
				eEntranceLambWindow.open(map, eEntranceLamb);
				nEntranceLambWindow.close(map, nEntranceLamb);
				escalator1LambWindow.close(map, escalator1Lamb);
				
				pathLevel1LambEast.setMap(map);
				pathLevel1LambNorth.setMap(null);
			})
			
			//content
			var eEntranceLambContent = '<div class="content">'+
			'<h1>East Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/east_entrance.jpg">'+
			'<p>Welcome to SAIT! Head down the hallway towards the escalator.</p>'+
			'</div>'+
			'</div>';
		
			eEntranceLambWindow = new google.maps.InfoWindow({
				content: eEntranceLambContent
			});
			
			//Entrance Marker: West 
			wEntranceLambCoords = {lat:51.064490, lng:-114.090072};

			wEntranceLamb = new google.maps.Marker({ 
				position: wEntranceLambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wEntranceLamb);
			wEntranceLamb.setMap(null);
			
			
			//infowindow	
			wEntranceLamb.addListener('click',function(){
				wCheck1Lamb.setMap(map);
				wCheck1Lamb.setAnimation( google.maps.Animation.BOUNCE );
				escalator1Lamb.setMap(map);
				escalator1Lamb.setAnimation( google.maps.Animation.BOUNCE );
				
				wEntranceLamb.setIcon('assets/images/maps_icons/current_position_small.png');
				nEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1Lamb.setIcon('assets/images/maps_icons/escalator_small.png');
				wCheck1Lamb.setIcon('assets/images/maps_icons/entrance_small.png');
				
				map.setZoom(18.5);
				map.panTo(wEntranceLambCoords);

				wEntranceLambWindow.open(map, wEntranceLamb);
				nEntranceLambWindow.close(map, nEntranceLamb);
				escalator1LambWindow.close(map, escalator1Lamb);
				wCheck1LambWindow.close(map, wCheck1Lamb);
				
				pathLevel1LambWest.setMap(map);
				pathLevel1LambNorth.setMap(null);
			})
			
			//content
			var wEntranceLambContent = '<div class="content">'+
			'<h1>West Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_entrance.jpg">'+
			'<p>Welcome to SAIT! Head towards the doors to your left.</p>'+
			'</div>'+
			'</div>';
		
			wEntranceLambWindow = new google.maps.InfoWindow({
				content: wEntranceLambContent
			});
			
			//Checkpoint Marker: Escalator
			escalator1LambCoords = {lat:51.064439, lng:-114.089424};
			
			escalator1Lamb = new google.maps.Marker({ 
				position: escalator1LambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Escalator',
				icon: 'assets/images/maps_icons/escalator_small.png'
			});
			markers.push(escalator1Lamb);
			escalator1Lamb.setMap(null);
			
			//Info window	
			escalator1Lamb.addListener('click',function(){
				escalator1Lamb.setIcon('assets/images/maps_icons/current_position_small.png');
				nEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				eEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				wEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				sEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1Lamb.setIcon('assets/images/maps_icons/entrance_small.png')
				sCheck1Lamb.setIcon('assets/images/maps_icons/entrance_small.png')
				
				escalator1LambWindow.open(map, escalator1Lamb);
				eEntranceLambWindow.close(map, eEntranceLamb);
				nEntranceLambWindow.close(map, nEntranceLamb);
				wEntranceLambWindow.close(map, wEntranceLamb);
				sEntranceLambWindow.close(map, sEntranceLamb);
				wCheck1LambWindow.close(map, wCheck1Lamb);
				sCheck1LambWindow.close(map, sCheck1Lamb);
				
				map.setZoom(18.5);
				map.panTo(escalator1LambCoords);
			});
			
			//content
			var escalator1LambContent = '<div class="content">'+
			'<h1>Escalator</h1>'+
			'<div>'+
			'<img src="assets/images/escalator_1.jpg">'+
			'<p>Take the escalator to the 2nd floor. Please change to floor level 2.</p>'+
			'</div>'+
			'</div>';
			
			escalator1LambWindow = new google.maps.InfoWindow({
				content: escalator1LambContent
			});

			//Level 1 East flightpath
			pathLevel1LambEastCoords = [
			  {lat:51.064390, lng:-114.088590},
			  {lat:51.064390, lng:-114.089326},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1LambEast = new google.maps.Polyline({
			  path: pathLevel1LambEastCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1LambEast);
			
			//Checkpoint Marker: Secondary Entrance 
			
			var wCheck1LambCoords = {lat:51.064585, lng:-114.089945};

			wCheck1Lamb = new google.maps.Marker({ 
				position: wCheck1LambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wCheck1Lamb);
			wCheck1Lamb.setMap(null);
			
			//events	
			wCheck1Lamb.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(wCheck1LambCoords);
				//current position toggle
				
				wEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1Lamb.setIcon('assets/images/maps_icons/current_position_small.png');
				escalator1Lamb.setIcon('assets/images/maps_icons/escalator_small.png')
				//infowindow toggle
				wCheck1LambWindow.open(map, wCheck1Lamb);
				wEntranceLambWindow.close(map, wEntranceLamb);
				escalator1LambWindow.close(map, escalator1Lamb);
				
			})
			var wCheck1LambContent = '<div class="content">'+
			'<h1>Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_door.jpg">'+
			'<p>Head down the hallway, and then turn right towards the escalator.</p>'+
			'</div>'+
			'</div>';

			wCheck1LambWindow = new google.maps.InfoWindow({
				content: wCheck1LambContent
			});
			
			//West Flightpath
			pathLevel1LambWestCoords = [
			  wEntranceLambCoords,
				wCheck1LambCoords,
				{lat:51.064585, lng:-114.089424},
				escalator1LambCoords
			];
			
       		pathLevel1LambWest = new google.maps.Polyline({
			  path: pathLevel1LambWestCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1LambWest);
			
			//Checkpoint Marker: Secondary South Entrance 
			
			var sCheck1LambCoords =   {lat:51.064225, lng:-114.089470};

			sCheck1Lamb = new google.maps.Marker({ 
				position: sCheck1LambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sCheck1Lamb);
			sCheck1Lamb.setMap(null);
			
			//events	
			sCheck1Lamb.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(sCheck1LambCoords);
				//current position toggle
				
				sEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1Lamb.setIcon('assets/images/maps_icons/current_position_small.png');
				escalator1Lamb.setIcon('assets/images/maps_icons/escalator_small.png');
				//infowindow toggle
				sCheck1LambWindow.open(map, sCheck1Lamb);
				sEntranceLambWindow.close(map, sEntranceLamb);
				escalator1LambWindow.close(map, escalator1Lamb);
				
			});
			var sCheck1LambContent = '<div class="content">'+
			'<h1>Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_door.jpg">'+
			'<p>Through these doors you will enter Study Hall. Exit Study Hall and continue to follow the path towards the escalator.</p>'+
			'</div>'+
			'</div>';

			sCheck1LambWindow = new google.maps.InfoWindow({
				content: sCheck1LambContent
			});
			
			//Entrance Marker: North 
			nEntranceLambCoords = {lat:51.064865, lng:-114.089270};
			
			nEntranceLamb = new google.maps.Marker({ 
				position: nEntranceLambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(nEntranceLamb);
			nEntranceLamb.setMap(null);
			
			//Marker Events	
			nEntranceLamb.addListener('click',function(){
				escalator1Lamb.setMap(map);
				escalator1Lamb.setAnimation( google.maps.Animation.BOUNCE );
				
				map.setZoom(18.5);
				map.panTo(nEntranceLambCoords);
				
				nEntranceLamb.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1Lamb.setIcon('assets/images/maps_icons/escalator_small.png');
				
				nEntranceLambWindow.open(map, nEntranceLamb);
				eEntranceLambWindow.close(map, eEntranceLamb);
				escalator1LambWindow.close(map, escalator1Lamb);
				
				pathLevel1LambNorth.setMap(map);
				pathLevel1LambEast.setMap(null);
			})
			
			var nEntranceLambContent = '<div class="content">'+
			'<h1>North Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/north_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed towards the escalator.</p>'+
			'</div>'+
			'</div>';
			
			nEntranceLambWindow = new google.maps.InfoWindow({
				content: nEntranceLambContent
			});

			//Level 1 flightpath: from North Entrance
			pathLevel1LambNorthCoords = [
			  {lat:51.064865, lng:-114.089270},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1LambNorth = new google.maps.Polyline({
			  path: pathLevel1LambNorthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1LambNorth);
			
			//Entrance Marker: South 
			sEntranceLambCoords = {lat:51.064065, lng:-114.089265};
			
			sEntranceLamb = new google.maps.Marker({ 
				position: sEntranceLambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sEntranceLamb);
			sEntranceLamb.setMap(null);
			
			//Marker Events	
			sEntranceLamb.addListener('click',function(){
				escalator1Lamb.setMap(map);
				escalator1Lamb.setAnimation( google.maps.Animation.BOUNCE );
				sCheck1Lamb.setMap(map);
				sCheck1Lamb.setAnimation( google.maps.Animation.BOUNCE );
				
				map.setZoom(18.5);
				map.panTo(sEntranceLambCoords);
				
				sEntranceLamb.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceLamb.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1Lamb.setIcon('assets/images/maps_icons/escalator_small.png');
				sCheck1Lamb.setIcon('assets/images/maps_icons/entrance_small.png')
				
				sEntranceLambWindow.open(map, sEntranceLamb);
				eEntranceLambWindow.close(map, eEntranceLamb);
				escalator1LambWindow.close(map, escalator1Lamb);
				sCheck1LambWindow.close(map, sCheck1Lamb);
				
				pathLevel1LambSouth.setMap(map);
				pathLevel1LambEast.setMap(null);
				pathLevel1LambNorth.setMap(null);
				pathLevel1LambWest.setMap(null);
			})
			
			var sEntranceLambContent = '<div class="content">'+
			'<h1>South Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed through the doors on your left.</p>'+
			'</div>'+
			'</div>';
			
			sEntranceLambWindow = new google.maps.InfoWindow({
				content: sEntranceLambContent
			});
			
			//Level 1 flightpath: from South Entrance
			pathLevel1LambSouthCoords = [
				sEntranceLambCoords,
				{lat:51.064175, lng:-114.089265},
			  {lat:51.064225, lng:-114.089470},
				 {lat:51.064323, lng:-114.089470},
				{lat:51.064323, lng:-114.089568},
				{lat:51.064380, lng:-114.089568},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1LambSouth = new google.maps.Polyline({
			  path: pathLevel1LambSouthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1LambSouth);


		}
		level1Map();
		
		//LEVEL 2 MAP MARKERS	
		function level2Map(){
			//destinationLamb Marker
			destinationLambCoords = {lat:51.0645864, lng:-114.0889601};
			destinationLamb = new google.maps.Marker({ 
				position: destinationLambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Lamb Learning Success Center',
				icon: 'assets/images/maps_icons/destination_small.png'
			});
			markers.push(destinationLamb);
			
			
			//Info window	
			//button 
			destinationLamb.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(destinationLambCoords);
				
				destinationLambWindow.open(map, destinationLamb);
				escalator2LambWindow.close(map, escalator2Lamb);
				
				escalator2Lamb.setIcon('assets/images/maps_icons/escalator_small.png');
			})
			
			//content
			var destinationLambContent = '<div class="content">'+
			'<h1>LLSC</h1>'+
			'<div>'+
			'<img src="assets/images/lamb.jpg">'+
			'<p>Destination. Thank you for using Wayfinder.</p>'+
			'</div>'+
			'</div>';
			//init info window
			destinationLambWindow = new google.maps.InfoWindow({
				content: destinationLambContent
			});
			
			//Checkpoint Marker: Escalator Level 2
			escalator2LambCoords = {lat:51.064535, lng:-114.089430};
			
			escalator2Lamb = new google.maps.Marker({ 
				position: escalator2LambCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Escalator 2',
				icon: 'assets/images/maps_icons/escalator_small.png'
			});
			markers.push(escalator2Lamb);
			
			
			//Info window	
			//button 
			escalator2Lamb.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(escalator2LambCoords);
				
				escalator2LambWindow.open(map, escalator2Lamb);
				destinationLambWindow.close(map, destinationLamb);
				
				escalator2Lamb.setIcon('assets/images/maps_icons/current_position_small.png');
				
				pathLevel2Lamb.setMap(map);
				destinationLamb.setMap(map);
			});
			//content
			var escalator2LambContent = '<div class="content">'+
			'<h1>Level 2</h1>'+
			'<div>'+
			'<img src="assets/images/level_2.jpg">'+
			'<p>Proceed accross the bridge and your destination will be in front of you.</p>'+
			'</div>'+
			'</div>';
			//init info window
			escalator2LambWindow = new google.maps.InfoWindow({
				content: escalator2LambContent
			});
			
			
			//Level 2 flightpath
			pathLevel2LambCoords = [
				escalator2LambCoords,
				{lat:51.0645864, lng:-114.089430},
				destinationLambCoords
			];
       		pathLevel2Lamb = new google.maps.Polyline({
			  path: pathLevel2LambCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel2Lamb);
		}
	}
}