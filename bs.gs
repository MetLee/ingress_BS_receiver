function doGet(e)
{
  Logger.log(JSON.stringify(e));
  var params = e.parameters;
  
  var d = new Date();
  var currentTime = d.toLocaleString();
  
  var files = DriveApp.getFilesByName("bs");
  if (files.hasNext())
  {
    var file = files.next();
    var spreadsheet = SpreadsheetApp.open(file);
    var sheet = spreadsheet.getSheetByName("1");
    var lastRow = sheet.getLastRow();
    
    var values = [
      [params["imageUrl"][0],params["supportingImageUrl"][0],params["title"][0],params["description"][0],
       params["statement"][0],params["streetAddress"][0],params["lat"][0],params["lng"][0],
       params["stars"][0],params["duplicate"][0],params["reasons"][0],params["JSON"][0],
       params["passcode"][0],params["x"][0],currentTime
       ]
      ];
    
    sheet.insertRowAfter(lastRow);
    var range = sheet.getRange(lastRow+1, 1, 1, 15);
    range.setValues(values);
  }
  else
  {
    return;
  }
}
