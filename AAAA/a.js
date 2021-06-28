const aLevelUrl = require('../constants').a;
const aType = require('../constants').aType;
const amapApi = require('../constants').amapApi;
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Signale, await } = require('signale');
const log_options = require('../conf/conf').signale_AAAA_options
const log = new Signale(log_options);
const a_schema = require('../schema/a').a_schema;
const schema = new Schema(a_schema);
const Model = mongoose.model('A', schema);
const axios = require('axios');
require('dotenv').config();

const replitesA = async () => {
    mongoose.connect(process.env.db_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

    //browser
    log.time('A');
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized'],
        defaultViewport: null
    });
    log.info('browser had launch');

    const pages = await browser.pages();
    const page = pages.length === 0 ? await browser.newPage() : pages[0];

    //a replites
    log.info('Crawl all pages');
    for (type of aType) {
        await replitesABody(page, type);
    }

    //close
    await page.close();
    await browser.close();
    log.info('close page, close browser');
    log.benhz('Benhz is good for completing crawl the A');
    log.timeEnd('A');
}

const replitesABody = async (page, aType) => {
    log.start('Start crawling: ' + aType)
    //Aurl
    const Aurl = aLevelUrl.replace('*', aType);
    await page.goto(Aurl);
    log.info('Page jump to: ' + Aurl);

    //page screenshot
    await page.screenshot({
        path: './AAAA/replits_png/' + aType + '.png',
        fullPage: true
    });
    log.info('Screenshot file: ' + aType);

    //Organize tourist attraction information
    let cur;
    let nextPage;
    //Get the total number of pages
    let nextPages = await page.$$('#fy > li');
    const totalPage = await nextPages[nextPages.length - 1].$eval('a', a => a.getAttribute('n'));
    log.info('Total page is ' + totalPage);
    await page.waitForTimeout(1000)
    //Loop record
    do {
        await page.waitForSelector('#fy > li.cur');
        cur = await page.$eval('#fy > li.cur', li => li.firstElementChild.innerHTML)
        nextPage = 1 + parseInt(cur);
        log.info('now page: ' + cur);
        let attractions = await page.$$('#abbd > li');
        for (let index = 1; index < attractions.length; index++) {
            let a = {
                grade: '',
                area: {
                    country: '',
                    province: '',
                    city: '',
                },
                name: '',
                formatted_address: '',
                coordinate: {
                    longitude: '',
                    latitude: ''
                },
                link: ''
            }
            let aLis = await attractions[index].$$('a > i');
            a.grade = aType;
            a.link = await attractions[index].$eval('a', a => a.getAttribute('href'));
            a.name = await aLis[1].evaluate(node => node.innerHTML);
            a = await administrative(a)
            log.info(a);
            let a_Model = new Model(a);
            a_Model.save();
        }

        if (nextPage <= totalPage) {
            log.info('next page is: ' + nextPage);
            await page.waitForSelector("#fy > li > a[n='" + nextPage + "']");
            await (await page.$("#fy > li > a[n='" + nextPage + "']")).click();
            let bbb = await page.waitForFunction((nextPage) => (document.querySelector('.pagination > .cur > a').innerHTML == nextPage), {}, nextPage);
        }

    } while (nextPage <= parseInt(totalPage))
    log.complete('Crawl to the ' + aType + ' to complete');
}

const administrative = async (aaa) => {
    amapApiUrl = amapApi + encodeURI(aaa.name);
    let amapData = (await axios.get(amapApiUrl)).data;
    console.log(amapData)
    if (amapData.count != 0) {
        amapData = amapData.geocodes[0]
        if (amapData.level !== '兴趣点') {
            console.log('api无法查到地址')
        } else {
            aaa.area.country = amapData.country
            aaa.area.province = amapData.province
            aaa.area.city = amapData.city
            let location = amapData.location.split(",")
            aaa.coordinate.longitude = location[0]
            aaa.coordinate.latitude = location[1]
            aaa.formatted_address = amapData.formatted_address
        }
    }
    return aaa;
}

module.exports = replitesA;