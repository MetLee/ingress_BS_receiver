function doPost(e) {
  Logger.log(JSON.stringify(e));
  var payload = JSON.parse(e.postData.contents);

  var pageData = payload.pageData;
  var reviewData = payload.reviewData;
  var editData = payload.editData;
  var photoData = payload.photoData;
  var passcode = payload.passcode;
  var version = payload.version;
  var iOS = payload.iOS;
  var comment = payload.comment;

  var d = new Date();
  var currentTime = d.toLocaleString();

  var files = DriveApp.getFilesByName("bs");
  if (files.hasNext()) {
    var file = files.next();
    var spreadsheet = SpreadsheetApp.open(file);
    var sheet = spreadsheet.getSheetByName("new");

    var values = [
      pageData.type, pageData.id, pageData.imageUrl, pageData.supportingImageUrl,
      pageData.title, pageData.description, pageData.statement, pageData.streetAddress,
      pageData.lat, pageData.lng,

      reviewData.quality, reviewData.description, reviewData.cultural, reviewData.uniqueness,
      reviewData.safety, reviewData.location, reviewData.duplicateOf, reviewData.rejectReason,

      comment, passcode, version, iOS,
      currentTime, JSON.stringify(payload)
    ];

    sheet.appendRow(values);
  }
  else {
    return;
  }
}