const replitesA = require('./AAAA/a');
const eventUtil = require('./utils/common');
const isOnline = require('is-online');
const { Signale } = require('signale');
const log_options = require('./conf/conf').signale_AAAA_options
const log = new Signale(log_options);

(async () => {

    await replitesA();

})();