const puppeteer = require('puppeteer');
const dictionary = require('./dictionary');

const URLLOGIN = "https://www.instagram.com/accounts/login/?next=%2F&source=logged_out_half_sheet";

const LOGINFACEBOOK = false;
const USEDICTIONARY = true;

const USERNAME = "username";
const PASSWORD = "password";

const URLPOST = "https://www.instagram.com/p/";
const COMMENT = "@testedesenvolvimento159 ";
const QUANTITY = 1;

async function clickButton(page, selector) {
    await page.waitFor(selector);
    const button = await page.$(selector);
    await button.click();
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    
    const page = await browser.newPage();
    await page.goto(URLLOGIN);

    if (LOGINFACEBOOK) {
      await clickButton(page, '.KPnG0');
      
      await page.waitFor('input[name="email"]');
      await page.type('input[name="email"]', USERNAME);
      
      await page.waitFor('input[name="pass"]');
      await page.type('input[name="pass"]', PASSWORD);
      
      await clickButton(page, '[name="login"]');
    } else {
      await page.waitFor('input[name="username"]');
      await page.type('input[name="username"]', USERNAME);

      await page.waitFor('input[name="password"]');
      await page.type('input[name="password"]', PASSWORD);

      await clickButton(page, 'button[class="sqdOP  L3NKy   y3zKF     "]');
    }
    
    await page.waitFor(5000);

    for (let i = 0; i < QUANTITY; i++) {
      let commentFormated = COMMENT;
      console.log(dictionary[0]);
      if (USEDICTIONARY) commentFormated += ' ' + dictionary[0];

      await page.goto(URLPOST);

      await page.waitFor('textarea[class="Ypffh"]');
      await page.type('textarea[class="Ypffh"]', commentFormated);

      await page.click('button[class="sqdOP yWX7d    y3zKF     "]');

      if (i % 2 === 0) await page.waitFor(60000);
    }
})();