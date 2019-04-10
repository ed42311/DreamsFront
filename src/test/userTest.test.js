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
    await page.click('#archButton');
    await page.waitForSelector('.imageGenerated');
    const url = await page.$eval('.imageGenerated', e => e.src);
    expect(url).toBe('https://cdn.pixabay.com/photo/2014/11/06/15/14/grandpa-519246_150.jpg');
  }, 32000);

  afterAll(async () => {
    await browser.close();
  });
})
