var SALES_TAX_RATE = 0.08; //消費税率

/* 税込価格を返す関数ZEIKOMI */
//num：数値
function getZeikomi(num){
  return num*(1+SALES_TAX_RATE);
}

/*
 スプレッドシート関数用テストドライバ
*/
function test_getZeikomi(){
  getZeikomi(SpreadsheetApp.getActiveSheet().getRange("C21").getValue())
}
