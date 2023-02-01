const express = require("express"); 
const { read } = require("fs");
const app = express(); 
app.use(express.json()); 

rapsongs = [{name: "N95 KENDRICK LAMAR", year: 2021}, {name:"Dance Now JID", year: 2022}, {name:"In Da Club 50 CENT", year: 2003}]; 
rocksongs = [{name:"Bohemian Rhapsody QUEEN", year: 1975}, {name:"Holiday TURNSTILE", year: 2022}, {name:"Without Me DAYSEEKER", year: 2021}]; 
punksongs = [{name:"Troglodyte VIAGRA BOYS", year: 2021}, {name:"State of Mind STIFF RICHARDS", year: 2019}, {name:"Hell of Mine JOE UNKNOWN", year: 2022}]
popsongs = [{name:"Stay KID LAROI", year: 2021}, {name:"Viva la Vida COLDPLAY", year: 2008}, {name:"Goodbyes POST MALONE", year: 2019}]; 
indiesongs = [{name:"I Don't Wanna Party THE POLARITY", year: 2020}, {name:"how would you know SECOND THOUGHTS", year: 2021}, {name:"tell me a joke QUADECA", year: 2022}]; 

const genres = [
    {id: 1, name:"Rap", songs: rapsongs},
    {id: 2, name:"Rock", songs: rocksongs}, 
    {id: 3, name:"Punk", songs: punksongs}, 
    {id: 4, name:"Pop", songs: popsongs}, 
    {id: 5, name: "Indie", songs: indiesongs}
]



//GET REQUESTS

//Welcome Page
app.get("/", (req, res)=> {
    res.send("Welcome to the MUSIC APP");
})

//Genres Page   
app.get('/genres', (req,res)=> {
    res.send(genres); 
})

//Genre ID Page
app.get('/genres/:id', (req,res)=> {
    const genre = genres.find(c=> c.id === parseInt(req.params.id)); 
    if(!genre) {
        res.status(404).send("The genre with the given ID was not found"); 
        return
    }
        res.send(genre); 
})

//Song Page
app.get('/genres/:id/:year', (req, res)=> {
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) {
        res.status(404).send("The genre with the given ID was not found"); 
        return
    }
    const songs = genre.songs.find(c=> c.year === parseInt(req.params.year))
    if (!songs) {
        res.status(404).send("Songs with the given year was not found"); 
        return
    }
    res.send(songs); 
})

//POST REQUESTS
app.post("/genres", (req, res) => {
    if (req.body.name.length > 2) {
        const genre = {
            id: genres.length + 1,
            name: req.body.name
        }
        genres.push(genre); 
        res.send(genres); 
    }
    else {
        res.status(400).send("Name is required and with a minimum of 3 characters"); 
    }
})

//PUT REQUESTS
app.put("/genres/:id", (req, res)=> {
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) {
        res.status(404).send("The genre with the given ID was not found"); 
        return
    }
    if (req.body.name.length > 2) {
        genre.name = req.body.name; 
        genre.id = req.body.id
        genres.splice(genre.id-1, 1, genre)
        res.send(genres); 
    }
    else {
        res.status(400).send("Name is required and with a minimum of 3 characters"); 
    }
})

//DELETE REQUESTS
app.delete("/genres/:id", (req, res) => {
    const genre = genres.find(c=> c.id === parseInt(req.params.id)); 
    if(!genre) {
        res.status(404).send("The genre with the given ID was not found"); 
        return
    }
    genres.splice(genres.indexOf(genre), 1)
    res.send(genre); 
})

app.listen(3000, () => {
    console.log("Listening on port 3000 ..."); 
}); 


