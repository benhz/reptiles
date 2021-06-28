require('dotenv').config();

module.exports = Object.freeze({
    a: 'http://www.chinataa.org/Scenic_spot_list.aspx?news_t=100&star=*',
    aType: ['3a', '4a', '5a'],
    amapApi: 'https://restapi.amap.com/v3/geocode/geo?output=json&key=' + process.env.amapkey + "&address="
});