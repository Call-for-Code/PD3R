<?php
$before = \App\UserDetail::where('house_status','go')->get();
$after = \App\UserDetail::where('house_status','nogo')->get();

?>
        <!DOCTYPE html>
<html>
<head>
    <title>Full Screen Leaflet Map</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.0/dist/MarkerCluster.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.0/dist/MarkerCluster.Default.css" />
    <script
            src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossorigin="anonymous"></script>

    <style>
        body {
            padding: 0;
            margin: 0;
        }
        html, body, #map {
            height: 100%;
            width: 100%;
        }
        .modal.fade .modal-bottom {
            -webkit-transform: translate(0, 25%);
            -o-transform: translate(0, 25%);
            transform: translate(0, 25%);
        }
        .modal .modal-bottom {
            margin:0;
            margin-top:auto;
            padding: 0;
            position:fixed;
            bottom:0;
            top:auto;
            left:auto;
            right:0;
            height:calc(55% + 160px); /* default height:45% its just for demo*/
        }

        .modal .modal-bottom>.modal-content{

            height:100%;
            border-color: #fff;
            border-radius:0;
            margin:0;

        }
        .modal-bottom .modal-body{height: calc(100% - 140px);overflow-y:auto;}

        @media (min-width: 1px){
            .modal-bottom {max-width: 100%;width:100%;}
        }
        /*Custume scroll bar*/
        .modal-bottom ::-webkit-scrollbar {width:8px}
        .modal-bottom ::-webkit-scrollbar-button {width:8px;height:5px}
        .modal-bottom ::-webkit-scrollbar-thumb:hover {background: #ccc}
        .modal-bottom ::-webkit-scrollbar-thumb {	background:#f1f1f1;border: thin solid white;border-radius: 10px}
        .modal-bottom ::-webkit-scrollbar-track {background: #fff;border:thin solid white}
    </style>
</head>
<body>
<div id="map"></div>



<div class="modal fade" id="myModalBottom" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-bottom">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title " id="modal-title"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body p-4">
                <ul class="list-unstyled">
                    <li class="media">

                        <div class="media-body" id="modal-body">

                        </div>
                    </li>

                </ul>
            </div>

        </div>
    </div>
</div>

<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
<script src="https://unpkg.com/leaflet.markercluster@1.4.0/dist/leaflet.markercluster-src.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>


<script>

    function circleClick(e,head,body) {
        console.log(e);


        $('#modal-title').html(head);
        $('#modal-body').html(body);

        $('#myModalBottom').modal('show');
    }

    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var violetIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    var before = {!! json_encode($before) !!};
    var after = {!! json_encode($after) !!};
    console.log(before);
    console.log(after);
    /*var map = L.map('map').setView([27.700769, 85.300140], 8);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
        }).addTo(map);*/



    var cities = L.layerGroup();

    /*  L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
          L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
          L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
          L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);
  */

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
        streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

    var map = L.map('map', {
        center: [27.700769, 85.300140],
        zoom: 8,
        layers: [streets, cities]
    });

    var baseLayers = {
        "Grayscale": grayscale,
        "Streets": streets
    };

    var overlays = {
        "Cities": cities
    };

    L.control.layers(baseLayers, overlays).addTo(map);






    var markers = L.markerClusterGroup({ chunkedLoading: true });

    var markerList = [];

    //Loop through the markers array
    for (var i=0; i<before.length; i++) {

        var lon = before[i]['long'];
        var lat = before[i]['lat'];

        const head = 'Name:' + before[i]['name']+"<br>"+'Email :'+before[i]['email']+"<br>"+'Mobile Number :'+before[i]['phone_no'];
        const body = "<br/><img src='"+before[i]['photo_1']+"'  width='350px'/><img src='"+before[i]['photo_2']+"'  width='350px'/><img src='"+before[i]['photo_3']+"' width='350px'/><img src='"+before[i]['photo_4']+"'  width='350px'/><img src='"+before[i]['photo_5']+"'  width='350px'/><img src='"+before[i]['photo_6']+"' width='350px'/>";
        var customOptions =
            {
                'maxWidth': '500',
                'float':'bottom',
                'className' : 'custom'
            }


        /* var markerLocation = new L.LatLng(lat, lon);
         var marker = new L.Marker(markerLocation,{icon: greenIcon});*/

        var marker = L.marker(L.latLng(lat, lon), {title:head, icon: greenIcon }).on("click", function(e) {
            circleClick(e, head, body);
        });
        // marker.bindPopup(popupText);
        markerList.push(marker);

    }


    for (var i=0; i<after.length; i++) {
        console.log('i')
        var lon = after[i]['long'];
        var lat = after[i]['lat'];

        const heads = 'Name:' + after[i]['name']+"<br>"+'Email :'+after[i]['email']+"<br>"+'Mobile Number :'+after[i]['phone_no'];


        const bodys = "<br/><img src='"+after[i]['photo_1']+"'  width='350px'/><img src='"+after[i]['photo_2']+"'  width='350px'/><img src='"+after[i]['photo_3']+"' width='350px'/><img src='"+after[i]['photo_4']+"'  width='350px'/><img src='"+after[i]['photo_5']+"'  width='350px'/><img src='"+after[i]['photo_6']+"' width='350px'/>";
        //  var email =  after[i]['email'];


        /* var markerLocation = new L.LatLng(lat, lon);
         var marker = new L.Marker(markerLocation,{icon: greenIcon});*/


        var marker = L.marker(L.latLng(lat, lon), {title:heads, icon: violetIcon }).on("click", function(e) {
            circleClick(e, heads, bodys);

        });
        //marker.bindPopup(customPopup,customOptions);
        markerList.push(marker);


    }
    // console.log(markerList);



    markers.addLayers(markerList);
    map.addLayer(markers);








</script>
</body>
</html>