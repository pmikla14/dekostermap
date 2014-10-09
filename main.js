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
    var customers = L.geoJson().addTo(map);
	
	cu.onclick = function(e) {
        pr.className = '';
        this.className = 'active';
        
		L.geoJson(data_customers, {
			onEachFeature: createCustomerPopup
		}).addTo(customers);
		
		customers.addTo(map);
		map.removeLayer(praes);
    };
    
	pr.onclick = function() {
        cu.className = '';
        this.className = 'active';
		
		L.geoJson(data, {
			onEachFeature: createPraesPopup
		}).addTo(praes);
		
		praes.addTo(map);
		map.removeLayer(customers);
    };	

	var cu_icon = L.icon({
		iconUrl: "cu_marker.png",
		iconAnchor: [12.5, 41]
	});

	var pr_icon = L.icon({
		iconUrl: "pr_marker.png",
		iconAnchor: [12.5, 41]
	});
	
    function createPraesPopup(feature, layer){
        var popupContent = '<b>' + feature.properties.name +
            '</b><br>Durchschnittsumsatz: € ' + feature.properties.umsatz + ',- pro Monat <br>'/* + 
            '<button type="button" value="" onClick="toggleCustomers()">Kunden zeigen</button>'*/;
        layer.bindPopup(popupContent);
		layer.setIcon(pr_icon);
    }

    function createCustomerPopup(feature, layer){
        var popupContent = '<b>' + feature.properties.name;
        layer.bindPopup(popupContent);
		layer.setIcon(cu_icon);
    }
}