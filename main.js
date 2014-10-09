function init() {
	var	sw = L.latLng(45.4601306, 5.009765),
		ne = L.latLng(55.3291444, 17.666015),
		cu = document.getElementById("filter-customers"),
		pr = document.getElementById("filter-praese");	
	var area = L.latLngBounds(sw, ne);
	
	var map = L.map('map', {
        fadeAnimation: true,
        inertia: true,
        detectRetina: true,
        metric: true
    }).fitBounds(area);

    var mapboxUrl = 'http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
    var mapboxAttr = 'Karte &copy; Mapbox.com, Daten &copy; dekoster GmbH';

    var terrain = L.tileLayer(mapboxUrl, {
        attribution: mapboxAttr,
        maxZoom: 19,
        id: "phipse.jn8f5126"
    });
    map.addLayer(terrain);
    
    var praes = L.geoJson().addTo(map);
    var customers = L.geoJson();
	
	cu.onclick = function(e) {
        pr.className = '';
        this.className = 'active';
        // The setFilter function takes a GeoJSON feature object
        // and returns true to show it or false to hide it.
        /*map.featureLayer.setFilter(function(f) {
            return f.properties['marker-symbol'] === 'fast-food';
        });
        return false;*/
    };

    pr.onclick = function() {
        cu.className = '';
        this.className = 'active';
        /*map.featureLayer.setFilter(function(f) {
            // Returning true for all markers shows everything.
            return true;
        });
        return false;*/
    };
   
	function createCustomerPopup(feature, layer){
        var popupContent = '<b>' + feature.properties.name +
            '</b>';
        layer.bindPopup(popupContent);    
	}		

	var cu_icon = L.icon({
		iconUrl: "cu_marker.png"
	});
	
    function createPraesPopup(feature, layer){
        var popupContent = '<b>' + feature.properties.name +
            '</b><br>Durchschnittsumsatz: € ' + feature.properties.umsatz + ',- pro Monat <br>'/* + 
            '<button type="button" value="" onClick="toggleCustomers()">Kunden zeigen</button>'*/;
        layer.bindPopup(popupContent);
        }

    L.geoJson(data, {
        onEachFeature: createPraesPopup
    }).addTo(praes);
    
	L.geoJson(data_customers, {
        onEachFeature: createCustomerPopup
    }).addTo(customers);
	
     var topLayers = {
        "Präsentatorinnen": praes,
		"Kunden": customers
    };
	
	

    //L.control.layers({}, topLayers).addTo(map);

}