$(function () {
  var file = 'Mumbai.GPX';
  // var file = 'history-02-01-2015.kml';
  $.ajax({
    url: './data/' + file,
    dataType: 'xml'
  }).done( function (data) {
    var wpts    = $(data).find('wpt');
    var trks    = $(data).find('trk');
    var gPoints = data.getElementsByTagNameNS('http://www.google.com/kml/ext/2.2', 'coord');

    var points = [];

    if (wpts && wpts.length > 0) {
      $(wpts).each(function () {
        extractPoints( $(this), 'gpx' );
      });
    }

    if (trks && trks.length > 0) {
      $(trks).each(function (key, value) {
        extractPoints( $(this).find('trkpt'), 'gpx' );
      });
    }

    if (gPoints && gPoints.length > 0) {
      extractPoints(gPoints, 'kml');
    }

    printDataOnScreen(points);

    function extractPoints (chunk, type) {
      var lat, lon;

      if (type === 'gpx') {
        $(chunk).each(function () {
          lat = $(this).attr('lat');
          lon = $(this).attr('lon');
          points.push([lat, lon]);
        });
      } else if (type === 'kml') {
        $(chunk).each(function () {
          var values = $(this).html().split(' ');
          lat = values[1];
          lon = values[0];
          points.push([lat, lon]);
        });
      }
    }

    function printDataOnScreen (array) {
      $('body').append('var points = [');

      for (var i = 0; i < array.length; i++) {
        $('body').append('[' + array[i][0] + ',' + array[i][1] + ']');

        if (i !== array.length - 1) {
          $('body').append(',');
        }
      }

      $('body').append('];');
    }
  });
});
