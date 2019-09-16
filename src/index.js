const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express();
// Заметь, тут нет || 3000, поскольку тут использован
// env-cmd и он прописан в json в dev и он берет инфу из config папки
// которая проигнорится гитом 
const port = process.env.PORT

// const multer = require('multer')
// const upload = multer({
//     dest: 'img',
//     limits: {
//         // Max mb
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'))
//         }
        
//         cb(undefined, true) 

//         // cb(new Error('File must be PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })




// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Doesnt work nOw')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//
// Without middleware: new request --> run route handler
//
// With middleware:    new request --> do smthg --> run route handler
//

app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})

// const Task = require('./models/task.js')
// const User = require('./models/user.js')

// const main = async () => {
//     // try {
//     //     const task = await Task.findById('5d7e2fc1007fa222c4386deb')
//     //     await task.populate('owner').execPopulate()
//     //     console.log(task.owner)
//     // } catch (e) {

//     // }
//     const user = await User.findById('5d7e2efdfc5d9116b4165c11')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()
// const pet = {
//     name: 'jack',
//     toJSON() {
//         return this
//     }
// }

// Stringify looking for toJSON if it's exist 
// console.log(JSON.stringify(pet))
