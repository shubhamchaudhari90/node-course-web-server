const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 4202;
var app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');



app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url} `;

console.log(log);
fs.appendFile('server.log', log+'\n', (err)=> {
  if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//Uncomment code if site is under MAintenance

//app.use((req,res,next)=> {
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    heading1 : 'Home Page',
    welcomeMessage : 'Hello friends, this is demo of dynamic creation of home page. \n Created by Shubham Chaudhari.',

  });
});

app.get('/about', (req, res)=> {
  res.render('about.hbs', {
    pageTitle : 'About Page',
    heading1 : 'About Page',
    welcomeMessage : 'Hello friends, this is demo of dynamic creation of about page.In this demo there is a information of Git commit and heroku deployment.\n Created by Shubham Chaudhari.',

  });
})

app.get('/about', (req,res)=> {
  res.send('About Page');
});

app.get('/bad', (req,res)=> {
  res.send({
  errorMessage : 'Unable to process request'
  });
});

app.listen(port, ()=> {
  console.log('in listen function.');
});
