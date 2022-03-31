let express = require('express');
let app =express();
app.get('/', function(req,res){
     res.send('hello, world!')
})
app.get('/Yo', function(req,res){
     res.send('Yo')
})
let server = app.listen(3000,function(){
     console.log('Server running at http://localhost:' + server.address().port)
})