const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setRequestInterceptionEnabled(true);
  page.on('request', function (request) {
  if (/\.(png|jpg|jpeg|gif|webp)$/.test(request.url)) {
    request.abort();
  }
  else {
    console.log(request);
    request.continue();
  }})
  await page.goto('https://www.vr.com.br/portal/portal-vr/login');
  await page.focus(".vr-login-input")
  await page.type('seu email');
  await page.focus("input[name=password]")
  await page.type('sua senha');
  let inputElement = await page.$('button[type=submit]');
  await inputElement.click();
  await page.waitForSelector('.tabs');

  await page.screenshot({path: 'example.png'});

  // browser.close();
})();
