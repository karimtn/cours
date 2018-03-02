const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const api = require('./server/routing/api')
const auth = require('./server/routing/auth')

app.use('/api',api);
app.use('/auth',auth);

app.use(express.static(__dirname+"/dist"));

app.use('*',(req,res)=>{
  res.sendFile(__dirname+'/dist/index.html');
});

app.listen(port, err=>{
    if (err) throw err;
    console.log(`the server is running on port ${port}`)
});
