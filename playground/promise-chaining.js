require('../src/db/mongoose.js');
const User = require('../src/models/user.js');

// User.findByIdAndUpdate('5d77b63f3dcee71df4db3b0b', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5d77b63f3dcee71df4db3b0b', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})