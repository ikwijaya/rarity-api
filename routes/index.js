const { APP_KEY } = process.env
const app = require('express').Router()
const { header, validationResult } = require('express-validator')

const rulesApiKey = () => [header('app_key', 'APP KEY tidak sesuai.').custom(checkApiKey)]
const validate = (req, res, next) => {
    const err =  validationResult(req)

    console.log(`err-validator`, err)
    if(err.isEmpty()) return next()
    res.status(401).send({
        success: false, 
        messages: [
            'Tidak diizinkan.'
        ], 
        payload: err
    })
}

const checkApiKey = async (value, { req }) => {
    try {
        // if(!value) throw new Error()
        // else if(value != APP_KEY) throw new Error()
        // else 
        return true    
    } catch (e) {
        throw new Error(e.message)
    }
}

app.use('/v1/tokens', rulesApiKey(), validate, require('./token.load.js'))
app.use('/v1/token', rulesApiKey(), validate, require('./token.load_by_id.js'))
app.use('/v1/projects', rulesApiKey(), validate, require('./project.load.js'))

module.exports = app