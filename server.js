const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const slug = require('slug');
const app = express();
const port = 3000;


//Tijdelijk voor database
const accounts = [

   {  id: "willemijn-de-vries", 
      firstName: "Willemijn", 
      lastName: "de Vries", 
      profileImg: "/images/profilePicture.jpg",
      age: 23, 
      city: "Amsterdam", 
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac consectetur turpis. Sed cursus ante a sodales volutpat. Mauris pretium velit vel tellus finibus, in bibendum eros ullamcorper.",
      dogsCount: "2",
      dogsId: [1, 2]
   },

   {  id: "erik-diep", 
      firstName: "Erik", 
      lastName: "Diep", 
      profileImg: "/images/profilePicture.jpg",
      age: 26, 
      city: "Amsterdam2", 
      about: "2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac consectetur turpis. Sed cursus ante a sodales volutpat. Mauris pretium velit vel tellus finibus, in bibendum eros ullamcorper.",
      dogsCount: "3",
      dogsId: [3, 4, 5]
   }
];

const dogs = [
      {
         dogName: "Dido",
         id: 1,
         age: 2,
         imageUrl: "/images/dog1.jpg"
      },

      {
         dogName: "Kaj",
         id: 2,
         age: 2,
         imageUrl: "/images/dog2.jpg",
      }
];

const breeds = ["Border Collie", "German Shepherd", "Cavoodle", "Golden Retriever", "Labrador"]


//View engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: 'views/layouts/'}));
app.set('view engine', 'hbs');

//Static
app.use(express.static('static/public'));
//BodyParser
app.use(bodyParser.urlencoded({ extended: false }))


//Routing test
app.get('/honden', (req, res) => {
   res.send('Een lijst met honden')
});
app.get('/maatjes', (req, res) => {
   res.send('Een lijst met maatjes')
});
app.get('/test/:textId', (req, res) => {
   res.send('<h1>'+req.params['textId']+'</h1>')
});


//Routing Handlebars 
app.get('/', (req, res) => {
   res.render('index', {title:'Home', accounts});
});

app.get('/profile/:userId', (req, res) => {
   const account = accounts.find(account => account.id == req.params.userId);
   if (account === undefined) {
      res.status(404).send("Sorry deze pagina is niet beschikbaar!")
   }
   else {
      res.render('profile', {title:'Profiel test', account, dogs});
   }
});

app.get('/addProfile', (req, res) => {
   res.render('addProfile', {title:'Profiel toevoegen'});
});
app.post('/addProfile', (req,res) => {
   const id = slug(req.body.fname + req.body.lname);
   const account = {"id": id, "firstName": req.body.fname, "lastName": req.body.lname, "city": req.body.city, "age": req.body.age, "dogsCount": req.body.dogsCount, "about": req.body.about};
   accounts.push(account);
   res.render('profile', {title: "New profile", account})
 });

app.get('/addDog', (req, res) => {
   res.render('addDog', {title:"Hond toevoegen", breeds});
});



//404
app.use(function (req, res, next) {
   res.status(404).send("Sorry deze pagina is niet beschikbaar!")
}) 

//LOG INFO SERVER
app.listen(port, () => {
   console.log('Example app listening on port 3000!')
});