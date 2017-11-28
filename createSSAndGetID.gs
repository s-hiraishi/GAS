var FOLDER_ID = '14HlVHEs7UfsUBr03NusePoxHGEkAt7mh'
/*
 新規スプレッドシートを作成してIDを取得する
*/
function creatSSAndGetID(ssName) {
 
  try {
 
    // ルートに新規SSを作成
    var newSS = SpreadsheetApp.create(ssName);
    var fileId = newSS.getId();
    Logger.log("file id 1 : " + fileId);

    // 指定のフォルダを取得して、そこに新規SSをコピー    
    var targetFolder = DriveApp.getFolderById(FOLDER_ID);
    var fileSS = DriveApp.getFileById(fileId);
    targetFolder.addFile(fileSS);

    // 指定フォルダにコピーした新規SSのIDを取得
    var fileList = targetFolder.getFiles();
    while( fileList.hasNext() ) {
      var targetFile = fileList.next();
      if (targetFile.getName() == ssName) {
        Logger.log("Target Folder File name : " + targetFile.getName());
        Logger.log("Target Folder File id : " + targetFile.getId());
        var targetFileId = targetFile.getId();
        break;
      }
    }

    // ルートの新規SSを削除
    DriveApp.getRootFolder().removeFile(fileSS);
    
    // 削除確認
    rootFileList = DriveApp.getRootFolder().getFilesByName(ssName);

    while( rootFileList.hasNext() ) {
      var rootFile = rootFileList.next()
      if (rootFile.getId() == targetFile.getId()) {
        Logger.log("after remove root folder : " + rootFile.getId());
      }
    }
    
    
    var rootFolderName =     DriveApp.getRootFolder().getName();

    
    // 新規SSの親フォルダを表示
    var parentlist = targetFile.getParents();
    while( parentlist.hasNext() ) {
      Logger.log("parent folder : " + parentlist.next().getName());
    }
    
  } catch (e){
    Logger.log(e);
  }
  return fileId;
}

/*
 スプレッドシート関数用テストドライバ
*/
function test_creatSSAndGetID(){
  creatSSAndGetID(SpreadsheetApp.getActiveSheet().getRange("C19").getValue())
}



/*
 ファイルIDでフルパス取得
*/
function get_folderTreeByFileId(file_id){

  var file = DriveApp.getFileById(fileId);
  var parentList = file.getParents();

  while( parentList.hasNext() ) {
    var folder = parentlist.next();
    Logger.log("parent folder : " + folder.getName());
    getFolderTreeByFolder(folder);
  }
}

/*
 ディレクトリオブジェクトでフルパス取得
*/
function getFolderTreeByFolder(folder){

  var names = []
  var Ids = []

  while (folder.getName() != "マイドライブ"){
    names.unshift(folder.getName());
    Ids.unshift(folder.getId());
    var parents = folder.getParents();
    folder = parents[0];
//    var folder = parents[0];
  }
  Logger.log('マイドライブ/'+names.join().replace(/,/g,'/'));
  
}