/*
 ハングアウトの履歴を取得
*/
function getHangoutHistory() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ハングアウト履歴');

  var ChatThreads = GmailApp.getChatThreads();
  for (i in ChatThreads){
    var ChatMessages = ChatThreads[i].getMessages();
    if (ChatMessages.length > 0) {
        var rows = [];
        for (j in ChatMessages) { 
          rows.push(["", ChatMessages[j].getFrom(),ChatMessages[j].getTo(), ChatMessages[j].getBody(), ChatMessages[j].getDate(), ""]);
        }
        sheet.getRange(2, 1, rows.length, 6).setValues(rows);
    }
  }
}