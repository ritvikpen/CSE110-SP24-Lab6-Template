const puppeteer = require('puppeteer');

describe('Notes App', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/index.html');
  });

  afterAll(() => {
    browser.close();
  });

  test('Add note', async () => {
    await page.click('.add-note');
    const notes = await page.$$('.note');
    expect(notes.length).toBe(1);
  }, 10000);

  test('Edit new note', async () => {
    await page.click('.add-note');
    await page.keyboard.type('Test note');
    const noteText = await page.$eval('.note', note => note.innerText);
    expect(noteText).toBe('Test note');
  }, 10000);
  
  test('Edit existing note', async () => {
    await page.click('.note');
    await page.keyboard.type(' Updated');
    const noteText = await page.$eval('.note', note => note.innerText);
    expect(noteText).toBe('Test note Updated');
  }, 10000);
  
  test('Notes preserved after refresh', async () => {
    await page.reload();
    await page.waitForSelector('.note');
    const noteText = await page.$eval('.note', note => note.innerText);
    expect(noteText).toBe('Test note Updated');
  }, 10000);

  test('Delete note', async () => {
    await page.click('.note');
    await page.mouse.click(100, 100, { clickCount: 2 }); // replace 100, 100 with the coordinates of the note
    await page.waitForTimeout(1000); // wait for the deletion to take effect
    const notes = await page.$$('.note');
    expect(notes.length).toBe(0);
  }, 10000);
});