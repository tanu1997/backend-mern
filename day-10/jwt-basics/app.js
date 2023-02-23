
const jwt = require('jsonwebtoken')

const token = jwt.sign({role: 'admin'},
'abc123',
 {algorithm : 'HS256'})

 console.log('Signed Token')
console.log(token)

try
{
    const original =jwt.verify(token,'abc123')
    console.log('Verified Token')
    console.log(original)
}
catch(error)
{
    console.log('Invalid Signature')
}

