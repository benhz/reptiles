const replitesA = require('./AAAA/a');
const eventUtil = require('./utils/common');
const isOnline = require('is-online');
const { Signale } = require('signale');
const log = new Signale();

(async () => {
    if (await isOnline()) {
        await replitesA();
    } else {
        log('not internet!!!');
    }
})();