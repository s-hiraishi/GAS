/**
 *グローバル変数
 */
// 入力シート
var inSs = SpreadsheetApp.getActiveSpreadsheet();
var inSheet = inSs.getSheetByName('フルパス取得');
// 出力シート
var outSs = inSs;
var outSheet = outSs.getSheetByName('フルパス取得');

/*
 スプレッドシート関数用テストドライバ
*/
function test_getFolderTreeByFileId(){
  getFolderTreeByFileId(inSheet.getRange("C3").getValue())
}

/**
 *引数で指定したファイルIDのフルパスリスト取得
 *@param {string} fileId
 */
function getFolderTreeByFileId(fileId){

  try {
    
    var resultArrey = [];
    var file = DriveApp.getFileById(fileId);
    var parentList = file.getParents();
    
    while( parentList.hasNext() ) {
      var folder = parentList.next();
      Logger.log("parent folder : " + folder.getName());
      var path = get_folderTreeByFolder(folder);
      resultArrey.push(path);
    }
    // 出力シート選択
    var ss = SpreadsheetApp.getActiveSpreadsheet();
  　var sheet = ss.getSheetByName('フルパス取得');
    // シートに出力
    var rows = resultArrey.length;
  　sheet.getRange(6,3,rows,1).setValues(resultArrey);

  } catch (e){
    Logger.log(e);
  }
}

/**
 *ディレクトリオブジェクトでフルパス取得
 * @param {A folder in Google Drive} folder
 */
function get_folderTreeByFolder(folder){

  var names = []
  var Ids = []

  // folderがマイドライブになるまで繰り返す
  while (folder.getName() != "マイドライブ"){
    Logger.log('loop folder name : ' + folder.getName());
    names.unshift(folder.getName());
    Ids.unshift(folder.getId());
    folder = folder.getParents().next();
  }
  var result = ['マイドライブ/' + names.join().replace(/,/g,'/')];
  return result;
}
