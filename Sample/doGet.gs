/*
 Webアプリ
 　動的に値を変更して表示する
*/
function doGet1() {
  var sheetApp = SpreadsheetApp.openById("1CrF80emcVykCuDOrIQIJwjx1A78Z4Mi1YjfOKUMcRkU");
  var sheet    = sheetApp.getSheetByName("シート1");
  var data     = sheet.getDataRange().getValues();

  data[10][2]++;
  sheet.getDataRange().setValues(data);
  var countStr  = "あなたは" + data[10][2] + "回アクセスしました。";
  return ContentService.createTextOutput(countStr);
}