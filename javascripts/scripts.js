$(function () {
  var mapContainer = document.getElementById('map');
  L.mapbox.accessToken = 'pk.eyJ1IjoianVhbmNnb256YSIsImEiOiJwTzBYblFBIn0.mrChbL1APmRc2iRak665kQ';
  mapContainer.style.height = window.innerHeight + 'px';
  var points = [];
  var minlat, maxlat, minlon, maxlon;

  $.getJSON('./data/vish.json', function (data) {

    getAllPoints(data);
  }).done(function () {
    drawMap();
  }).fail(function (error) {
    $('body').append(error.responseText);
  });

  function drawMap () {
    var canvasTiles = L.tileLayer.canvas();

    var map = L.mapbox.map('map', 'juancgonza.89abf372').setView([19.1562, 72.7631], 11);

    L.canvasOverlay().drawing(drawPoints).addTo(map);
  }

  function getAllPoints (data) {
    for ( var i = 0; i < Object.keys(data.tracks).length; i++ ) {
      for ( var j = 0; j < Object.keys(data.tracks[i].points).length; j++ ) {
        var lat = data.tracks[i].points[j].lat;
        var lon = data.tracks[i].points[j].lon;

        points.push([lat, lon]);
      }
    }
  }

  function drawPoints (canvasOverlay, params) {
    var ctx = params.canvas.getContext('2d');
    ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
    ctx.fillStyle = 'rgba(255, 116, 0, 0.2)';
    ctx.beginPath();
    points.map(function (d, i) {
      dot = canvasOverlay._map.latLngToContainerPoint( [d[0], d[1]] );
      ctx.lineTo(dot.x, dot.y);
    });
    ctx.stroke();
  }

});