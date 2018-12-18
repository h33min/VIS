var express = require('express');
var Promise = require("bluebird");
var sqlite = require('sqlite');


const app = express();
const port = 3000;
const dbPromise = sqlite.open('./data.db', { Promise });


app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.get('/', async (req, res, next) => {
  res.render('index.html');
});


app.get('/test', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const [post] = await Promise.all([
      db.all('SELECT * FROM total WHERE startTime between \'2017-10-01\' AND \'2017-10-08\'')
    ]);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

app.get('/getRank', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const [post] = await Promise.all([
      db.all('SELECT * FROM total WHERE startTime between \'2017-10-01\' AND \'2017-10-08\' order by runtime desc limit 10')
    ]);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

app.listen(port);