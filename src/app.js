/**
 * UV INDEX
 *
 */

var UI = require('ui');

var r = [
  {
  risk:'Low',
  bd:'Wear sunglasses on bright days; use sunscreen if there is snow on the ground, which reflects UV radiation, or if you have particularly fair skin.',
  clr:'#55AA00'
},
  {
  risk:'Moderate',
  bd:'Take precautions, such as covering up, if you will be outside. Stay in shade near midday when the sun is strongest.',
  clr:'#FFFF00'
},
  {
  risk:'High',
  bd:'Cover the body with sun protective clothing, use SPF 30+ sunscreen, wear a hat, reduce time in the sun within three hours of solar noon, and wear sunglasses.',
  clr:'#FF5500'
},
  {
  risk:'Very high',
  bd:'Wear SPF 30+ sunscreen, a shirt, sunglasses, and a wide-brimmed hat. Do not stay in the sun for too long.',
  clr:'red'
},
  {
  risk:'Extreme ',
  bd:'Take all precautions: Wear SPF 30+ sunscreen, a long-sleeved shirt and trousers, sunglasses and a very broad hat. Avoid the sun within 3 hours of solar noon',
  clr:'#AA00FF'
}
];

Go();

function showCard(_locationData, _uv){
  var uvData = {};
  if (_uv <= 2.9) {uvData=r[0];}
  else if (_uv <= 2.9) {uvData=r[0];}
  else if (_uv <= 5.9) {uvData=r[1];}
  else if (_uv <= 7.9) {uvData=r[2];}
  else if (_uv <= 10.9) {uvData=r[3];}
  else if (_uv >= 11) {uvData=r[4];}
    
  var titleLocation = _locationData.region_name + ' ' + _locationData.city;  
  if (_locationData.region_name === '' && _locationData.city === ''){    
    titleLocation = _locationData.country_name + ' ' + _locationData.latitude.toString() + ' ' + _locationData.longitude.toString();
  }  
  
  var card = new UI.Card({
  title: titleLocation,
  //icon: 'images/menu_icon.png',
  subtitle: 'UV:' + _uv + ' ' + uvData.risk,
  body: uvData.bd,
  subtitleColor: 'black',
  bodyColor: 'black',
  scrollable: true,
  style:'small',
  action: {
          backgroundColor: uvData.clr,
          up: 'images/action_bar_icon_up.png',
          down: 'images/action_bar_icon_down.png'
          },
  });
  
  card.status(false);
  card.action(true);
  card.show();
}

function errorCard(){
    var card = new UI.Card({
    title: 'Connection issue',
    //icon: 'images/menu_icon.png',
    subtitle: ';(',
    body: 'Check you Internet connection and try again',
    subtitleColor: 'white', // Named colors
    bodyColor: 'white', // Hex colors
    action: {backgroundColor: "#FFAA00"},
    });
    card.status(false);
    card.show();
}

function Go(){
  var ajax = require('ajax');
  console.log("Test");
  ajax({ url: 'http://freegeoip.net/json', type: 'json' },
  function(_locationData) {
    if (!_locationData.ip){return errorCard();}
    var ip = _locationData.ip;    
    ajax({ url: 'http://api.wunderground.com/api/920a1291892ddb0b/conditions/q/autoip.json?geo_ip='+ip, type: 'json' },
    function(data) {
      if (!data.current_observation.UV){return errorCard();}
      showCard(_locationData, data.current_observation.UV);
    },function(error) {
      return errorCard();
    });
  },function(error) {
    return errorCard();
  });
}
