const puppeteer = require('puppeteer');

describe('Notes App', () => {

  beforeAll(async () => {
    await page.goto('https://ritvikpen.github.io/CSE110-SP24-Lab6-Template/');
  });

  test('Add note', async () => {
    await page.click('.add-note');
    const notes = await page.$$('.note');
    expect(notes.length).toBe(1);
  }, 10000);

  test('Edit new note', async () => {
    await page.click('.add-note');
    await page.focus('.note');
    await page.keyboard.type('Test note');
    const noteText = await page.$eval('.note', note => note.value);
    expect(noteText).toBe('Test note');
  }, 10000);
  
  test('Edit existing note', async () => {
    await page.click('.add-note');
    await page.focus('.note');
    await page.keyboard.type(' Updated');
    const noteText = await page.$eval('.note', note => note.value);
    expect(noteText).toBe('Test note Updated');
  }, 10000);

  test('Notes preserved after refresh', async () => {
    await page.click('body');
    // Reload the page
    await page.reload();
    await page.waitForSelector('.note');
    const noteText = await page.$eval('.note', note => note.value);
    expect(noteText).toBe('Test note Updated');
  }, 10000);

  test('Delete note', async () => {
    await page.click('.note');
    await page.click('.note', { clickCount: 2 });
    await page.click('.note');
    await page.click('.note', { clickCount: 2 });
    await page.click('.note');
    await page.click('.note', { clickCount: 2 });
    const notes = await page.$$('.note');
    expect(notes.length).toBe(0);
  }, 10000);
});