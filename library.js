function loadLibrary(){
	
	getData();
	
//Places API request - Beacon Location
	function getData(){
		var requestURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ8VRLb5JvcVMRoM171irqpAc&fields=name,geometry,address_component&key=AIzaSyDGvqMTt1orMIidhIJKLK7NwySTZSbR0yA",
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
			}
				//CONTENT
		var content = document.getElementById("info");
		content.querySelector("h2").innerHTML = "Reg Erhardt Library";
		content.querySelector("h3").innerHTML = "Stan Grad/Heritage Hall";
		content.querySelector("p").innerHTML = "The Reg Erhardt Library, located beside Stan Grad’s Irene Lewis Atrium, is three levels of resources and support for fellow students. The library offers many services such as support from a library liaison, a specialist for a specific subject support, teaching support, and 11 study rooms equipped with a monitor for maximum productivity.";
		}	
	
	//GOOGLE MAP
	function initMap(lat, lng, placeData){	
		var center = {lat:51.064520, lng:-114.089253}
		//console.log(loc);
		//console.log(clat);
		var beacon = {lat:+lat, lng:+lng};
		map = new google.maps.Map(
			mapPlace, {zoom: 17.5, center:center}
			);
		
		//EMBED MAP IMAGE
		var level1Overlay;

		var overlayOptions = {
      			opacity:1
  			}	
		var level1Bounds = new google.maps.LatLngBounds(
      		new google.maps.LatLng(51.064058, -114.090097), //SW
      		new google.maps.LatLng(51.065581, -114.088460) //NE
  		);
		
		level1Overlay = new google.maps.GroundOverlay('assets/images/new_stan_grad.png',level1Bounds,overlayOptions);
		level1Overlay.setMap(map);
	
		//MAP MARKERS
		var  
			pathLevel1LibraryEastCoords, 
			
			pathLevel1LibraryWestCoords;
			
		function level1Map(){
			//Entrance Marker: East 
			
			eEntranceLibraryCoords = {lat:51.064390, lng:-114.088590};

			eEntranceLibrary = new google.maps.Marker({ 
				position: eEntranceLibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(eEntranceLibrary);
			eEntranceLibrary.setMap(null);
			
			//events	
			eEntranceLibrary.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(eEntranceLibraryCoords);
				//current position toggle
				eEntranceLibrary.setIcon('assets/images/maps_icons/current_position_small.png');
				wEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				//init navigation
				eDestinationLibrary.setMap(map);
				eDestinationLibrary.setAnimation( google.maps.Animation.BOUNCE );
				
				pathLevel1LibraryEast.setMap(map);
				wCheck1Library.setMap(null);
				wDestinationLibrary.setMap(null);
				pathLevel1LibraryWest.setMap(null);
				
				//infowindow toggles
				eEntranceLibraryWindow.open(map, eEntranceLibrary);
				eDestinationLibraryWindow.close(map, eDestinationLibrary)
				wCheck1LibraryWindow.close(map, wCheck1Library);
				wEntranceLibraryWindow.close(map, wEntranceLibrary);
			})
			
			var eEntranceLibraryContent = '<div class="content">'+
			'<h1>East Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/east_entrance.jpg">'+
			'<p>Welcome to SAIT! The library is just a few steps down the hall to your right.</p>'+
			'</div>'+
			'</div>';

			eEntranceLibraryWindow = new google.maps.InfoWindow({
				content: eEntranceLibraryContent
			});
		
			//East Destination Marker 
			var eDestinationLibraryCoords = {lat:51.064390, lng:-114.088760};

			eDestinationLibrary = new google.maps.Marker({ 
				position: eDestinationLibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Library Entrance',
				icon: 'assets/images/maps_icons/destination_small.png'
			});
			markers.push(eDestinationLibrary);
			eDestinationLibrary.setMap(null);
			
			//Marker Events	
			eDestinationLibrary.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(eDestinationLibraryCoords);
				//current position toggle
				eEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				sEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1Library.setIcon('assets/images/maps_icons/entrance_small.png');
				//infowindow toggles
				eDestinationLibraryWindow.open(map, eDestinationLibrary);
				eEntranceLibraryWindow.close(map, eEntranceLibrary);
				wCheck1LibraryWindow.close(map, wCheck1Library);
				wEntranceLibraryWindow.close(map, wEntranceLibrary);
				sEntranceLibraryWindow.close(map, sEntranceLibrary);
				sCheck1LibraryWindow.close(map, sCheck1Library);
			})
			
			var eDestinationLibraryContent = '<div class="content">'+
			'<h1>Library</h1>'+
			'<div>'+
			'<img src="assets/images/library_1.jpg">'+
			'<p>Destination. Thank you for using Wayfinder.</p>'+
			'</div>'+
			'</div>';

			eDestinationLibraryWindow = new google.maps.InfoWindow({
				content: eDestinationLibraryContent
			});
			
			//East Entrance Flightpath
			pathLevel1LibraryEastCoords = [
			  {lat:51.064390, lng:-114.088590},
			  {lat:51.064390, lng:-114.088760}
			 
			];
       		pathLevel1LibraryEast = new google.maps.Polyline({
			  path: pathLevel1LibraryEastCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			markers.push(pathLevel1LibraryEast);
			pathLevel1LibraryEast.setMap(null);
			
			//Entrance Marker: West 
			wEntranceLibraryCoords = {lat:51.064490, lng:-114.090072};

			wEntranceLibrary = new google.maps.Marker({ 
				position: wEntranceLibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wEntranceLibrary);
			wEntranceLibrary.setMap(null);
			
			//Marker Events
			wEntranceLibrary.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(wEntranceLibraryCoords);
				//current position toggle
				wEntranceLibrary.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1Library.setIcon('assets/images/maps_icons/entrance_small.png');
				//navigation toggle
				wCheck1Library.setMap(map);
				wDestinationLibrary.setMap(map);
				eDestinationLibrary.setMap(null);
				//reset animation
				wCheck1Library.setAnimation( google.maps.Animation.BOUNCE );
				wDestinationLibrary.setAnimation( google.maps.Animation.BOUNCE );
				//path toggle
				pathLevel1LibraryWest.setMap(map);
				pathLevel1LibraryEast.setMap(null);
				//info window toggles
				wEntranceLibraryWindow.open(map, wEntranceLibrary);
				wCheck1LibraryWindow.close(map, wCheck1Library);
				wDestinationLibraryWindow.close(map, wDestinationLibrary);
				eEntranceLibraryWindow.close(map, eEntranceLibrary);
				eDestinationLibraryWindow.close(map, eDestinationLibrary)
			})
			//content
			var wEntranceLibraryContent = '<div class="content">'+
			'<h1>West Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_entrance.jpg">'+
			'<p>Welcome to SAIT! Head towards the doors to your left.</p>'+
			'</div>'+
			'</div>';

			wEntranceLibraryWindow = new google.maps.InfoWindow({
				content: wEntranceLibraryContent
			});
			
			//Checkpoint Marker: Secondary Entrance 
			
			var wCheck1LibraryCoords = {lat:51.064585, lng:-114.089945};

			wCheck1Library = new google.maps.Marker({ 
				position: wCheck1LibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wCheck1Library);
			wCheck1Library.setMap(null);
			
			//events	
			wCheck1Library.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(wCheck1LibraryCoords);
				//current position toggle
				wEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1Library.setIcon('assets/images/maps_icons/current_position_small.png');
				//infowindow toggle
				wCheck1LibraryWindow.open(map, wCheck1Library);
				wEntranceLibraryWindow.close(map, wEntranceLibrary);
				wDestinationLibraryWindow.close(map, wDestinationLibrary);
			})
			var wCheck1LibraryContent = '<div class="content">'+
			'<h1>Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_door.jpg">'+
			'<p>Continue following the path down the hall and you will arrive at your destination.</p>'+
			'</div>'+
			'</div>';

			wCheck1LibraryWindow = new google.maps.InfoWindow({
				content: wCheck1LibraryContent
			});
			
			//West Destination Marker 
			var wDestinationLibraryCoords = {lat:51.064585, lng:-114.088980};

			wDestinationLibrary = new google.maps.Marker({ 
				position: wDestinationLibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Library Entrance',
				icon: 'assets/images/maps_icons/destination_small.png'
			});
			markers.push(wDestinationLibrary);
			wDestinationLibrary.setMap(null);
			
			//infowindow	
			wDestinationLibrary.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(wDestinationLibraryCoords);
				//current position toggle
				wEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1Library.setIcon('assets/images/maps_icons/entrance_small.png');
				nEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				
				sEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				//infowindow toggle
				wDestinationLibraryWindow.open(map, wDestinationLibrary);
				wCheck1LibraryWindow.close(map, wCheck1Library);
				wEntranceLibraryWindow.close(map, wEntranceLibrary);
				nEntranceLibraryWindow.close(map, nEntranceLibrary);
			
			});
			var wDestinationLibraryContent = '<div class="content">'+
			'<h1>Library</h1>'+
			'<div>'+
			'<img src="assets/images/library_2.jpg">'+
			'<p>Destination. Thank you for using Wayfinder.</p>'+
			'</div>'+
			'</div>';

			wDestinationLibraryWindow = new google.maps.InfoWindow({
				content: wDestinationLibraryContent
			});
			
			//Level 1 flightpath: west
			pathLevel1LibraryWestCoords = [
			  {lat:51.064490, lng:-114.090072},
			  {lat:51.064585, lng:-114.089945},
			  {lat:51.064585, lng:-114.088980}
			];
       		pathLevel1LibraryWest = new google.maps.Polyline({
			  path: pathLevel1LibraryWestCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1LibraryWest);
			pathLevel1LibraryWest.setMap(null);
			
			//Entrance Marker: North 
			
			nEntranceLibraryCoords = {lat:51.064865, lng:-114.089270};
			
			nEntranceLibrary = new google.maps.Marker({ 
				position: nEntranceLibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(nEntranceLibrary);
			nEntranceLibrary.setMap(null);
			
			//Marker Events	
			nEntranceLibrary.addListener('click',function(){
				wDestinationLibrary.setMap(map);
				
				map.setZoom(18.5);
				map.panTo(nEntranceLibraryCoords);
				nEntranceLibrary.setIcon('assets/images/maps_icons/current_position_small.png');
				
				
				
				nEntranceLibraryWindow.open(map, nEntranceLibrary);
				eEntranceLibraryWindow.close(map, eEntranceLibrary);
				wDestinationLibraryWindow.close(map, wDestinationLibrary);
			
				
				pathLevel1LibraryNorth.setMap(map);
				pathLevel1LibraryEast.setMap(null);
			});
			
			var nEntranceLibraryContent = '<div class="content">'+
			'<h1>North Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/north_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed down this path to arrive at your destination.</p>'+
			'</div>'+
			'</div>';
			
			nEntranceLibraryWindow = new google.maps.InfoWindow({
				content: nEntranceLibraryContent
			});

			//Level 1 flightpath: from North Entrance
			pathLevel1LibraryNorthCoords = [
			  {lat:51.064865, lng:-114.089270},
			  {lat:51.064585, lng:-114.089270},
				{lat:51.064585, lng:-114.088980}
			];
       		pathLevel1LibraryNorth = new google.maps.Polyline({
			  path: pathLevel1LibraryNorthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1LibraryNorth);
			
			//Entrance Marker: South 
			
			sEntranceLibraryCoords = {lat:51.064065, lng:-114.089265};
			
			sEntranceLibrary = new google.maps.Marker({ 
				position: sEntranceLibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'South Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sEntranceLibrary);
			sEntranceLibrary.setMap(null);
			
			//Marker Events	
			sEntranceLibrary.addListener('click',function(){
				
				sCheck1Library.setMap(map);
				sCheck1Library.setAnimation( google.maps.Animation.BOUNCE );
				eDestinationLibrary.setMap(map);
				eDestinationLibrary.setAnimation( google.maps.Animation.BOUNCE );
				
				
				map.setZoom(18.5);
				map.panTo(sEntranceLibraryCoords);
				sEntranceLibrary.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1Library.setIcon('assets/images/maps_icons/entrance_small.png')
				
				
				
				sEntranceLibraryWindow.open(map, sEntranceLibrary);
				eEntranceLibraryWindow.close(map, eEntranceLibrary);
				eDestinationLibraryWindow.close(map, eDestinationLibrary);
				sCheck1LibraryWindow.close(map, sCheck1Library);
				
				pathLevel1LibrarySouth.setMap(map);
				pathLevel1LibraryNorth.setMap(null);
				pathLevel1LibraryEast.setMap(null);
			})
			
			var sEntranceLibraryContent = '<div class="content">'+
			'<h1>South Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed through the doors on your right.</p>'+
			'</div>'+
			'</div>';
			
			sEntranceLibraryWindow = new google.maps.InfoWindow({
				content: sEntranceLibraryContent
			});
			
			//Checkpoint Marker: Secondary South Entrance 
			
			sCheck1LibraryCoords =   {lat:51.064225, lng:-114.089070};

			sCheck1Library = new google.maps.Marker({ 
				position: sCheck1LibraryCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sCheck1Library);
			sCheck1Library.setMap(null);
			
			//events	
			sCheck1Library.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(sCheck1LibraryCoords);
				//current position toggle
				
				sEntranceLibrary.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1Library.setIcon('assets/images/maps_icons/current_position_small.png');
				
				//infowindow toggle
				sCheck1LibraryWindow.open(map, sCheck1Library);
				sEntranceLibraryWindow.close(map, sEntranceLibrary);
				eDestinationLibraryWindow.close(map, eDestinationLibrary);
				
			});
			var sCheck1LibraryContent = '<div class="content">'+
			'<h1>Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_door.jpg">'+
			'<p>Through these doors you will enter Study Hall. Exit Study Hall and continue to follow the path towards your destination.</p>'+
			'</div>'+
			'</div>';

			sCheck1LibraryWindow = new google.maps.InfoWindow({
				content: sCheck1LibraryContent
			});

			pathLevel1LibrarySouthCoords = [
				sEntranceLibraryCoords,
				{lat:51.064175, lng:-114.089265},
			  sCheck1LibraryCoords,
				 {lat:51.064323, lng:-114.089070},
				{lat:51.064323, lng:-114.088760},
				eDestinationLibraryCoords
				
			];
       		pathLevel1LibrarySouth = new google.maps.Polyline({
			  path: pathLevel1LibrarySouthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1LibrarySouth);
		}
		
		level1Map();
	}
}

// JavaScript Document