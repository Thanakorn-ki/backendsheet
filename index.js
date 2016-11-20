var express = require('express')
var app = express()
var google = require('googleapis')
// AIzaSyBq55vjYfWrkXii5Tqngi-pzlUIagNd0ck
var ReadSheet = (keyAPI, sheetId, sheet, callback) => {
  var sheets = google.sheets('v4')
  sheets.spreadsheets.values.get({
    // auth key api in website head Sheets API
    auth: `${keyAPI}`,
    spreadsheetId: `${sheetId}`,
    range: `${sheet}`
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
    var rows = response.values
    if (rows.length === 0) {
      console.log('No data found.')
    } else {
      // console.log(response)
      callback(response)
    }
  })
}
app.get('/keyAPI=:auth/:ID/sheetname/:sheet', function (req, res) {
  ReadSheet(req.params.auth, req.params.ID, req.params.sheet, (item) => {
    res.json(item)
  })
})
app.set('port', (process.env.PORT || 3000))
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
