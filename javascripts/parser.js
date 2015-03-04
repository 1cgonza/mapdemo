$(function () {
  var file = 'Mumbai.GPX';
  $.ajax({
    url: './data/' + file,
    dataType: 'xml'
  }).done( function (rawData) {
    var wpts   = $(rawData).find('wpt');
    var trks   = $(rawData).find('trk');
    var points = [];

    if (wpts && wpts.length > 0) {
      $(wpts).each(function () {
        extractPoints( $(this) );
      });
    }

    if (trks && trks.length > 0) {
      $(trks).each(function (key, value) {
        extractPoints( $(this).find('trkpt') );
      });
    }

    printDataOnScreen(points);

    function extractPoints (data) {
      $(data).each(function () {
        var lat = $(this).attr('lat');
        var lon = $(this).attr('lon');

        points.push([lat, lon]);
      });
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
