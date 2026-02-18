import fs from "fs";
import csv from "csv-parser";

const results = [];

fs.createReadStream("./data/EQUITY_L.csv")
  .pipe(
    csv({
      mapHeaders: ({ header }) => header.trim(), 
    })
  )
  .on("data", (row) => {

    if (results.length === 0) {
      console.log("ROW SAMPLE:", row);
    }

    const series = row.SERIES?.trim();

    if (series === "EQ") {
      const symbol = row.SYMBOL?.trim();

      results.push({
        symbol,
        name: row["NAME OF COMPANY"]?.trim(),
        yahooSymbol: symbol + ".NS",
        isin: row["ISIN NUMBER"]?.trim(),
        listingDate: row["DATE OF LISTING"]?.trim(),
      });
    }
  })
  .on("end", () => {
    console.log("Total EQ stocks parsed:", results.length);

    fs.writeFileSync(
      "./data/stocks.json",
      JSON.stringify(results, null, 2)
    );

    console.log("stocks.json created successfully ✅");
  });
