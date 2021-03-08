//ENV Setup
require('dotenv').config()
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const uri = process.env.URI;
const dbName = process.env.DBNAME;
const test = process.env.TEST;

console.log(test);

const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const slug = require('slug');
const { MongoClient } = require('mongodb')
const app = express();

// DB Setup
let db = null;

async function connectDB() {
   const options = { useUnifiedTopology: true };
   const client = new MongoClient(uri, options)
   await client.connect();
   db = await client.db(dbName)
};
connectDB()
   .then(() => {
      //Succesvolle verbinding
      console.log('We have a connection to Mongo!')
   })
   .catch( error => {
      //Error bij verbinden
      console.log(error)
   });


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
app.get('/', async (req, res) => {
   let profielen = {};
   profielen = await db.collection('profielen').find().toArray();
   res.render('index', {title:'Home', profielen});
});

app.get('/profile/:userId', async (req, res) => {
   let profielen = {};
   profielen = await db.collection('profielen').find().toArray();

   let dogs = {};
   dogs = await db.collection('dogs').find().toArray();

   const profiel = profielen.find(profiel => profiel.id == req.params.userId);
   if (profiel === undefined) {
      res.status(404).send("Sorry deze pagina is niet beschikbaar!")
   }
   else {
      res.render('profile', {title:'Profiel test', profiel, dogs});
   }
});

app.get('/addProfile', (req, res) => {
   res.render('addProfile', {title:'Profiel toevoegen'});
});
app.post('/addProfile', async (req,res) => {
   const id = slug(req.body.fname + req.body.lname);
   const profiel = {"id": id, "firstName": req.body.fname, "lastName": req.body.lname, "city": req.body.city, "age": req.body.age, "dogsCount": req.body.dogsCount, "about": req.body.about};
   await db.collection('profielen').insertOne(profiel);
   res.render('profile', {title: "New profile", profiel})
 });

app.get('/addDog', (req, res) => {
   res.render('addDog', {title:"Hond toevoegen", breeds});
});



//404
app.use(function (req, res, next) {
   res.status(404).send("Sorry deze pagina is niet beschikbaar!")
}) 

//LOG INFO SERVER
app.listen(port, host, () => {
   console.log(`Server is listening on ${host}:${port}`);
});