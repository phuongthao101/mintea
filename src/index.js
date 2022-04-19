import express from 'express'
import configViewEngine from './configs/viewEngine.js'
import initWebRoute from './routes/webRoute.js'
import session from 'express-session'

const app = express()
const port = 3030

app.use(express.static('./src/public'))
configViewEngine(app)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
}))

initWebRoute(app)

app.listen(port, (req, res) => {
    console.log('listening on port ' + port)
})

