/*
 郵便番号API呼び出し
  郵便番号から住所を呼び出す
*/
function getAddressFromZip(zip){

 var response = UrlFetchApp.fetch('http://zipcloud.ibsnet.co.jp/api/search?zipcode=' + zip); //郵便番号APIへのリクエスト
 var results = JSON.parse(response.getContentText()).results; //レスポンスをjson解析してresultsを取り出す
 return results[0].address1 + results[0].address2 + results[0].address3;

}

/*
 スプレッドシート関数用テストドライバ
*/
function test_getAddressFromZip(){
  getAddressFromZip(SpreadsheetApp.getActiveSheet().getRange("C17").getValue())
}

