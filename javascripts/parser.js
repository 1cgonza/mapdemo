$(function () {
  $.ajax({
    url: './data/Mumbai.GPX',
    dataType: 'xml'
  }).done( function (rawData) {
    var minlat = $(rawData).find('metadata').find('bounds').attr('minlat');
    var maxlat = $(rawData).find('metadata').find('bounds').attr('maxlat');
    var minlon = $(rawData).find('metadata').find('bounds').attr('minlon');
    var maxlon = $(rawData).find('metadata').find('bounds').attr('maxlon');

    $('#json-container').append('{"metadata": {"minlat": "' + minlat + '","maxlat": "' + maxlat + '","minlon": "' + minlon + '","maxlon": "' + maxlon + '"},"trks": {');

      getEntries(rawData);

    $('#json-container').append('}');
  });
});

function getEntries (rawData) {

  var trksLength = $(rawData).find("trk").length;

  $(rawData).find("trk").each(function(parentKey, parentValue) {
    var name = $(this).find('name').html().trim();

    $('#json-container').append('"' + parentKey + '": {"name": "' + name + '","points": { ');

    var trkptsLength = $(this).find('trkpt').length;

    $(this).find('trkpt').each(function(key, value) {
      var lat = $(this).attr('lat');
      var lon = $(this).attr('lon');
      var elevation = $(this).find('ele').html();
      var time = $(this).find('time').html();

      $('#json-container').append('"' + key + '": { "lat": "' + lat + '", "lon": "' + lon + '", "elevation": "' + elevation + '", "time": "' + time + '"');

      if (key < trkptsLength - 1) {
        $('#json-container').append('}, ');
      } else {
        $('#json-container').append('} ');
      }

    });

    if (parentKey < trksLength - 1) {
      $('#json-container').append('} }, ');
    } else {
      $('#json-container').append('} } }');
    }

  });
}