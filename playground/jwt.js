const jwt = require('jsonwebtoken')

const myFunc = async () => {
    const token = jwt.sign({ _id: 'echo19' }, 'top-secret-key')
    console.log(token)
    const data = jwt.verify(token, 'top-secret-key')
    console.log(data)
}

myFunc()