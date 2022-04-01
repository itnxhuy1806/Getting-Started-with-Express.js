let express = require('express')
let helpers = require('./helpers')
let fs = require('fs')

let router = express.Router({
     mergeParams: true
})

router.all('/', function (req, res, next) {
     console.log(req.method, 'for', req.params.username)
     next()
})

router.get('/', helpers.verifyUser, function (req, res) {
     let username = req.params.username
     let user = helpers.getUser(username)
     res.render('user', {
          user: user,
          address: user.location
     })
})

router.get('/edit', function (req, res) {
     res.send('You want to edit ' + req.params.username + '???')
})

router.put('/', function (req, res) {
     let username = req.params.username
     let user = helpers.getUser(username)
     user.location = req.body
     helpers.saveUser(username, user)
     res.end()
})

router.delete('/', function (req, res) {
     let fp = helpers.getUserFilePath(req.params.username)
     fs.unlinkSync(fp) // delete the file
     res.sendStatus(200)
})

module.exports = router