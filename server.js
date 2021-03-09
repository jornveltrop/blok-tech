//ENV Setup
require('dotenv').config()
const port = process.env.PORT || 3000;
const uri = process.env.URI;
const dbName = process.env.DBNAME;


//Setup packages
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const slug = require('slug');
const multer = require('multer');
const { MongoClient } = require('mongodb')
const app = express();


//Database Setup
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


//Static folder
app.use(express.static('./public'));


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }))


//Multer setup
const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      callback(null, './public/uploads');
   },

   filename: function (req, file, callback){
      callback(null, Date.now() + '-' + file.originalname)
   }
});

const upload = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 3,
   },
});


//Routing Handlebars 

//Home - simple overview profiles
app.get('/', async (req, res) => {
   let profielen = {};
   profielen = await db.collection('profielen').find().toArray();
   res.render('index', {title:'Home', profielen});
});

//Profile page
app.get('/profile/:userId', async (req, res) => {
   let profielen = {};
   profielen = await db.collection('profielen').find().toArray();

   let dogs = {};
   dogs = await db.collection('dogs').find().toArray();

   const profiel = profielen.find(profiel => profiel.id == req.params.userId);
   if (profiel === undefined) {
      res.status(404).send('Sorry deze pagina is niet beschikbaar!')
   }
   else {
      res.render('profile', {title:'Profiel test', profiel, dogs});
   }
});

//Add a profile
app.get('/addProfile', (req, res) => {
   res.render('addProfile', {title:'Profiel toevoegen'});
});

app.post('/addProfile', upload.single('prPic'), async (req,res) => {
   const id = slug(req.body.fname + req.body.lname);
   const prPicPath = 'uploads/' + req.file.filename;
   const profiel = {'id': id, 'firstName': req.body.fname, 'lastName': req.body.lname, 'profileImg': prPicPath, 'city': req.body.city, 'age': req.body.age, 'dogsCount': req.body.dogsCount, 'about': req.body.about};
   await db.collection('profielen').insertOne(profiel);
   res.render('profile', {title: 'New profile', profiel})
 });


//404
app.use(function (req, res, next) {
   res.status(404).send('Sorry deze pagina is niet beschikbaar!')
}) 


//LOG INFO SERVER
app.listen(port, () => {
   console.log(`Server is listening on port:${port}`);
});