const puppeteer = require('puppeteer');

const debug = false;
const options = debug ? {headless: false, slowMo: 150} : {};
const ROOT_URL = `http://localhost:${process.env.REACT_APP_TESTING_PORT}`;
let browser;
let page;

describe('user signup test', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(options);
    page = await browser.newPage();
  });

  test('user can generate images', async () => {
    await page.goto(ROOT_URL);
    await page.type('#test-input-email', "jeff@jeff.com");
    await page.type('#test-input-password', "jeffrey");
    await page.click('#test-button-signin-submit');
    await page.waitForSelector('#DreamText');
    await page.type('#DreamText', 'cow horse');
    await page.waitForSelector('#DreamTitle');
    await page.type('#DreamTitle', 'puppeteer test');
    await page.click('#archButton');
    await page.waitForSelector('.horseImageGenerated');
    await page.waitForSelector('.horseSlideRight');
    await page.click('.horseSlideRight');
    await page.click('.horseSlideRight');
    await page.click('.horseSlideRight');
    const savedPlace = await page.$eval('.horse', e => e.savedPlace);
    await page.waitForSelector('.savebutton');
    await page.click('.savebutton');
    await page.waitForSelector('.horse0');
    const archiveSavedPlace = await page.$eval('.horse0', e => e.savedPlace);
    expect(archiveSavedPlace).toBe(savedPlace);
  }, 64000);

  afterAll(async () => {
    await browser.close();
  });
})
