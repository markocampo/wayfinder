// JavaScript Document

//Places API request - Beacon Location
function loadStdSrv(){
	getData();
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
			};	
			
			//CONTENT
			var content = document.getElementById("info");
			content.querySelector("h2").innerHTML = "Student Services";
			content.querySelector("h3").innerHTML = "Stan Grad/Heritage Hall";
			content.querySelector("p").innerHTML = "Student Services, located on the second floor of Heritage Hall, assists new and future students from start to end for any concerns pertaining to classes, tuition, and other related questions.";
		}	
	
	//GOOGLE MAP
	function initMap(lat, lng, placeData){
		var mapOptions = {
			/* Initial zoom level */
  			zoom: 17.5,
 			center: {lat:51.064520, lng:-114.089253} 
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
		level1Overlay = new google.maps.GroundOverlay('assets/images/stanGradMap_level_1.png',level1Bounds,overlayOptions);
		level1Overlay.setMap(map);
		
		//Level 2 Map
		level2Overlay = new google.maps.GroundOverlay('assets/images/stanGradMap_level_2.png',level2Bounds,overlayOptions);
		
		//MAP LEVEL TOGGLE
		
		var level1Button = true;
		document.getElementById("level1").addEventListener("click", function(){
			//lock current button
			document.getElementById('level1').disabled = true;
			document.getElementById('level2').disabled = false;
			if(level1Button){
				level2Overlay.setMap(null);
				level1Overlay.setMap(map);

				deleteMarkers();
				deletePaths();	

				level2Button = true;
				level1Button = false;

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
			
				level1Button = true;
				level2Button = false;
				
				level2Map();
				
				//hide entrance dropdown
				document.getElementById('selectEntrance').style.visibility='hidden';
			}
		});
		
		
		//LEVEL 1 MAP MARKERS
			
		function level1Map(){
			//Entrance Marker: East 
			eEntranceStdSrvCoords = {lat:51.064390, lng:-114.088590};

			eEntranceStdSrv = new google.maps.Marker({ 
				position: eEntranceStdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(eEntranceStdSrv);
			eEntranceStdSrv.setMap(null);
			//infowindow	
			//button
			eEntranceStdSrv.addListener('click',function(){

				escalator1StdSrv.setMap(map);
				escalator1StdSrv.setAnimation( google.maps.Animation.BOUNCE );
				
				map.setZoom(18.5);
				map.panTo(eEntranceStdSrvCoords);
				
				eEntranceStdSrv.setIcon('assets/images/maps_icons/current_position_small.png');
				escalator1StdSrv.setIcon('assets/images/maps_icons/escalator_small.png');
				
				eEntranceStdSrvWindow.open(map, eEntranceStdSrv);
				escalator1StdSrvWindow.close(map, escalator1StdSrv);
				
				pathLevel1StdSrv.setMap(map);
			})
			//content
			var eEntranceStdSrvContent = '<div class="content">'+
			'<h1>East Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/east_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed down the hall towards the escalator.</p>'+
			'</div>'+
			'</div>';
			//init info window
			eEntranceStdSrvWindow = new google.maps.InfoWindow({
				content: eEntranceStdSrvContent
			});
			
			//Entrance Marker: West 
			wEntranceStdSrvCoords = {lat:51.064490, lng:-114.090072};

			wEntranceStdSrv = new google.maps.Marker({ 
				position: wEntranceStdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wEntranceStdSrv);
			wEntranceStdSrv.setMap(null);
			
			
			//infowindow	
			wEntranceStdSrv.addListener('click',function(){
				wCheck1StdSrv.setMap(map);
				wCheck1StdSrv.setAnimation( google.maps.Animation.BOUNCE );
				escalator1StdSrv.setMap(map);
				escalator1StdSrv.setAnimation( google.maps.Animation.BOUNCE );
				
				wEntranceStdSrv.setIcon('assets/images/maps_icons/current_position_small.png');
				//nEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1StdSrv.setIcon('assets/images/maps_icons/escalator_small.png');
				wCheck1StdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				
				map.setZoom(18.5);
				map.panTo(wEntranceStdSrvCoords);

				wEntranceStdSrvWindow.open(map, wEntranceStdSrv);
				//nEntranceStdSrvWindow.close(map, nEntranceStdSrv);
				escalator1StdSrvWindow.close(map, escalator1StdSrv);
				wCheck1StdSrvWindow.close(map, wCheck1StdSrv);
				
				pathLevel1StdSrvWest.setMap(map);
				//pathLevel1StdSrvNorth.setMap(null);
			})
			
			//content
			var wEntranceStdSrvContent = '<div class="content">'+
			'<h1>West Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_entrance.jpg">'+
			'<p>Welcome to SAIT! Head towards the doors to your left.</p>'+
			'</div>'+
			'</div>';
		
			wEntranceStdSrvWindow = new google.maps.InfoWindow({
				content: wEntranceStdSrvContent
			});
			
			
			//Checkpoint Marker: Secondary Entrance 
			
			var wCheck1StdSrvCoords = {lat:51.064585, lng:-114.089945};

			wCheck1StdSrv = new google.maps.Marker({ 
				position: wCheck1StdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(wCheck1StdSrv);
			wCheck1StdSrv.setMap(null);
			
			//events	
			wCheck1StdSrv.addListener('click',function(){
				
				//map orientation
				map.setZoom(18.5);
				map.panTo(wCheck1StdSrvCoords);
				//current position toggle
				
				wEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1StdSrv.setIcon('assets/images/maps_icons/current_position_small.png');
				escalator1StdSrv.setIcon('assets/images/maps_icons/escalator_small.png')
				//infowindow toggle
				wCheck1StdSrvWindow.open(map, wCheck1StdSrv);
				wEntranceStdSrvWindow.close(map, wEntranceStdSrv);
				escalator1StdSrvWindow.close(map, escalator1StdSrv);
				
			})
			var wCheck1StdSrvContent = '<div class="content">'+
			'<h1 style="padding-bottom: .5rem;">Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/west_door.jpg">'+
			'<p>Head down the hallway, and then turn right towards the escalator.</p>'+
			'</div>'+
			'</div>';

			wCheck1StdSrvWindow = new google.maps.InfoWindow({
				content: wCheck1StdSrvContent
			});
			
			//West Flightpath
			pathLevel1StdSrvWestCoords = [
			  wEntranceStdSrvCoords,
				wCheck1StdSrvCoords,
				{lat:51.064585, lng:-114.089424},
				{lat:51.064439, lng:-114.089424}
			];
			
       		pathLevel1StdSrvWest = new google.maps.Polyline({
			  path: pathLevel1StdSrvWestCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1StdSrvWest);
			
			
		//North
		//South
		//West
			
			//Checkpoint Marker: Escalator
			escalator1StdSrvCoords = {lat:51.064439, lng:-114.089424};
			
			escalator1StdSrv = new google.maps.Marker({ 
				position: escalator1StdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Escalator',
				icon: 'assets/images/maps_icons/escalator_small.png'
			});
			markers.push(escalator1StdSrv);
			escalator1StdSrv.setMap(null);
			
			//Info window	
			//button 
			escalator1StdSrv.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(escalator1StdSrvCoords);
				//current position toggle
				nEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				eEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				wEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				wCheck1StdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1StdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1StdSrv.setIcon('assets/images/maps_icons/current_position_small.png')
				sEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				//infowindow toggle
				escalator1StdSrvWindow.open(map, escalator1StdSrv);
				wCheck1StdSrvWindow.close(map, wCheck1StdSrv);
				sCheck1StdSrvWindow.close(map, sCheck1StdSrv);
				wEntranceStdSrvWindow.close(map, wEntranceStdSrv);
				eEntranceStdSrvWindow.close(map, eEntranceStdSrv);
				nEntranceStdSrvWindow.close(map, nEntranceStdSrv);
				sEntranceStdSrvWindow.close(map, sEntranceStdSrv);
				
			});
			//content
			var escalator1StdSrvContent = '<div class="content">'+
			'<h1>Escalator</h1>'+
			'<div>'+
			'<img src="assets/images/escalator_1.jpg" >'+
			'<p>Take the escalator to the 2nd floor. Please change to floor level 2.</p>'+
			'</div>'+
			'</div>';
			//init info window
			escalator1StdSrvWindow = new google.maps.InfoWindow({
				content: escalator1StdSrvContent
			});
			
			//Level 1 flightpath
			pathLevel1StdSrvCoords = [
			  {lat:51.064390, lng:-114.088590},
			  {lat:51.064390, lng:-114.089326},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1StdSrv = new google.maps.Polyline({
			  path: pathLevel1StdSrvCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1StdSrv);
			pathLevel1StdSrv.setMap(null);
			
			//Checkpoint Marker: Secondary South Entrance 
			
			var sCheck1StdSrvCoords =   {lat:51.064225, lng:-114.089470};

			sCheck1StdSrv = new google.maps.Marker({ 
				position: sCheck1StdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Secondary Entrance',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sCheck1StdSrv);
			sCheck1StdSrv.setMap(null);
			
			//events	
			sCheck1StdSrv.addListener('click',function(){
				//map orientation
				map.setZoom(18.5);
				map.panTo(sCheck1StdSrvCoords);
				//current position toggle
				
				sEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				sCheck1StdSrv.setIcon('assets/images/maps_icons/current_position_small.png');
				escalator1StdSrv.setIcon('assets/images/maps_icons/escalator_small.png');
				//infowindow toggle
				sCheck1StdSrvWindow.open(map, sCheck1StdSrv);
				sEntranceStdSrvWindow.close(map, sEntranceStdSrv);
				escalator1StdSrvWindow.close(map, escalator1StdSrv);
				
			});
			var sCheck1StdSrvContent = '<div class="content">'+
			'<h1>Secondary Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_door.jpg">'+
			'<p>Through these doors you will enter Study Hall. Exit Study Hall and continue to follow the path towards the escalator.</p>'+
			'</div>'+
			'</div>';

			sCheck1StdSrvWindow = new google.maps.InfoWindow({
				content: sCheck1StdSrvContent
			});
			
			//Entrance Marker: North 
			nEntranceStdSrvCoords = {lat:51.064865, lng:-114.089270};
			
			nEntranceStdSrv = new google.maps.Marker({ 
				position: nEntranceStdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(nEntranceStdSrv);
			nEntranceStdSrv.setMap(null);
			
			//Marker Events	
			nEntranceStdSrv.addListener('click',function(){
				escalator1StdSrv.setMap(map);
				escalator1StdSrv.setAnimation( google.maps.Animation.BOUNCE );
				
				map.setZoom(18.5);
				map.panTo(nEntranceStdSrvCoords);
				
				nEntranceStdSrv.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1StdSrv.setIcon('assets/images/maps_icons/escalator_small.png');
				
				nEntranceStdSrvWindow.open(map, nEntranceStdSrv);
				eEntranceStdSrvWindow.close(map, eEntranceStdSrv);
				escalator1StdSrvWindow.close(map, escalator1StdSrv);
				
				pathLevel1StdSrvNorth.setMap(map);
				//pathLevel1StdSrvEast.setMap(null);
			});
			
			var nEntranceStdSrvContent = '<div class="content">'+
			'<h1>North Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/north_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed towards the escalator.</p>'+
			'</div>'+
			'</div>';
			
			nEntranceStdSrvWindow = new google.maps.InfoWindow({
				content: nEntranceStdSrvContent
			});

			//Level 1 flightpath: from North Entrance
			pathLevel1StdSrvNorthCoords = [
			  {lat:51.064865, lng:-114.089270},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1StdSrvNorth = new google.maps.Polyline({
			  path: pathLevel1StdSrvNorthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1StdSrvNorth);
			
			//Entrance Marker: South 
			sEntranceStdSrvCoords = {lat:51.064065, lng:-114.089265};
			
			sEntranceStdSrv = new google.maps.Marker({ 
				position: sEntranceStdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Current Location',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(sEntranceStdSrv);
			sEntranceStdSrv.setMap(null);
			
			//Marker Events	
			sEntranceStdSrv.addListener('click',function(){
				escalator1StdSrv.setMap(map);
				escalator1StdSrv.setAnimation( google.maps.Animation.BOUNCE );
				sCheck1StdSrv.setMap(map);
				sCheck1StdSrv.setAnimation( google.maps.Animation.BOUNCE );
				
				map.setZoom(18.5);
				map.panTo(sEntranceStdSrvCoords);
				
				sEntranceStdSrv.setIcon('assets/images/maps_icons/current_position_small.png');
				eEntranceStdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				escalator1StdSrv.setIcon('assets/images/maps_icons/escalator_small.png');
				sCheck1StdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				
				sEntranceStdSrvWindow.open(map, sEntranceStdSrv);
				eEntranceStdSrvWindow.close(map, eEntranceStdSrv);
				escalator1StdSrvWindow.close(map, escalator1StdSrv);
				sCheck1StdSrvWindow.close(map, sCheck1StdSrv);
				
				pathLevel1StdSrvSouth.setMap(map);
				pathLevel1StdSrv.setMap(null);
				pathLevel1StdSrvNorth.setMap(null);
				pathLevel1StdSrvWest.setMap(null);
			});
			
			var sEntranceStdSrvContent = '<div class="content">'+
			'<h1>South Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/south_entrance.jpg">'+
			'<p>Welcome to SAIT! Proceed through the doors on your left.</p>'+
			'</div>'+
			'</div>';
			
			sEntranceStdSrvWindow = new google.maps.InfoWindow({
				content: sEntranceStdSrvContent
			});
			
			//Level 1 flightpath: from South Entrance
			pathLevel1StdSrvSouthCoords = [
				sEntranceStdSrvCoords,
				{lat:51.064175, lng:-114.089265},
			  {lat:51.064225, lng:-114.089470},
				 {lat:51.064323, lng:-114.089470},
				{lat:51.064323, lng:-114.089568},
				{lat:51.064380, lng:-114.089568},
			  {lat:51.064439, lng:-114.089424}
			];
       		pathLevel1StdSrvSouth = new google.maps.Polyline({
			  path: pathLevel1StdSrvSouthCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel1StdSrvSouth);
			
		}
		
		level1Map();
		
		//LEVEL 2 MAP MARKERS	

		function level2Map(){
			//destinationStdSrv Marker
			 destinationStdSrv = new google.maps.Marker({ 
				position: beacon, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Student Services',
				icon: 'assets/images/maps_icons/destination_small.png'
			});
			markers.push(destinationStdSrv);
			
			
			//Info window	
			//button 
			destinationStdSrv.addListener('click',function(){
				escalator2StdSrv.setIcon('assets/images/maps_icons/escalator_small.png');
				heritage.setIcon('assets/images/maps_icons/entrance_small.png');
				
				destinationStdSrvWindow.open(map, destinationStdSrv);
				heritageWindow.close(map, heritage);
				escalator2StdSrvWindow.close(map, escalator2StdSrv);
			});
		
			//content
			var destinationStdSrvContent = '<div class="content">'+
			'<h1>Student Services</h1>'+
			'<div>'+
			'<img src="assets/images/student_services.jpg">'+
			'<p>Destination. Thank you for using Wayfinder.</p>'+
			'</div>'+
			'</div>';
			//init info window
			destinationStdSrvWindow = new google.maps.InfoWindow({
				content: destinationStdSrvContent
			});
			
			//Checkpoint Marker: Escalator Level 2
			var escalator2StdSrvCoords = {lat:51.064535, lng:-114.089460};
			
			escalator2StdSrv = new google.maps.Marker({ 
				position: escalator2StdSrvCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'Escalator 2',
				icon: 'assets/images/maps_icons/escalator_small.png'
			});
			markers.push(escalator2StdSrv);
			
			//Info window	
			//button 
			escalator2StdSrv.addListener('click',function(){
				escalator2StdSrv.setIcon('assets/images/maps_icons/current_position_small.png');
				heritage.setIcon('assets/images/maps_icons/entrance_small.png');
				
				pathLevel2StdSrv.setMap(map);
				
				escalator2StdSrvWindow.open(map, escalator2StdSrv);
				destinationStdSrvWindow.close(map, destinationStdSrv);
				heritageWindow.close(map, heritage);
				
			});
			markers.push(escalator2StdSrv);
			
			//content
			var escalator2StdSrvContent = '<div class="content">'+
			'<h1>Escalator</h1>'+
			'<div>'+
			'<img src="assets/images/level_2.jpg">'+
			'<p>Cross the bridge and then turn right.</p>'+
			'</div>'+
			'</div>';
			//init info window
			escalator2StdSrvWindow = new google.maps.InfoWindow({
				content: escalator2StdSrvContent
			});
			
			
			//Checkpoint Marker: Heritage
			var heritageCoords = {lat:51.064340, lng:-114.089122};
			
			heritage = new google.maps.Marker({ 
				position: heritageCoords, 
				map: map,
				animation: google.maps.Animation.BOUNCE,
				title: 'heritage',
				icon: 'assets/images/maps_icons/entrance_small.png'
			});
			markers.push(heritage);
			
			//Info window	
			//button 
			heritage.addListener('click',function(){
				
				escalator2StdSrv.setIcon('assets/images/maps_icons/entrance_small.png');
				heritage.setIcon('assets/images/maps_icons/current_position_small.png');
				
				heritageWindow.open(map, heritage);
				destinationStdSrvWindow.close(map, destinationStdSrv);
				escalator2StdSrvWindow.close(map, escalator2StdSrv);
			});
			//content
			var heritageContent = '<div class="content">'+
			'<h1>Heritage Hall Entrance</h1>'+
			'<div>'+
			'<img src="assets/images/heritage.jpg">'+
			'<p>Proceed through the Heritage Hall entrance and you will arrive at your destination.</p>'+
			'</div>'+
			'</div>';
			//init info window
			heritageWindow = new google.maps.InfoWindow({
				content: heritageContent
			});
			
			//Level 2 flightpath
			pathLevel2StdSrvCoords = [
				{lat:51.064578, lng:-114.089424},
				{lat:51.064578, lng:-114.089120},
				{lat:51.064220, lng:-114.089120},
				beacon
			];
       		pathLevel2StdSrv = new google.maps.Polyline({
			  path: pathLevel2StdSrvCoords,
			  geodesic: true,
			  strokeColor: '#FF0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
        	});
			paths.push(pathLevel2StdSrv);
			pathLevel2StdSrv.setMap(null);
		}
	}
}