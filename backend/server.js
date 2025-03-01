const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let moovies = [
    {id: 1, name: "film 1", genre: ['Fantstic', 'horror']},
    {id: 2, name: "film 2", genre: ['Fantstic']},
    {id: 3, name: "film 3", genre: ['horror', 'sci-fi']},
    {id: 4, name: "film 4", genre: ['Fantstic', 'musicle', 'horror']},
    {id: 5, name: "film 5", genre: ['Fantstic', 'action', 'fairy-tale']},
];

app.get('/', (req, res) => {
    res.send('test endpoint!!!');
});

app.listen(PORT, ()=>{
    console.log(`Server is on http://localhost:${PORT} !!!`);
})