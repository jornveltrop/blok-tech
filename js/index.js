const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.send('Hello World Test2 Refresh nodemon')
})

app.listen(port, () => {
   console.log("Example app listening at http://localhost:3000")
});