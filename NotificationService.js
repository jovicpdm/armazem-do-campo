const sendSingleDeviceNotification = (data) => {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "key=AAAAX_XMKkA:APA91bF11KTrttscOGnZ3Fn3MRJWz6oM8xuUMXRkoQ_dU7I3GlPY9W7cIu3zp90jKXHNnFpwbGN_kYtb-dTHLFzlQd61xum6sIF0AEf-mamXYCUdtiRjCRmSoWmx4Dm0Z0VXGBW2Y9AI");

var raw = JSON.stringify({
  "data": {},
  "notification": {
    "body": data.body,
    "title": data.title
  },
  "to": data.token
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

export default {
     sendSingleDeviceNotification
}