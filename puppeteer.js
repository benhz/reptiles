const replitesA = require('./AAAA/a');
const eventUtil = require('./utils/common');
const isOnline = require('is-online');
const { Signale } = require('signale');
const log = new Signale(log_options);

(async () => {
    for (; ;) {
        if (await isOnline()) {
            try {
                await replitesA();
            }
            catch (e) {
                throw e;
            } finally {

            }
        } else {
            log('not internet!!!');
            setTimeout(3600);
        }
    }
})();