/*
 スクレイピングhtmlタグ
*/
function scrapingHtmltag(url, tag) {
  var options = {
    "muteHttpExceptions": true,　    // 404エラーでも処理を継続する
  }
  var fetch = UrlFetchApp.fetch(url, options);
  var response = fetch.getContentText();

  // 引数のタグを正規表現 '.*?' 
  var matcher = new RegExp('<'+tag+'>.*?<\/'+tag+'>', 'g')
  var resultlist = response.match(matcher);

  value = "なし";
  if (resultlist.length > 0) {
    value = resultlist[0];
  }
  return value;
}

/*
 スプレッドシート関数用テストドライバ
*/
function test_scrapingHtmltag(){
  scrapingHtmltag(SpreadsheetApp.getActiveSheet().getRange("C7").getValue(), SpreadsheetApp.getActiveSheet().getRange("D7").getValue())
}

