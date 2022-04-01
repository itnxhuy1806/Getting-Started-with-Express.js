let express = require('express');
let app = express();

var fs = require('fs')
let path = require('path')
let _ = require('lodash')
let engines = require('consolidate')
let helpers = require('./helpers.js');

let bodyParser = require('body-parser')

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/favicon.ico', function (req, res) {
     res.end()
})

app.get('/', function (req, res) {
     var users = []
     fs.readdir('users', function (err, files) {
          if (err) throw err
          files.forEach(function (file) {
               fs.readFile(path.join(__dirname, 'users', file), { encoding: 'utf8' }, function (err, data) {
                    if (err) throw err
                    var user = JSON.parse(data)
                    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
                    users.push(user)
                    if (users.length === files.length) res.render('index', { users: users })
               })
          })
     })
})

app.get('*.json', function (req, res) {
     res.download('./users/' + req.path, 'virus.exe')
})

app.get('/data/:username', function (req, res) {
     let username = req.params.username
     let user = helpers.getUser(username)
     res.json(user)
})

app.get('/error/:username', function (req, res) {
     res.status(404).send('No user named ' + req.params.username + ' found')
})

let userRoute = require('./username.js')
app.use('/:username', userRoute)

let server = app.listen(3000, function () {
     console.log('Server running at http://localhost:' + server.address().port)
})