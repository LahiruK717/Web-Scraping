const puppeteer = require("puppeteer");

const scrapeProduct = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Get element from xpath
  // destructuring 1st element of the arrray in to [el]
  const [imgElement] = await page.$x('//*[@id="imgBlkFront"]');
  const src = await imgElement.getProperty("src");
  const srcString = await src.jsonValue();

  const [titleElement] = await page.$x('//*[@id="productTitle"]');
  const title = await titleElement.getProperty("textContent");
  const titleString = await title.jsonValue();

  const [priceElement] = await page.$x(
    '//*[@id="buyNewSection"]/h5/div/div[2]/div/span[2]'
  );
  const price = await priceElement.getProperty("textContent");
  const priceString = await price.jsonValue();

  console.log({ srcString, titleString, priceString });
  browser.close();
};

scrapeProduct(
  "https://www.amazon.com/dp/0694003611/ref=s9_acsd_ri_bw_c2_x_1_i?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-12&pf_rd_r=028CEG1BZ0YW7DB2V469&pf_rd_t=101&pf_rd_p=5ce6d8b8-5077-495c-9f75-aa09194de846&pf_rd_i=283155"
);
