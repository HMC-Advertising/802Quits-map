
(function($){

      $.ajax({  

      	//https://docs.google.com/spreadsheets/d/1VbQIz1_1HCGmRAjrVlIzHttCTupg1qUi7hhttw9Tays/pubhtml
        url: "https://spreadsheets.google.com/feeds/list/1uTZF62iI-rGeBc_7ss5sdUyPJjseboXkn1ByCo2Eb6E/od6/public/values?alt=json",
        datatype: "jsonp",
        
        error: function (request, status, error) {
         
          	console.log("not working");
        },

        success: function( data ) {
        	 var style = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];

            //var style =[{"elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#f5f5f2"},{"visibility":"on"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#ffffff"},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#71c8d4"}]},{"featureType":"landscape","stylers":[{"color":"#e5e8e7"}]},{"featureType":"poi.park","stylers":[{"color":"#8ba129"}]},{"featureType":"road","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"color":"#c7c7c7"},{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#a0d3d3"}]},{"featureType":"poi.park","stylers":[{"color":"#91b65d"}]},{"featureType":"poi.park","stylers":[{"gamma":1.51}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"}]},{"featureType":"road"},{"featureType":"road"},{},{"featureType":"road.highway"}] ;

   			var mapOptions = {
                center: new google.maps.LatLng(43.8, -72.5623), 
                zoom: 8, 
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
	            zoomControlOptions: {
	                style: google.maps.ZoomControlStyle.LARGE,
	            },
	            disableDoubleClickZoom: true,
	            mapTypeControl: true,
	            mapTypeControlOptions: {
	                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
	            },
	            scaleControl: true,
	            scrollwheel: false,
	            panControl: true,
	            streetViewControl: true,
	            draggable : true,
	            overviewMapControl: true,
	            overviewMapControlOptions: {
	                opened: true,
	            },
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            styles: style

            };
        
            var main_map = new google.maps.Map(document.getElementById("map"),mapOptions);
                 
            var data = data.feed.entry;
            var datainfo = new google.maps.InfoWindow();
                    
            $.each(data, function(i, item){
              	var content = data[i];
             	var latt = parseFloat(content.gsx$latitude.$t);
              	var longg = parseFloat(content.gsx$longitude.$t);
              	var cord = new google.maps.LatLng(latt, longg);

                if(content.gsx$town.$t == "St. Albans"){
                    var c = "<div id='marker"+i+"' style='width:200px;height:300px' class='dataBubble'>";
                        c += "<div style='padding-top: 10px;font-size:20px;line-height: 23px; margin-bottom: 5px;'><strong>"+ content.gsx$nameoftheplace.$t +"</strong></div>";
                        c += "<div style='font-size:15px; margin-bottom:5px'>"+ content.gsx$address.$t + "</div>";
                        c += "<p><strong>"+ content.gsx$nameoftheeventowner.$t +"</strong>" ;
                        
                        c += '<br><a href="tel:' + content.gsx$phonenumber.$t +'">'+ content.gsx$phonenumber.$t +'</a>' ;
                        c += '<br><a href="mailto:' + content.gsx$email.$t + '">' + content.gsx$email.$t + '</a></p>';
                        if(content.gsx$morethanone.$t == "yes"){
                            c +="<p><strong>" + content.gsx$ndname.$t + "</strong>";
                            c += '<br><a href="tel:' + content.gsx$ndphone.$t +'">'+ content.gsx$ndphone.$t +'</a>' ;
                            c += '<br><a href="mailto:' + content.gsx$ndemail.$t + '">' + content.gsx$ndemail.$t + '</a></p>';
                        }
                        c += "</div>";
                }
                else{
                  	var c = "<div id='marker"+i+"' style='width:225px;height:200px' class='dataBubble'>";
                    	c += "<div style='padding-top: 10px;font-size:20px;line-height: 18px; margin-bottom: 5px;'><strong>"+ content.gsx$nameoftheplace.$t +"</strong></div>";
                    	c += "<div style='font-size:15px; margin-bottom:5px'>"+ content.gsx$address.$t + "</div>";
                    	c += "<p><strong>"+ content.gsx$nameoftheeventowner.$t +"</strong>" ;
                    	
                    	c += '<br><a href="tel:' + content.gsx$phonenumber.$t +'">'+ content.gsx$phonenumber.$t +'</a>' ;
                    	c += '<br><a href="mailto:' + content.gsx$email.$t + '">' + content.gsx$email.$t + '</a></p>';
                    	if(content.gsx$morethanone.$t == "yes"){
                    		c +="<p><strong>" + content.gsx$ndname.$t + "</strong>";
                    		c += '<br><a href="tel:' + content.gsx$ndphone.$t +'">'+ content.gsx$ndphone.$t +'</a>' ;
                    		c += '<br><a href="mailto:' + content.gsx$ndemail.$t + '">' + content.gsx$ndemail.$t + '</a></p>';
                    	}
                    	c += "</div>";
                    }
                
                  
                var marker = new google.maps.Marker({
                    icon: "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png",
                    position: cord,
                    map: main_map,
                    title: content.gsx$nameoftheplace.$t
                });

                  
                    
                google.maps.event.addListener(marker, 'click', function() {
                    datainfo.close();
                    var dataBubble = c;
					datainfo.setPosition(marker.position)
					datainfo.setContent(dataBubble);
					datainfo.open(main_map,marker);
                }); // /google.maps
            }); // "/each" 
        } // /success
  	}) // /ajax
    

}(jQuery))