const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');


const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/AppCourses', (err, client) => {
      if (err) return console.log(err);
      let db = client.db('AppCourses');
      closure(db);
  })
}


// Error handling
const sendError = (err, res, code) => {
  response.status = code;
  response.message = typeof err == 'object' ? err.message : err;
  response.data = [];
  res.status(code).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};



router.post('/register', (req, res) => {
  connection(db => {
    db.collection('users').insert(req.body).then(result => {
      response.message = "OK";
      response.data = result;
      response.status = 200;
      res.json(response);
    }).catch(err => {
      sendError(err, res, 409);
    })
  })
})

router.post('/login', (req, res) => {
  connection(db=>{
    // console.log(req.body);
    db.collection('users').findOne({email:req.body.email}).
    then(result=>{
      if(!result) sendError("User not found",res,401);
      if(result.password === req.body.password){
        let token = jwt.sign({id:result._id},'secret',);
        response.data= {token:token};
        response.message='ok';
        response.status = 200;
        res.json(response);
      }else{
        sendError('Login Invalide',res,401);
      }
    }).catch(err=>{
      sendError(err,res,500);
    })
  })
})


module.exports = router;
