const cors = require('cors')
const express = require('express')
const compression = require('compression')
const app = express()
const ro = require('../routes')
const path = require('path')
const { PORT } = process.env

app.use(cors())
app.use(compression({ filter: shouldCompress }))
app.use(express.json())
app.use((req, res, next) => {
    req.log = log.child({ req_id: new Date() }, true)
    req.log.info({ req })
    res.on('finish', () => req.log.info({ res }))
    next()
})
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) { res.status(400).send('err : '+ err) } else { next() }
})

app.use(express.static(__dirname))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/template/index.html'))
})

// authenticate
const sequelize = require('../db')
const authenticate = async () => {
    try {
        await sequelize.authenticate();
        console.info('🚀 yey! your database is connected to me.')
    } catch (err) {
        console.error('sorry, something wrong with your connection: ', err)
    }
}

authenticate();
app.use('/api', ro)
app.listen(PORT, function () {
    console.info("🚀 api running in port ' + port, 'server", this.address().port, app.settings.env);
});

// method
function shouldCompress(req, res) {
    if (req.headers['x-no-compression'])
        return false

    return compression.filter(req, res)
}