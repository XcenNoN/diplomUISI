const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const config = require('./config');
const routes = require('./routes');
const app = express();
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/api', routes.auth);
app.use('/bots', routes.bots);

app.get('/main', async (req, res) => {
  let data = await routes.auth.check(req, res)
  let isAdmin = await routes.auth.checkAdmin(req, res)
  
  if (data){
    res.render('main', {isAdmin: isAdmin});
  }
  else
    res.redirect('/')
});
app.get('/archive', async (req, res) => {
  let data = await routes.auth.check(req, res)
  let isAdmin = await routes.auth.checkAdmin(req, res)
  if (data){
    res.render('archive', {isAdmin: isAdmin});
  }
  else
    res.redirect('/')
});

app.get('/setting', async (req, res) => {
  let data = await routes.auth.check(req, res)
  let isAdmin = await routes.auth.checkAdmin(req, res)
  if (data){
    res.render('setting', {isAdmin: isAdmin});
  }
  else
    res.redirect('/')
});

app.get('/help', async (req, res) => {
  let data = await routes.auth.check(req, res)
  let isAdmin = await routes.auth.checkAdmin(req, res)
  if (data){
    res.render('help', {isAdmin: isAdmin});
  }
  else
    res.redirect('/')
});

// eslint-disable-next-line no-unused-vars

app.listen(config.PORT, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
);
