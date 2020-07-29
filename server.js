var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var users = require('./api/controllers/user')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('dist/educativo'));

app.use('/users', users)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
app.get('*', function (req, res) {
  res.sendfile('./dist/educativo/index.html');
});


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
