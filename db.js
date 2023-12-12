import dotenv from 'dotenv'
import Sequelize from 'sequelize'

// Charger les variables d'environnement
dotenv.config()

// Créer une fonction pour se connecter à la base de données
// const connectToDatabase = () => {
//     const connection = mysql.createConnection({
//         host: process.env.HOST,
//         user: process.env.USER,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE
//     })

//     // Tester la connexion
//     connection.connect((error) => {
//         if (error) {
//             // Déclencher une erreur en cas de problème de connexion
//             throw error
//         } else {
//             console.log('Connexion réussie à la base de données')
//         }
//     })
//     return connection
// }


// Créer une fonction pour se connecter à la base de données
const connectToDatabase = () => {
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: 'mysql'
    })

    sequelize.authenticate()
        .then(() => {
            console.log('Connexion réussie à la base de données')
        })
        .catch((error) => {
            // Déclencher une erreur en cas de problème de connexion
            throw error
        })
    return sequelize
}