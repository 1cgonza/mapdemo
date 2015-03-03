$(function () {
  var file = 'Mumbai.GPX';
  $.ajax({
    url: './data/' + file,
    dataType: 'xml'
  }).done( function (rawData) {
    var minlat = $(rawData).find('metadata').find('bounds').attr('minlat');
    var maxlat = $(rawData).find('metadata').find('bounds').attr('maxlat');
    var minlon = $(rawData).find('metadata').find('bounds').attr('minlon');
    var maxlon = $(rawData).find('metadata').find('bounds').attr('maxlon');
    var wpts   = $(rawData).find('wpt');
    var trks   = $(rawData).find('trk');
    var tracksCounter = 0;

    var parsedData = {
      metadata: { minlat: minlat, maxlat: maxlat, minlon: minlon, maxlon: maxlon },
      tracks: {}
    };

    if (wpts && wpts.length > 0) {

      $(wpts).each(function () {
        var name = $(this).find('name').html();

        parsedData.tracks[tracksCounter] = { name: name, points: {} };
        extractPointData( $(this) );
        tracksCounter++;
      });

    }

    if (trks && trks.length > 0) {
      $(trks).each(function (key, value) {
        var name = $(this).find('name').html();

        parsedData.tracks[tracksCounter] = { name: name, points: {} };
        extractPointData( $(this).find('trkpt') );
        tracksCounter++;
      });
    }

    // console.save(parsedData, 'data.json');
    // console.log(parsedData);


    function extractPointData (data) {
      $(data).each(function (key, value) {
        var lat       = value.getAttribute('lat')  ? value.getAttribute('lat') : null;
        var lon       = value.getAttribute('lon')  ? value.getAttribute('lon') : null;
        var elevation = value.getAttribute('ele')  ? value.getAttribute('ele').innerHTML : null;
        var time      = value.getAttribute('time') ? value.getAttribute('time').innerHTML : null;

        parsedData.tracks[tracksCounter].points[key] = { lat: lat, lon: lon, elevation: elevation, time: time };
      });
    }

  });
});

(function(console){
  console.save = function(data, filename) {
    if(!data) {
      console.error('Console.save: No data');
      return;
    }

    if(!filename) filename = 'console.json';

    if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };
})(console);