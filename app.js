import mysql from 'mysql'
import express from 'express'
import http from 'http'
import axios from 'axios'

// Import des modules
import { getAllTasks, getTaskFromIdUser, getTaskFromNameUser, getTaskById } from './controllers/task'
import taskRouter from './router.task.js'

// Création d'une nouvelle application Express
const app = express()

console.log('hello node')

// Utiliser le router
app.use('/api', taskRouter)

// Définition d'une route pour la racine du site
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Pour envoyer du HTML
app.get('/html', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

// Pour envoyer du JSON
app.get('/json', (req, res) => {
    res.json({ message: 'Bonjour Monde'})
})

// Utilisation de http
http.get('https://api.jikan.moe/v4/anime?q=Dragon Ball Z&sfw', (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk
    })

    res.on('end', () => {
        let animeData = JSON.parse(data)
        console.log(animeData)
    })
}).on('error', (err) => {
    console.log('Error:' + err.message)
})

// Utilisation de fetch
fetch('https://api.jikan.moe/v4/anime?q=Dragon%20Ball%20Z&sfw')
    .then(res => res.json)
    .then(json => console.log(json))
    .catch(err => console.log('Error:', err))


// Utilisation d'AXIOS
const getAnimeData = async () => {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/anime?q=Dragon%20Ball%20Z&sfw')
        const data = response.data
        // Filtrer les données pour n'afficher que les animes avec une note supérieure à 8
        const filteredData = data.filter(anime => anime.score > 8)
        // console.log(response.data)
        console.log(filteredData)
    } catch (error) {
       console.log(error)
    }
}

getAnimeData()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' })
})

// Démarrer le serveur
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
