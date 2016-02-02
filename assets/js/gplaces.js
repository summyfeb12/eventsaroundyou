
            function init() {
                var input = document.getElementById('locationTextField');
                var autocomplete = new google.maps.places.Autocomplete(input);
                google.maps.event.addListener(autocomplete, 'place_changed',
                function() {
                var place = autocomplete.getPlace();
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                $("progress").animate({ value: "0" }, 1);    
                events(lat,lng);    
                console.log(lat);
                console.log(lng);    
                }
                                             );
            }
 
            google.maps.event.addDomListener(window, 'load', init);