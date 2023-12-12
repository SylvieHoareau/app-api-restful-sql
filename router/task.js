import { getTaskById, postTaskById, deleteTaskById, editTaskById, getTasks } from '../controllers/task'

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await getTaskById(req.params.id)
        res.json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/tasks/:id', async (req, res) => {
    try {
        await postTaskById(req.params.id, req.body.description)
        res.status(201).json({ message: 'Tâche ajoutée avec succès' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        await deleteTaskById(req.params.id)
        res.status(201).json({ message: 'Tâche supprimée avec succès' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/tasks/:id', async (req, res) => {
    try {
        await editTaskById(req.params.id, req.body.newDescription)
        res.status(201).json({ message: 'Tâche mise à jour avec succès' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/mesTaches', async (req, res) => {
    try {
        const tasks  = await getTasks()
        res.render('mesTaches', { tasks })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})