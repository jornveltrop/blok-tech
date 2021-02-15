const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = 3000;


//View engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: 'views/layouts/'}));
app.set('view engine', 'hbs');

//Static
app.use(express.static('static/public'));


//Routing
app.get('/honden', (req, res) => {
   res.send('Een lijst met honden')
});
app.get('/maatjes', (req, res) => {
   res.send('Een lijst met maatjes')
});
app.get('/test/:textId', (req, res) => {
   res.send('<h1>'+req.params['textId']+'</h1>')
});

   //Handlebars
app.get('/profile', (req, res) => {
   res.render('index', { 
      person: {
         firstName: 'Willemijn',
         lastName: 'de Vries',
         age: '23',
         residence: 'Amsterdam',
      },

      dogs: {
         dogCounter: '2',
         dogOne: {
            name: 'Dido',
            age: '2',
            breed: 'Bordercollie',
         },
         dogTwo: {
            name: 'Kaj',
            age: '2',
            breed: 'Bordercollie',
         },
      }
   });
});



//404
app.use(function (req, res, next) {
   res.status(404).send("Sorry deze pagina is niet beschikbaar!")
}) 


app.listen(port, () => {
   console.log('Example app listening on port 3000!')
});