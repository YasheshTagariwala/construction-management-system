// all the imports and assignments
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
//
// introductory ping results
app.get('/', function (req, res) {
  res.send("You're pinging the c360 brain!");
});
// 
// notify where we surfin 8-)
app.listen(5000, function () {
  console.log('Surfing at 5000!');
});
// 
// small card controllers here
const routerx = require('./routes/')
app.use('/api', routerx)