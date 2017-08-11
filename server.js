const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to connect to server.log');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: "Home",
    greeting: "Welcome to this page!"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Page",
    greeting: "Hi. I'm Tony!"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill request"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
