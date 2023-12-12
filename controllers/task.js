
// Utiliser la fonction
const dbConnection = connectToDatabase()

export const getAllTasks = () => {
    // Requête SQL
    const sql = 'SELECT * FROM tasks'

    // Exécuter la requête
    dbConnection.query(sql, (error, results) => {
        if (error) {
            // Afficher l'erreur
            console.error('Une erreur:', error)
        } else {
            console.log('Liste des tâches: ', results)
        }
    })
}

// Appeler la fonction
getAllTasks()

export const getTaskFromIdUser = (userId) => {
    // Requête SQL
    const sql = 'SELECT * FROM tasks WHERE user_id = ?'

    // Exécuter la requête
    dbConnection.query(sql, [userId], (error, results) => {
        if (error) {
            // Affiche l'erreur
            console.error('Une erreur :', error)
        } else {
            // Afficher les résultats
            console.error(`Liste des tâches pour l\'utilisateur ${userId} : `, results )
        }
    })
}

// Appel de la fonction avec un ID utilisateur spécifique
getTaskFromIdUser(1)

export const getTaskFromNameUser = (userName) => {
    // Requête SQL
    const sql = 'SELECT * FROM tasks WHERE user_name = ?'

    // Exécution de la requête
    dbConnection.query(sql, [userName], (error, results) => {
        if (error) {
            // Afficher l'erreur
            console.error('Une erreur : ', error)
        } else {
            // Afficher les résultats
            console.log(`List of tasks for user ${userName}:`, results)
        }
    })
}

// Appeler la fonction avec un nom d'utilisateur spécifique
getTaskFromNameUser('Sylvie')

// Fonction pour récupérer des données de la base de données
export const getDataFromDatabase = (callback) => {
    const sql = 'SELECT * FROM tasks'
    dbConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Erreur:', error)
        } else {
            callback(results)
        }
    })
}

// Utilisation de la boucle foreach
getDataFromDatabase((data) => {
    data.forEach((item) => {
        console.log(item)
    })
})

export const addTaskFromNameUser = (userName, taskDescription) => {
    // Requête SQL
    const sql = 'INSERT INTO tasks (user_name, description) VALUES (?,?)'

    // Exécuter la requête
    dbConnection.query(sql, [userName, taskDescription], (error, results) => {
        if (error) {
            // Afficher l'erreur
            console.error('Erreur:', error)
        } else {
            // Afficher un message de succès
            console.log(`Task ${taskDescription} added for user ${userName}`)
        }
    })
}

// Appeler la fonction avec un nom d'utilisateur et une description de tâche spécifiques
addTaskFromNameUser('Daniel', 'Apprendre PHP')

// export const getTaskById = async (id) => {
//     // Requête SQL
//     const sql = 'SELECT * FROM tasks WHERE id=?'

//     // Exécuter la requête et retourner les résultats
//     const [rows] = await dbConnection.query(sql, [id])
//     return rows[0]
// }

export const getTaskById = async (req, res) => {
    try {
        // On récupère l'id de la tâche dans l'URL
        const id = req.params.id

        // get Task By Id avec ORM Sequelize
        const task = await Task.findAll({
            where: {
                id: id
            }
        })

        if(!task) {
            res.status(400).send('no tasks found')
        }

        res.status(200).send(task)
    } catch (error) {
        res.send(error)
    }
}

export const postTaskById = async (userId, taskDescription) => {
    // Requête SQL
    const sql = 'INSERT INTO tasks (user_id, description) VALUE (?,?)'

    // Exécuter la requête
    await dbConnection.query(sql, [userId, taskDescription])
}

export const deleteTaskById = async (id) => {
    // Requête SQL
    const sql = 'DELETE FROM tasks WHERE id = ?'

    // Exécuter la requête
    await dbConnection.query(sql, [id])
}

export const editTaskById = async (id, newDescription) => {
    // Requête SQL
    const sql = 'UPDATE tasks SET description = ? WHERE id = ?'

    // Exécuter la requête
    await dbConnection.query(sql, [newDescription, id])
}

export const getTasks = async (req, res) => {
    try {
        let conditions = {}
        let limit = req.query.limit ? parseInt(req.query.limit) : null
        // pagination
        let skip = req.query.skip ? parseInt(req.query.skip) : null
        let sort = req.query.sort === 'asc' ? 'ASC' : 'DESC'
        if (req.query.completed) {
            conditions.completed = req.query.completed === 'true'
        }
        const tasks = await models.Task.findAll({ 
            where: conditions,
            limit: limit,
            offset: skip,
            order: [['createdAt', sort]]
        })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}