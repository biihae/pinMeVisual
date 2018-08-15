var ahp;
function Login() {
    var username = $('#username').val(),
        password = $('#password').val();

    $.ajax({
        url: 'http://35.240.243.203/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'username': username,
            'password': password
        }),
        success: function (response) {
            if (response.login_status == 'success' && response.statusUser == 'admin') {

                window.location.replace('admin.html');

            }
            else if (response.login_status == 'success' && response.statusUser == 'user') {
                window.location.replace('user.html');
            }
            else {
                alert('Failed');
            }
        }

    });

}

function Selesai() {
    window.location.replace('index.html');
}

function SavesAhp() {
    var nilai = [];
    for (var i = 1; i <= 33; i++) {
        nilai.push($('#nilai' + i).val());
    }
    console.log(nilai)
    $.ajax({
        url: 'http://35.240.243.203/savesAhp',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'nilai': nilai
        }),
        success: function (response) {
            console.log(response)
            if (response == 'success') {
                alert('success');
            }
        }, error: function (err) {
            console.log(err);
        }

    });
}

function Register() {
    var nameregist = $('#nameregist').val(),
        passwordregist = $('#passwordregist').val();

    $.ajax({
        url: 'http://35.240.243.203/register',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'nameregist': nameregist,
            'passwordregist': passwordregist
        }),
        success: function (response) {
            console.log(response)
            if (response.register_status == 'success') {
                alert('Success next to login');
            }
            else {
                alert('Failed');
            }
        }
    });
}

function CekAhp() {
    $.ajax({
        url: 'http://35.240.243.203/cekAhp',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(),
        success: function (response) {
            if (response.cek_status == 'success') {
                ahp = 'found';
            }
            else {
                ahp = 'notFound';
            }
        }
    });
}

function CekData() {

    $.ajax({
        url: 'http://35.240.243.203/cekData',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response.pasfes);
            $('#nilai1').val(response.pasfes.penduduk);
            $('#nilai2').val(response.pancoran.penduduk);
            $('#nilai3').val(response.blok_m.penduduk);
            $('#nilai4').val(response.pasfes.kk);
            $('#nilai5').val(response.pancoran.kk);
            $('#nilai6').val(response.blok_m.kk);
            $('#nilai7').val(response.pasfes.desa);
            $('#nilai8').val(response.pancoran.desa);
            $('#nilai9').val(response.blok_m.desa);
            $('#nilai10').val(response.pasfes.gedung);
            $('#nilai11').val(response.pancoran.gedung);
            $('#nilai12').val(response.blok_m.gedung);
            $('#nilai13').val(response.pasfes.bus);
            $('#nilai14').val(response.pancoran.bus);
            $('#nilai15').val(response.blok_m.bus);
            $('#nilai16').val(response.pasfes.rumah);
            $('#nilai17').val(response.pancoran.rumah);
            $('#nilai18').val(response.blok_m.rumah);
            $('#nilai19').val(response.pasfes.pemerintah);
            $('#nilai20').val(response.pancoran.pemerintah);
            $('#nilai21').val(response.blok_m.pemerintah);
            $('#nilai22').val(response.pasfes.pendidikan);
            $('#nilai23').val(response.pancoran.pendidikan);
            $('#nilai24').val(response.blok_m.pendidikan);
            $('#nilai25').val(response.pasfes.komersil);
            $('#nilai26').val(response.pancoran.komersil);
            $('#nilai27').val(response.blok_m.komersil);
            $('#nilai28').val(response.pasfes.rekreasi);
            $('#nilai29').val(response.pancoran.rekreasi);
            $('#nilai30').val(response.blok_m.rekreasi);
            $('#nilai31').val(response.pasfes.kompetitor);
            $('#nilai32').val(response.pancoran.kompetitor);
            $('#nilai33').val(response.blok_m.kompetitor);

        }
    });

}

function BuatBaru() {
    for (var i = 1; i <= 33; i++) {
        $('#nilai' + i).val('0');
    }
}

function calculateAhp() {
    var bobot = [];
    if (ahp == 'found') {


        console.log($('#bobot1').val())
        for (var i = 1; i <= 54; i++) {
            bobot.push($('#bobot' + i).val())
        }
        console.log(bobot);

        $.ajax({
            url: 'http://35.240.243.203/api/ahp',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(
                {
                    'bobot': bobot
                }),
            success: function (response) {
                ahpResult(response)
                console.log(response.rankedScoreMap)
                initMap();
                $('#result').css('display', 'block')
                $('.agileits-map').show();
                alert('ahp found and ready to use')
            },
            error: function (error) {
                console.log(error);
                console.log('err');
            }
        });
    } else {
        alert('ahp not available ask your admin');
    }

}

function ahpResult(response) {
    $('#resultPasfes').text(response.rankedScoreMap.pasfes.toFixed(2) * 100 + " % ");
    $('#resultPancoran').text(response.rankedScoreMap.pancoran.toFixed(2) * 100 + " % ");
    $('#resultBlokM').text(response.rankedScoreMap.blok_m.toFixed(2) * 100 + " % ");
}

function demografiClick(type) {

    if (type == "demo") {
        $('#legendDemo').show();
        initMapDemo();
    }
    if (type == "reta")
        initMapReta();
    if (type == "poi") {
        $('#legend').show();
        initMapPoi();
    }
    if (type == "komp")
        initMapKom();

    $('.agileits-map').show();

}

var markerArr = [];

var dataLegentDemo = true;
function initMapDemo() {
    mapdemo = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.2220271, lng: 106.8267826 },
        zoom: 12,
        styles: [
            {
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]

    });
    var iconsDemo = {
        tebet: {
            name: 'Tebet',
            icon: {
                fillColor: 'red',
                strokeWeight: 1
            }
        },
        menteng: {
            name: 'Menteng',
            icon: {
                fillColor: 'blue',
                strokeWeight: 1
            }
        },
        tanahAbang: {
            name: 'Tanah Abang',
            icon: {
                fillColor: 'green',
                strokeWeight: 1
            }
        },
        kebayoranLama: {
            name: 'Kebayoran Lama',
            icon: {
                fillColor: 'yellow',
                strokeWeight: 1
            }
        },
        setiabudi: {
            name: 'Setia Budi',
            icon: {
                fillColor: 'orange',
                strokeWeight: 1
            }
        },
        pancoran: {
            name: 'Pancoran',
            icon: {
                fillColor: 'violet',
                strokeWeight: 1
            }
        },
        pasarMinggu: {
            name: 'Pasar Minggu',
            icon: {
                fillColor: 'brown',
                strokeWeight: 1
            }
        },
        kebayoranBaru: {
            name: 'Kebayoran Baru',
            icon: {
                fillColor: 'gray',
                strokeWeight: 1
            }
        },
        mampangPrapatan: {
            name: 'Mampang Prapatan',
            icon: {
                fillColor: 'turquoise',
                strokeWeight: 1
            }
        },
        kramatJati: {
            name: 'Kramat Jati',
            icon: {
                fillColor: 'lime',
                strokeWeight: 1
            }
        }
    };

    var legendDemo = document.createElement('legendDemo')
    // if (dataLegentDemo == true) {
    var header = document.createElement('h3');
    var node = document.createTextNode("Legend");
    header.appendChild(node);
    legendDemo.appendChild(header);

    for (var key in iconsDemo) {
        var type = iconsDemo[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '" style="background-color: ' + icon.fillColor + '"> ' + name;
        legendDemo.appendChild(div);
    }
    legendDemo.style.backgroundColor = "white";

    mapdemo.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDemo);

    mapdemo.data.loadGeoJson(
        '../geojson/lokasibuffer2km_pop.geojson'
    );

    var InfoWindowMapDemo;
    mapdemo.data.addListener('click', function (event) {
        clearMarkers();
        var kecamatan = event.feature.getProperty('KECAMATAN')
        var markerMapDemo = new google.maps.Marker({
            map: mapdemo, position: event.latLng
        });
        InfoWindowMapDemo = new google.maps.InfoWindow({
            content: "Jumlah Penduduk : " + event.feature.getProperty('Jml_Pend') + " , " + event.feature.getProperty('KECAMATAN') + " " + event.feature.getProperty('Desa_1')
        });
        InfoWindowMapDemo.open(mapdemo, markerMapDemo)
        markerArr.push(markerMapDemo);

    });

    mapdemo.data.setStyle(function (feature) {
        var kecamatan = feature.getProperty('KECAMATAN')
        var color;
        if (kecamatan == 'Tebet') {
            color = 'red';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Menteng") {
            color = 'blue';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Tanah Abang") {
            color = 'green';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Kebayoran Lama") {
            color = 'yellow';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Setia Budi") {
            color = 'orange';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Pancoran") {
            color = 'violet';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Pasar Minggu") {
            color = 'brown';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Kebayoran Baru") {
            color = 'gray';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }

        if (kecamatan == "Mampang Prapatan") {
            color = 'TURQUOISE';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }
        if (kecamatan == "Kramat Jati") {
            color = 'lime';
            return {
                fillColor: color,
                strokeWeight: 1
            }
        }


    });

}

function setMapOnAll(map) {
    for (var i = 0; i < markerArr.length; i++) {
        markerArr[i].setMap(map);
    }
    for (var i = 0; i < markerArrayPoi.length; i++) {
        markerArrayPoi[i].setMap(map);
    }
    for (var i = 0; i < markerArrayReta.length; i++) {
        markerArrayReta[i].setMap(map);
    }
    for (var i = 0; i < markerArrayKomp.length; i++) {
        markerArrayKomp[i].setMap(map);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}

var markerArrayPoi = [];
function initMapPoi() {
    mapoi = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.2220271, lng: 106.8267826 },
        zoom: 12,
        styles: [
            {
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]

    });
    var iconsPoi = {
        perumahan: {
            name: 'Perumahan',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'red'
            }
        },
        pemerintahan: {
            name: 'Pemerintahan',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'blue'
            }
        },
        pendidikan: {
            name: 'Pendidikan',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'green'
            }
        },
        komersil: {
            name: 'Komersil',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'yellow'
            }
        },
        tempatrekreasi: {
            name: 'Tempat Rekreasi',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'orange'
            }
        }
    };

    var legendPoi = document.createElement('legendPoi')

    var header = document.createElement('h3');
    var node = document.createTextNode("Legend");
    header.appendChild(node);
    legendPoi.appendChild(header);

    for (var key in iconsPoi) {
        var type = iconsPoi[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '" style="background-color: ' + icon.strokeColor + '"> ' + name;
        legendPoi.appendChild(div);
    }
    legendPoi.style.backgroundColor = "white";

    mapoi.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendPoi);

    mapoi.data.loadGeoJson(
        '../geojson/poi.geojson'
    );

    var InfoWindowMapPOI;
    mapoi.data.addListener('click', function (event) {
        clearMarkers()

        var markerMapPOI = new google.maps.Marker({
            map: mapoi, position: event.latLng
        });
        InfoWindowMapPOI = new google.maps.InfoWindow({
            content: event.feature.getProperty('nama')
        });
        InfoWindowMapPOI.open(mapoi, markerMapPOI);
        markerArrayPoi.push(markerMapPOI);

    });

    mapoi.data.setStyle(function (feature) {

        var kategori = feature.getProperty('kategori')
        var color;
        if (kategori == 'perumahan') {
            color = 'red';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == "pemerintahan") {
            color = 'blue';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == "pendidikan") {
            color = 'green';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == "komersil") {
            color = 'yellow';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == "tempat rekreasi") {
            color = 'orange';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
    });

}

var markerArrayKomp = [];
function initMapKom() {
    mapkomp = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.2220271, lng: 106.8267826 },
        zoom: 12,
        styles: [
            {
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]

    });
    mapkomp.data.loadGeoJson(
        '../geojson/KompetitorBaru.geojson'
    );
    var InfoWindowMapKomp;
    mapkomp.data.addListener('click', function (event) {
        clearMarkers()

        var markerMapKomp = new google.maps.Marker({
            map: mapkomp, position: event.latLng
        });
        InfoWindowMapKomp = new google.maps.InfoWindow({
            content: event.feature.getProperty('nama')
        });
        InfoWindowMapKomp.open(mapkomp, markerMapKomp)
        markerArrayKomp.push(markerMapKomp);

    });

    mapkomp.data.setStyle(function (feature) {
        var kategori = feature.getProperty('type');
        var color;
        if (kategori == 'cafe') {
            color = 'red';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == "restaurant") {
            color = 'blue';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == "meal_delivery") {
            color = 'orange';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == "bakery") {
            color = 'green';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        else {
            color = 'violet';
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };

        }
    });

    var iconsKomp = {
        cafe: {
            name: 'Cafe',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'red'
            }
        },
        restaurant: {
            name: 'Restaurant',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'blue'
            }
        },
        meal_delivery: {
            name: 'Meal Delivery',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'orange'
            }
        },

        bar: {
            name: 'Bar',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'violet'
            }
        }
    };

    var legendKomp = document.createElement('legendKomp')

    var header = document.createElement('h3');
    var node = document.createTextNode("Legend");
    header.appendChild(node);
    legendKomp.appendChild(header);

    for (var key in iconsKomp) {
        var type = iconsKomp[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '" style="background-color: ' + icon.strokeColor + '"> ' + name;
        legendKomp.appendChild(div);
    }
    legendKomp.style.backgroundColor = "white";

    mapkomp.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendKomp);
    mapkomp.data.loadGeoJson(
        '../geojson/LokasiBuffer_2km_2.geojson'
    );

}

var markerArrayReta = [];
function initMapReta() {
    mapreta = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.2220271, lng: 106.8267826 },
        zoom: 12,
        styles: [
            {
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]

    });

    var iconsReta = {
        bus: {
            name: 'Terminal Bus',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'blue'
            }
        },
        kereta: {
            name: 'Stasiun Kereta',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'yellow'
            }
        },
        gedung: {
            name: 'Gedung Kosong',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: 'red'
            }
        }
    };

    var legendReta = document.createElement('legendReta')

    var header = document.createElement('h3');
    var node = document.createTextNode("Legend");
    header.appendChild(node);
    legendReta.appendChild(header);

    for (var key in iconsReta) {
        var type = iconsReta[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '" style="background-color: ' + icon.strokeColor + '"> ' + name;
        legendReta.appendChild(div);
    }
    legendReta.style.backgroundColor = "white";

    mapreta.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendReta);

    var InfoWindowMapReta;
    mapreta.data.addListener('click', function (event) {
        clearMarkers();

        var markerMapReta = new google.maps.Marker({
            map: mapreta, position: event.latLng
        });
        InfoWindowMapReta = new google.maps.InfoWindow({
            content: event.feature.getProperty('nama')
        });
        InfoWindowMapReta.open(mapreta, markerMapReta)
        markerArrayReta.push(markerMapReta);

    });

    mapreta.data.loadGeoJson(
        '../geojson/Akses.geojson',
    );
    mapreta.data.setStyle(function (feature) {
        var kategori = feature.getProperty('type')
        var color;
        if (kategori == 'bus_station') {
            color = 'blue'
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        if (kategori == 'train_station') {
            color = 'yellow'
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
        else {
            color = "red"
            return {
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: color
                },
            };
        }
    });

    mapreta.data.loadGeoJson(
        '../geojson/listruko.geojson',
    );

    mapreta.data.loadGeoJson(
        '../geojson/LokasiBuffer_2km_2.geojson',
    );
}

var map;
var lokasi = {
    pasfes: {
        center: { lat: -6.2209664, lng: 106.8244889 },
    },
    pancoran: {
        center: { lat: -6.2431391, lng: 106.8413121 },
    },
    blokM: {
        center: { lat: -6.243295, lng: 106.7998573 },
    }

}

function initMap() {
    map = new google.maps.Map(document.getElementById('maps'), {
        center: { lat: -6.2220271, lng: 106.8267826 },
        zoom: 12,
        styles: [
            {
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]
    });


    var marker = [];
    var i = 0;

    var numberic = 0;
    var max = 0;
    var pasfesValue = $('#resultPasfes').text()
    var pancoranValue = $('#resultPancoran').text()
    var blockMValue = $('#resultBlokM').text()
    if (pasfesValue > pancoranValue) {
        max = pasfesValue;
    } else {
        max = pancoranValue;
    }
    if (blockMValue > max) {
        max = blockMValue;
    }

    for (var lok in lokasi) {
        marker[i] = new google.maps.Marker({
            position: lokasi[lok].center,
            map: map
        });
        var valueAhp;
        if (lok == "pasfes") {
            numberic = $('#resultPasfes').text();
            valueAhp = "Paspes : " + numberic;
            var cityCircle = new google.maps.Circle({
                strokeColor: '#F5862C',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#FA9C9C',
                fillOpacity: 0.35,
                map: map,
                center: lokasi[lok].center,
                radius: (2000 * parseInt($('#resultPasfes').text())) / 100
            });

        }
        if (lok == "pancoran") {
            numberic = $('#resultPancoran').text();
            valueAhp = "Pancoran : " + numberic;
            var cityCircle = new google.maps.Circle({
                strokeColor: '#F5862C',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#FA9C9C',
                fillOpacity: 0.35,
                map: map,
                center: lokasi[lok].center,
                radius: (2000 * parseInt($('#resultPancoran').text())) / 100
            });

        }
        if (lok == "blokM") {
            numberic = $('#resultBlokM').text();
            valueAhp = "blokM : " + numberic;
            var cityCircle = new google.maps.Circle({
                strokeColor: '#F5862C',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#FA9C9C',
                fillOpacity: 0.35,
                map: map,
                center: lokasi[lok].center,
                radius: (2000 * parseInt($('#resultBlokM').text())) / 100
            });
        }
        var createStart = ""
        if (max == numberic) {
            createStart = "<img src = 'assets/img/star.png'> ";
        }
        var info = new google.maps.InfoWindow({
            content: createStart + valueAhp,
            close: false
        });
        info.open(map, marker[i]);
        marker[i].addListener('click', function () {
            info.open(map, marker[i]);
        })
        i++;
    }

}


