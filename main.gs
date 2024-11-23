const market = ["hose", "hnx", "upcom"]

function main() {
  let jData = [];
  for (i = 0; i < market.length; i++) {
    let jItem = callAPI(`https://iboard-query.ssi.com.vn/v2/stock/exchange/${market[i]}`);
    if (jItem) {
      jData = jData.concat(jItem);
    }
  };
  if (jData.length > 0) {
    updateGoogleSheet(jData, "Tong");
  };
};

function callAPI(enpoint) {
  const url = `https://[<example subdomain cloudflare>].workers.dev?dest=${enpoint}`;
  const headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "content-type": "application/json"
  };

  const options = {
    method: "get",
    headers: headers,
    muteHttpExceptions: true,
    timeout: 15000
  };

  try {
    const res = UrlFetchApp.fetch(url, options);
    if (res.getResponseCode() == 200) {
      Logger.log('API Call Successful');
      const responseText = res.getContentText();
      const data = JSON.parse(responseText)['data'];
      const jsonData = Array.isArray(data) ? data : (data.items || []);

      if (jsonData.length > 0) { return jsonData }
      else {
        Logger.log("No data to write to sheet.");
        return false
      }
    } else {
      Logger.log(`API Call Failed: ${res.getResponseCode()}`);
      Logger.log(res.getContentText());
      return false
    }
  } catch (e) {
    Logger.log(`Error in API call: ${e.message}`);
    return false
  }
}

