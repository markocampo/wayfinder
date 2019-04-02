// JavaScript Document
function loadIct(){
	//var lat, lng, placeData;
	getData();
	
function getData(){
		var requestURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJP78CcpJvcVMRy9vI_El-hxY&fields=name,geometry,address_component&key=AIzaSyDGvqMTt1orMIidhIJKLK7NwySTZSbR0yA",
			request = new XMLHttpRequest();
			request.open('GET', requestURL);
			request.responseType = 'json';
			request.send();	
		
			request.onload = function(){
				placeData = request.response;
				console.log(placeData);
				//store lat and lng coordinates
					  lat = placeData.result.geometry.location.lat,
					  lng = placeData.result.geometry.location.lng;
				
				initMap(lat, lng, placeData);

			}		
			
	//CONTENT
	var content = document.getElementById("info");
	content.querySelector("h2").innerHTML = "ICT Services";
	content.querySelector("h3").innerHTML = "Stan Grad/Heritage Hall";
	content.querySelector("p").innerHTML = "ICT Fast Track and Continuing Education is located on the third floor of the Eugene Coste building, also known as the MD wing of Stan Grad. They offer services and advisors with application and tuition procedure for Fast Track and continuing education communication programs.";
	}	

	//GOOGLE MAP
	function initMap(lat, lng, placeData){	
		var mapOptions = {
			/* Initial zoom level */
  			zoom: 17.5,
 			center: {lat:51.064520, lng:-114.089253} //dynamicly change this 
			};
		
		//console.log(loc);
		//console.log(clat);
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
  			}
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
		
		//Level 3 Map
		level3Overlay = new google.maps.GroundOverlay('assets/images/new_level_3.png',level2Bounds,overlayOptions);
		
		//MAP LEVEL TOGGLE
		var level1Button = true;
		document.getElementById("level1").addEventListener("click", function(){
			//lock current button
			document.getElementById('level1').disabled = true;
			document.getElementById('level2').disabled = false;
			document.getElementById('level3').disabled = false;
			
			if(level1Button /*&& !level2Button || !level3Button*/){
				level2Overlay.setMap(null);
				level3Overlay.setMap(null);
				level1Overlay.setMap(map);
				
				deleteMarkers();
				deletePaths();
				
				//redeclare booleans
				level2Button = true;
				level3Button = true;
				level1Button = false;
				
				level1Map();
				//reset entrance
				document.getElementById("selectEntrance").selectedIndex = 0;
				document.getElementById('selectEntrance').style.visibility='visible';
			}
		
		});

		var level2Button = true;
		document.getElementById("level2").addEventListener("click", function(){
			document.getElementById('level1').disabled = false;
			document.getElementById('level3').disabled = false;
			document.getElementById('level2').disabled = true;
			if(level2Button){
				level1Overlay.setMap(null);
				level3Overlay.setMap(null);
				level2Overlay.setMap(map);
				
				deleteMarkers();
				deletePaths();
				
				level1Button = true;
				level3Button = true;
				level2Button = false;
			
				level2Map();

				//hide entrance dropdown
				document.getElementById('selectEntrance').style.visibility='hidden';
			}
		});
		var level3Button = true;
		document.getElementById("level3").addEventListener("click", function(){
			document.getElementById('level1').disabled = false;
			document.getElementById('level2').disabled = false;
			document.getElementById('level3').disabled = true;
			if(level3Button){
				level1Overlay.setMap(null);
				level2Overlay.setMap(null);
				level3Overlay.setMap(map);
				
				deleteMarkers();
				deletePaths();

				level1Button = true;
				level2Button = true;
				level3Button = false;

				level3Map();
				
				document.getElementById('selectEntrance').style.visibility='hidden';
			}
		});
		
		
		//LEVEL 1 MAP MARKERS
		var escalatorIctWindow,
			pathLevel1IctEastCoords, 
			pathLevel1IctNorthCoords,
			pathLevel1IctSouthCoords;
			
		function level1Map(){
			//Entrance Marker: East 
			eEntranceIctCoords = {lat:51.064390, lng:-114.088590};
			
			eEntranceIct = new google.maps.Marker({ 
				position: eEntranceIctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			
			markers.push(eEntranceIct);
			eEntranceIct.setMap(null);
			
			//actions	
			eEntranceIct.addListener('click',function(){
				escalatorIct.setMap(map);
				escalatorIct.setAnimation( google.maps.Animation.BOUNCE );
				eEntranceIct.setIcon('assets/images/maps_icons/current_position_small.png');
				nEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				escalatorIct.setIcon('assets/images/maps_icons/escalator_small.png');
				
				map.setZoom(18.5);
				map.panTo(eEntranceIctCoords);
				
				eEntranceIctWindow.open(map, eEntranceIct);
				nEntranceIctWindow.close(map, nEntranceIct);
				escalatorIctWindow.close(map, escalatorIct);
				
				pathLevel1IctEast.setMap(map);
				pathLevel1IctNorth.setMap(null);
			})
			
			//content
			var eEntranceIctContent = '<div class="content">'+
			'<h1>East Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/east_entrance.jpg">'+
			'<p>Welcome to SAIT! Head down the hallway towards the escalator.</p>'+
			'</div>'+
			'</div>';
		
			eEntranceIctWindow = new google.maps.InfoWindow({
				content: eEntranceIctContent
			});
		
			//Checkpoint Marker: escalatorIct
			var escalatorIctCoords = {lat:51.064439, lng:-114.089424};
			escalatorIct = new google.maps.Marker({ 
				position: escalatorIctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'escalatorIct',
				icon: 'assets/images/maps_icons/escalator_small.png'
			});
			markers.push(escalatorIct);
			escalatorIct.setMap(null);
			
			//Info window	
			escalatorIct.addListener('click',function(){
				escalatorIct.setIcon('assets/images/maps_icons/current_position_small.png');
				nEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				eEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				sEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				wEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1Ict.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1Ict.setIcon('assets/images/maps_icons/entrance_small.png');
				
				escalatorIctWindow.open(map, escalatorIct);
				eEntranceIctWindow.close(map, eEntranceIct);
				nEntranceIctWindow.close(map, nEntranceIct);
				sEntranceIctWindow.close(map, sEntranceIct);
				wEntranceIctWindow.close(map, wEntranceIct);
				sCheck1IctWindow.close(map, sCheck1Ict);
				wCheck1IctWindow.close(map, sCheck1Ict);
				
				map.setZoom(18.5);
				map.panTo(escalatorIctCoords);
			});
			
			//content
			var escalatorIctContent = '<div class="content">'+
			'<h1>Escalator</h1>'+
			'<div>'+
			'<img src="assets/images/escalator_1.jpg">'+
			'<p>Take the escalator to the 2nd floor. Please change to floor level 2.</p>'+
			'</div>'+
			'</div>';
			
			escalatorIctWindow = new google.maps.InfoWindow({
				content: escalatorIctContent
			});

			//Level 1 flightpath
			pathLevel1IctEastCoords = [
			  {lat:51.064390, lng:-114.088590},
			  {lat:51.064390, lng:-114.089326},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1IctEast = new google.maps.Polyline({
			  path: pathLevel1IctEastCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1IctEast);
			
			//Entrance Marker: North 
			
			nEntranceIctCoords = {lat:51.064865, lng:-114.089270};
			
			nEntranceIct = new google.maps.Marker({ 
				position: nEntranceIctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(nEntranceIct);
			nEntranceIct.setMap(null);
			
			//Marker Events	
			nEntranceIct.addListener('click',function(){
				escalatorIct.setMap(map);
				escalatorIct.setAnimation( google.maps.Animation.BOUNCE );
				
				map.setZoom(18.5);
				map.panTo(nEntranceIctCoords);
				nEntranceIct.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				escalatorIct.setIcon('assets/images/maps_icons/escalator_small.png');
				
				nEntranceIctWindow.open(map, nEntranceIct);
				eEntranceIctWindow.close(map, eEntranceIct);
				escalatorIctWindow.close(map, escalatorIct);
				
				pathLevel1IctNorth.setMap(map);
				pathLevel1IctEast.setMap(null);
			});
			
			var nEntranceIctContent = '<div class="content">'+
			'<h1>North Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/north_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed towards the escalator.</p>'+
			'</div>'+
			'</div>';
			
			nEntranceIctWindow = new google.maps.InfoWindow({
				content: nEntranceIctContent
			});

			//Level 1 flightpath: from North Entrance
			pathLevel1IctNorthCoords = [
			  {lat:51.064865, lng:-114.089270},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1IctNorth = new google.maps.Polyline({
			  path: pathLevel1IctNorthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1IctNorth);
			
			//Entrance Marker: South 
			
			sEntranceIctCoords = {lat:51.064065, lng:-114.089265};
			
			sEntranceIct = new google.maps.Marker({ 
				position: sEntranceIctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'South Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sEntranceIct);
			sEntranceIct.setMap(null);
			
			//Marker Events	
			sEntranceIct.addListener('click',function(){
				escalatorIct.setMap(map);
				escalatorIct.setAnimation( google.maps.Animation.BOUNCE );
				sCheck1Ict.setMap(map);
				sCheck1Ict.setAnimation( google.maps.Animation.BOUNCE );
				
				map.setZoom(18.5);
				map.panTo(sEntranceIctCoords);
				sEntranceIct.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				escalatorIct.setIcon('assets/images/maps_icons/escalator_small.png');
				sCheck1Ict.setIcon('assets/images/maps_icons/entrance_small.png')
				
				sEntranceIctWindow.open(map, sEntranceIct);
				eEntranceIctWindow.close(map, eEntranceIct);
				escalatorIctWindow.close(map, escalatorIct);
				sCheck1IctWindow.close(map, sCheck1Ict);
				
				pathLevel1IctSouth.setMap(map);
				pathLevel1IctNorth.setMap(null);
				pathLevel1IctEast.setMap(null);
			})
			
			var sEntranceIctContent = '<div class="content">'+
			'<h1>South Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed through the doors on your left.</p>'+
			'</div>'+
			'</div>';
			
			sEntranceIctWindow = new google.maps.InfoWindow({
				content: sEntranceIctContent
			});
			
			//Checkpoint Marker: Secondary South Entrance 
			
			var sCheck1IctCoords =   {lat:51.064225, lng:-114.089470};

			sCheck1Ict = new google.maps.Marker({ 
				position: sCheck1IctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sCheck1Ict);
			sCheck1Ict.setMap(null);
			
			//events	
			sCheck1Ict.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(sCheck1IctCoords);
				//current position toggle
				
				sEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1Ict.setIcon('assets/images/maps_icons/current_position_small.png');
				escalatorIct.setIcon('assets/images/maps_icons/escalator_small.png');
				//infowindow toggle
				sCheck1IctWindow.open(map, sCheck1Ict);
				sEntranceIctWindow.close(map, sEntranceIct);
				escalatorIctWindow.close(map, escalatorIct);
				
			});
			var sCheck1IctContent = '<div class="content">'+
			'<h1>Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_door.jpg">'+
			'<p>Through these doors you will enter Study Hall. Exit Study Hall and continue to follow the path towards the escalator.</p>'+
			'</div>'+
			'</div>';

			sCheck1IctWindow = new google.maps.InfoWindow({
				content: sCheck1IctContent
			});

			pathLevel1IctSouthCoords = [
				sEntranceIctCoords,
				{lat:51.064175, lng:-114.089265},
			  {lat:51.064225, lng:-114.089470},
				 {lat:51.064323, lng:-114.089470},
				{lat:51.064323, lng:-114.089568},
				{lat:51.064380, lng:-114.089568},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1IctSouth = new google.maps.Polyline({
			  path: pathLevel1IctSouthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1IctSouth);
			
			//Entrance Marker: West 
			wEntranceIctCoords = {lat:51.064490, lng:-114.090072};

			wEntranceIct = new google.maps.Marker({ 
				position: wEntranceIctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wEntranceIct);
			wEntranceIct.setMap(null);
			
			
			//infowindow	
			wEntranceIct.addListener('click',function(){
				wCheck1Ict.setMap(map);
				wCheck1Ict.setAnimation( google.maps.Animation.BOUNCE );
				escalatorIct.setMap(map);
				escalatorIct.setAnimation( google.maps.Animation.BOUNCE );
				
				wEntranceIct.setIcon('assets/images/maps_icons/current_position_small.png');
				nEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				escalatorIct.setIcon('assets/images/maps_icons/escalator_small.png');
				wCheck1Ict.setIcon('assets/images/maps_icons/entrance_small.png');
				
				map.setZoom(18.5);
				map.panTo(wEntranceIctCoords);

				wEntranceIctWindow.open(map, wEntranceIct);
				nEntranceIctWindow.close(map, nEntranceIct);
				escalatorIctWindow.close(map, escalatorIct);
				wCheck1IctWindow.close(map, wCheck1Ict);
				
				pathLevel1IctWest.setMap(map);
				pathLevel1IctNorth.setMap(null);
			})
			
			//content
			var wEntranceIctContent = '<div class="content">'+
			'<h1>West Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_entrance.jpg">'+
			'<p>Welcome to SAIT! Head towards the doors to your left.</p>'+
			'</div>'+
			'</div>';
		
			wEntranceIctWindow = new google.maps.InfoWindow({
				content: wEntranceIctContent
			});
			
			//Checkpoint Marker: Secondary Entrance 
			
			var wCheck1IctCoords = {lat:51.064585, lng:-114.089945};

			wCheck1Ict = new google.maps.Marker({ 
				position: wCheck1IctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wCheck1Ict);
			wCheck1Ict.setMap(null);
			
			//events	
			wCheck1Ict.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(wCheck1IctCoords);
				//current position toggle
				
				wEntranceIct.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1Ict.setIcon('assets/images/maps_icons/current_position_small.png');
				escalatorIct.setIcon('assets/images/maps_icons/escalator_small.png')
				//infowindow toggle
				wCheck1IctWindow.open(map, wCheck1Ict);
				wEntranceIctWindow.close(map, wEntranceIct);
				escalatorIctWindow.close(map, escalatorIct);
				
			})
			var wCheck1IctContent = '<div class="content">'+
			'<h1>Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_door.jpg">'+
			'<p>Head down the hallway, and then turn right towards the escalator.</p>'+
			'</div>'+
			'</div>';

			wCheck1IctWindow = new google.maps.InfoWindow({
				content: wCheck1IctContent
			});
			
			//West Flightpath
			pathLevel1IctWestCoords = [
			  wEntranceIctCoords,
				wCheck1IctCoords,
				{lat:51.064585, lng:-114.089424},
				escalatorIctCoords
			];
			
       		pathLevel1IctWest = new google.maps.Polyline({
			  path: pathLevel1IctWestCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1IctWest);

		}
		level1Map();
		
		//LEVEL 2 MAP MARKERS	
		var escalator2IctWindow;
			
		function level2Map(){
			//Checkpoint Marker: escalatorIct Level 2
			var escalator2IctCoords = {lat:51.064535, lng:-114.089430};
			
			escalator2Ict = new google.maps.Marker({ 
				position: escalator2IctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'escalatorIct 2',
				icon: 'assets/images/maps_icons/escalator_small.png'
			});
			markers.push(escalator2Ict);
			//escalator2Ict.setMap(null);
			//Info window	
			//button 
			
			escalator2Ict.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(escalator2IctCoords);
				
				escalator2IctWindow.open(map, escalator2Ict);
				
				escalator2Ict.setIcon('assets/images/maps_icons/current_position_small.png');
			});
			//content
			var escalator2IctContent = '<div class="content">'+
			'<h1>Level 2</h1>'+
			'<div>'+
			'<img src="assets/images/level_2.jpg">'+
			'<p>Take the escalator to the 3rd floor. Please change to floor level 3.</p>'+
			'</div>'+
			'</div>';
			//init info window
			escalator2IctWindow = new google.maps.InfoWindow({
				content: escalator2IctContent
			});
		
		}
		//LEVEL 3 MAP MARKERS	
		var  destinationIctWindow, escalator3IctWindow;

		function level3Map(){
			//destinationIct Marker
			var destinationIctCoords = {lat:51.0650464, lng:-114.0885601};
			 destinationIct = new google.maps.Marker({ 
				position: destinationIctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'ICT Services',
				icon: 'assets/images/maps_icons/destination_small.png'
			});
			//events
			destinationIct.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(destinationIctCoords);
				
				destinationIctWindow.open(map, destinationIct);
				escalator3IctWindow.close(map, escalator3Ict);
				check3IctWindow.close(map, check3Ict);
				
				escalator3Ict.setIcon('assets/images/maps_icons/escalator_small.png');
				check3Ict.setIcon('assets/images/maps_icons/checkpoint_up.png');
			});
			markers.push(destinationIct);
			//destinationIct.setMap(null);
			//content
			var destinationIctContent = '<div class="content">'+
			'<h1>ICT Services</h1>'+
			'<div>'+
			'<img src="assets/images/ict.jpg">'+
			'<p>Destination. Thank you for using Wayfinder.</p>'+
			'</div>'+
			'</div>';
			//init info window
			destinationIctWindow = new google.maps.InfoWindow({
				content: destinationIctContent
			});
			
			//Checkpoint Marker: escalatorIct Level 3
			var escalator3IctCoords = {lat:51.064535, lng:-114.089430};
			
			escalator3Ict = new google.maps.Marker({ 
				position: escalator3IctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'escalatorIct 3',
				icon: 'assets/images/maps_icons/escalator_small.png'
			});
			markers.push(escalator3Ict);
			//events
			escalator3Ict.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(escalator3IctCoords);
				
				escalator3IctWindow.open(map, escalator3Ict);
				destinationIctWindow.close(map, destinationIct);
				check3IctWindow.close(map, check3Ict);
				
				escalator3Ict.setIcon('assets/images/maps_icons/current_position_small.png');
				check3Ict.setIcon('assets/images/maps_icons/checkpoint_up.png');
				
				pathLevel3Ict.setMap(map);
				destinationIct.setMap(map);
			});
			//content
			var escalator3IctContent = '<div class="content">'+
			'<h1>Level 3</h1>'+
			'<div>'+
			'<img src="assets/images/level_3.jpg">'+
			'<p>Cross the bridge and continue down the path until you reach the end of the hall.</p>'+
			'</div>'+
			'</div>';
			//init info window
			escalator3IctWindow = new google.maps.InfoWindow({
				content: escalator3IctContent
			});
			
			//Checkpoint Marker: escalatorIct Level 3
			var check3IctCoords = {lat:51.0645864, lng:-114.0885601};
			
			check3Ict = new google.maps.Marker({ 
				position: check3IctCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'checkIct 3',
				icon: 'assets/images/maps_icons/checkpoint_up.png'
			});
			markers.push(check3Ict);
			//events
			check3Ict.addListener('click',function(){
				map.setZoom(18.5);
				map.panTo(check3IctCoords);
				
				check3IctWindow.open(map, check3Ict);
				destinationIctWindow.close(map, destinationIct);
				escalator3IctWindow.close(map, escalator3Ict);
				
				check3Ict.setIcon('assets/images/maps_icons/current_position_small.png');
				escalator3Ict.setIcon('assets/images/maps_icons/escalator_small.png');

			});
			//content
			var check3IctContent = '<div class="content">'+
			'<h1>Hallway</h1>'+
			'<div>'+
			'<img src="assets/images/hallway.jpg">'+
			'<p>Head up the hallway and your destination will be on your left.</p>'+
			'</div>'+
			'</div>';
			//init info window
			check3IctWindow = new google.maps.InfoWindow({
				content: check3IctContent
			});

			//Level 3 flightpath
			pathLevel3IctCoords = [
				escalator3IctCoords,
				{lat:51.0645864, lng:-114.089430},
				{lat:51.0645864, lng:-114.0885601},
				destinationIctCoords
			];
       		pathLevel3Ict = new google.maps.Polyline({
			  path: pathLevel3IctCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel3Ict);
		}
	}
}