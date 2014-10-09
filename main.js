    function toggleCustomers(nameOfPresenter){
	    praes.removeFrom(map);
	    /*L.geoJson(data_customers, {
        	onEachFeature: createCustomers(nameOfPresenter)
        }).addTo(customers);*/
    }

function init() {
	console.log("Begin");
	var	sw = L.latLng(45.4601306, 5.009765),
		ne = L.latLng(55.3291444, 17.666015);	
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
    

    
	function createCustomerPopup(feature, layer){
        var popupContent = '<b>' + feature.properties.name +
            '</b>';
        layer.bindPopup(popupContent);    
	}
		
    function createPraesPopup(feature, layer){
        var popupContent = '<b>' + feature.properties.name +
            '</b><br>Durchschnittsumsatz: € ' + feature.properties.umsatz + ',- pro Monat <br>' + 
            '<button type="button" value="" onclick="toggleCustomers(feature.properties.name)">Kunden zeigen</button>';
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

    L.control.layers({}, topLayers).addTo(map);

}