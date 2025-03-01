const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let movies = [
    {id: 1, name: "film 1", title: 'title', genre: ['Fantstic', 'horror']},
    {id: 2, name: "film 2", title: 'title', genre: ['Fantstic']},
    {id: 3, name: "film 3", title: 'title', genre: ['horror', 'sci-fi']},
    {id: 4, name: "film 4", title: 'title', genre: ['Fantstic', 'musicle', 'horror']},
    {id: 5, name: "film 5", title: 'title', genre: ['Fantstic', 'action', 'fairy-tale']},
];

// req - это ОБЬЕКТ ЗАПРОСА, который содержит всю информацию о входящем HTTP-запросе. (require)
// res - это ОБЬЕКТ ОТВЕТА, который используется для отправки ответа клиенту. (result)

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/filter', (req, res) => {
    const { genre } = req.query;

    if (!genre) {
        return res.status(400).json({error: 'Genre is required!'});
    }

    const filteredMovies = movies.filter(movie => movie.genre.includes(genre));
    res.json(filteredMovies);
});

app.post('/movies', (req, res) => {
    const {name, title, genre} = req.body;

    if (!name || !title || !genre) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newMovie = {
        id: movies.length + 1,
        name,
        title,
        genre
    };
    movies.push(newMovie);
    res.status(201).json(newMovie) // статус 201 Created
});

app.put('/movies/:id', (req, res) => {
    const { id } = req.params; // Извлекаем id из параметров
    const {name, title, genre} = req.body;

    if (!name || !title || !genre) {
        return res.status(400).json({error: 'All fields are required'});
    }

    const movieIndex = movies.findIndex(movie => movie.id === parseInt(id));

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    movies[movieIndex] = {
        id: parseInt(id),
        name,
        title,
        genre
    };

    res.json(movies[movieIndex]); // Возвращаем обновленный фильм
});

app.delete('/movies/:id', (req, res) => { // :id — это параметр маршрута, который представляет идентификатор фильма, который мы хотим удалить.
    const { id } = req.params;
    const movieIndex = movies.filter(movie => movie.id !== parseInt(id));

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    movies.splice(movieIndex, 1);
    res.status(204).send(); // статус 204 No Content
});

app.listen(PORT, ()=>{
    console.log(`Server is on http://localhost:${PORT} !!!`);
})