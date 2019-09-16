require('../src/db/mongoose.js')
const Task = require('../src/models/task.js')

// Task.findByIdAndRemove('5d77b00d31d1be0d941d8c73').then((task) => {
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5d791f8741af9820ec219d5c').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})