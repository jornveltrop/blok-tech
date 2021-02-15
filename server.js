const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('static/public'))

app.get('/', (req, res) => {
   res.send('Hello World')
});

app.get('/honden', (req, res) => {
   res.send('Een lijst met honden')
});

app.get('/maatjes', (req, res) => {
   res.send('Een lijst met maatjes')
});

app.use(function (req, res, next) {
   res.status(404).send("Sorry deze pagina is niet beschikbaar!")
}) 


app.listen(port, () => {
   console.log('Example app listening on port 3000!')
});