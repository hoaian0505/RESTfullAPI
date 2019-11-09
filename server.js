const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


const users = [{
    id:1,
    name:"Hoai An",
    email:"an.nguyen@gcalls.co"
},
{
    id:2,
    name:"An Hoai",
    email:"nguyen.an@gcalls.co"
},
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}))

app.set('view engine', 'ejs');
/*axios.get('http://localhost:3000/users/')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
*/
app.get('/',function(req,res){
        //res.send('Hello World');
        var drinks = [
          { name: 'Bloody Mary', drunkness: 3 },
          { name: 'Martini', drunkness: 5 },
          { name: 'Scotch', drunkness: 10 }
        ];
        var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";


        res.render('pages/index',{
        drinks: drinks,
        tagline: tagline
        });
});

app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.get('/users',function(req,res){
    res.send(users);
})



/*
mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
if (err) {
  console.error(err)
}

//...
const db = client.db('mydb');
const collection = db.collection('dogs');
collection.insertOne({name: 'Roger'}, (err, result) => {

})
collection.insertMany([{name: 'Togo'}, {name: 'Syd'}], (err, result) => {

})

collection.find().toArray((err, items) => {
  console.log(items)
})

collection.find({name: 'Togo'}).toArray((err, items) => {
  console.log(items)
})

client.close()
})
*/

var collection;
app.listen(5000,() => {
    console.log("Ung dung Node.js dang hoat dong")
    mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) {
      console.error(err)
    }
    db = client.db('mydb');
    collection = db.collection('personnel');
    console.log('Connected to database');
    /*collection.find().toArray((err, items) => {
      console.log(items)
    })*/
  }); 
});

app.post('/personnel', (request, response) => {
  // var data = request.body 
  collection.insertOne(request.body, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
      console.log('da them 1 database');
  });
});

app.put('/personnel/:id', (request, response) => {
  var getid = request.params.id; 
  var data = request.body; 
  collection.updateOne({_id: '5dc6828db33cc737b6df502f'},{$set: { name: 'HoaiAn1', Company: 'Gcalls2' }}, (error, result) => {
      if(error) {
        return response.status(500).send(error);
      }
      response.send(result);
      console.log('da sua 1 database');
      console.log(getid);
      console.log(data);  
  })
});

app.delete('/personnel/:id', (request, response) => {
  var getid = request.params.id;
  collection.deleteOne({_id: getid}, (error, result) => {
      if(error) {
        return response.status(500).send(error);
      }
      response.send(result);
      console.log('da xoa 1 database');
  })
});

app.get('/personnel', (request, response) => {
  collection.find({_id: '5dc6828db33cc737b6df502f'}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      console.log(result)
      response.send(result);
      /*response.render('pages/personnel',{
          datas : result
      });*/
  });
});
