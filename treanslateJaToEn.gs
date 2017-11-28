/*
 日本語を英語に翻訳
*/
function translateJaToEn(text){
  try{
    var result = LanguageApp.translate(text, "ja", "en"); //翻訳
  }catch(e){
    result = "エラーの内容:" + e;
  }
    Logger.log(result);
    return result;
}

/*
 スプレッドシート関数用テストドライバ
*/
function test_translateJaToEn(){
  translateJaToEn(SpreadsheetApp.getActiveSheet().getRange("C13").getValue())
}

