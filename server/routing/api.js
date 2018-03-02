const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


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
    res.status(code).json(response);
  };

  // Response handling
  let response = {
    status: 200,
    data: [],
    message: null
  };

  router.get('/:id/todos',(req,res)=>{
    let qry = {_id:ObjectID(req.params.id)};
    connection(db=>{
        db.collection('users').findOne(qry).then(result=>{
            response.data = result.todos;
            response.message= "OK";
            res.json(response);
        }).catch(err=>{
            sendError(err,res,501);
        })
    })
})

router.post('/:id/todos',(req,res)=>{
  let qry = {_id:ObjectID(req.params.id)};
  connection(db=>{
      db.collection('users').update(qry,{$push:{todos:req.body}}).then(result=>{
          response.data = result;
          response.message= "OK";
          res.json(response);
      }).catch(err=>{
          sendError(err,res,501);
      })
  })
})

router.get('/:id/todos/:iTodo',(req,res)=>{
    let qry = {_id:ObjectID(req.params.id)};
    connection(db=>{
        db.collection('users').findOne(qry).then(result=>{
            response.data = result.todos[req.params.iTodo];
            response.message= "OK";
            res.json(response);
        }).catch(err=>{
            if(err)throw err;
            res.send(err);
        })
    })
})







module.exports = router;
