gaoDeApi = "https://restapi.amap.com/v3/geocode/geo?address=" + encodeURI("江苏乌巾荡湿地公园") + "&output=json&key=db4ca615f4ca4a94d30d9fcd9095d6ff"

// const axios = require('axios');

// axios({
//     method: 'get',
//     url: gaoDeApi,
//     responseType: 'stream'
// })
//     .then(function (result) {
//         console.log(result)
//     });


// var http = require('http');

// //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
// var options = {
//     host: 'restapi.amap.com',
//     path: "/v3/geocode/geo?address=" + encodeURI("江苏乌巾荡湿地公园") + "&output=json&key=0d64965c2afa65a523bc2b1ef32bb669"
// };

// callback = function (response) {
//     var str = '';

//     //another chunk of data has been received, so append it to `str`
//     response.on('data', function (chunk) {
//         str += chunk;
//     });

//     //the whole response has been received, so we just print it out here
//     response.on('end', function () {
//         console.log(str);
//     });
// }

// http.request(options, callback).end();

const axios = require('axios');

axios.get(gaoDeApi)
    .then(function (response) {
        // handle success
        administrative.country = response.data.geocodes[0].country
        administrative.province = response.data.geocodes[0].province
        administrative.city = response.data.geocodes[0].city
        administrative.district = response.data.geocodes[0].district
        administrative.formatted_address = response.data.geocodes[0].formatted_address
        let location = response.data.geocodes[0].location.split(",")
        administrative.location.longitude = location[0]
        administrative.location.latitude = location[1]
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });


administrative = {
    country: '',
    province: '',
    city: '',
    district: '',
    formatted_address: '',
    location: {
        longitude: '',
        latitude: ''
    }
}

