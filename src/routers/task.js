const express = require('express')
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        //Copy all properties from body over to this obj
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

// GET /tasks?done=false
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc(asc)
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.done) {
        match.done = req.query.done === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        //const tasks = await Task.find({})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }         
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send()
    }
})

// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.param.id
//     try {
//         const task = await Task.findById(_id)
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch(e) {
//         res.status(500).send()
//     }

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            //const task = await Task.findById(_id)
            const task = await Task.findOne({ _id, owner: req.user._id})
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        } else {
            res.status(404).send('Invalid id')
        }
    } catch(e) {
        res.status(500).send(e)
    }

    
    // const _id = req.param.id
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.send(e)
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'done']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send('Invalid id')
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router