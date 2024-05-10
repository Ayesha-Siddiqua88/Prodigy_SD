// Importing necessary packages
const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
};

// Function to scrape Al Jazeera news
const aljazeera = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.aljazeera.com/");
    const allArticles = await page.evaluate(() => {
        const articles = document.querySelectorAll("article");
        return Array.from(articles).map((article) => {
            const title = article.querySelector("span").innerText;
            const link = article.querySelector("a").href;
            return { title, link };
        });
    });
    await browser.close();
    return allArticles;
};

// Function to scrape BBC news
const bbc = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.bbc.com/news");
    const allArticles = await page.evaluate(() => {
        const headers = document.querySelectorAll('[data-testid="edinburgh-card"]');
        return Array.from(headers).map((article) => {
            const title = article.querySelector("h2").innerText;
            const link = article.querySelector("a").href;
            return { title, link };
        });
    });
    await browser.close();
    return allArticles;
};

const writeToCsv = async (site, articles) => {
    const csvWriter = createCsvWriter({
        path: `${site}.csv`,
        header: [
            { id: 'site', title: 'Site' },
            { id: 'title', title: 'Title' },
            { id: 'link', title: 'Link' }
        ],
        append: true // Append mode to add new entries without overwriting existing data
    });

    const records = articles.map(article => ({
        datetime: getCurrentDateTime(), // Current date and time
        site,
        title: article.title,
        link: article.link,
    }));

    await csvWriter.writeRecords(records);
};

// Scrape Al Jazeera news and write to CSV
aljazeera().then(articles => writeToCsv('aljazeera', articles));

// Scrape BBC news and write to CSV
bbc().then(articles => writeToCsv('bbc', articles));
