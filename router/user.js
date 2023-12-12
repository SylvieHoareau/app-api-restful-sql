import { Router } from 'express'

import { getAllUsers } from '../controllers/user'

const router = Router()

router.get('/users', getAllUsers)

router.get('/users/:id', getUserById)

router.post('/users', postUser)

router.delete('/users/:id', deleteUserById)

export default router