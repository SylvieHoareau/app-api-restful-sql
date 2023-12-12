import userModel from '../models/user'

export const getAllUsers = async (req, res) => {
    try {
        const users = await models.User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await models.User.findByPk(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).send('L\'utilisateur avec cet ID n\'existe pas.')
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        
    }
}

export const postUser = async (req, res) => {
    try {
        const user = await models.User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await models.User.destry({
            where: { id: id }
        })
        if (deleted) {
            return res.status(204).send('Utilisateur supprimée')
        }
        throw new Error('Utilisateur non trouvé')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}