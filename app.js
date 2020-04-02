const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// app.use(express.static(__dirname+'/client'));
 app.use(bodyParser.json());

Genre =require('./models/genre');
Book =require('./models/Book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore',{useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/details or /api/user');
});


// app.get('/api/user', (req, res) => {
// 	Genre.getGenres((err, genres) => {
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genres);
// 	});
// });

// app.get('/api/user', verifyToken,(req, res) => {
// 	jwt.verify(req.token, 'secretkey', (err, resp) => {
// 	Genre.getGenres((err, genres) => {
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genres);
// 	});
// });
//  });


app.get('/api/token',(req,res)=>
{
	const user={
		id:1,
		username:'brad',
		email:'brad@gmail.com'
	}
	jwt.sign({user},'secretkey',{ expiresIn: '3600s' },(err,token)=>
	{res.json({
      token
	});
	});
});

app.get('/api/user', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err1, authdata) => {
  	if(err1)
  	{
  		throw err1;
  	}
  	else
  	{
    Genre.getGenres((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
}
  });
});


function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}


app.post('/api/user',(req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

// app.get('/api/posts', verifyToken, (req, res) => {  
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: 'Post created...'
//       });
//     }
//   });
// });

app.put('/api/user/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.delete('/api/user/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/details', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err1, resp) => {
		if(err1)
		{
			throw err1;
		}
		else
		{
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
}
});
	});

app.get('/api/details/:_id', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err1, resp) => {
		if(err1)
		{
			throw err1;
		}
		else
		{
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
}
});
	});

app.post('/api/details', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/details/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/details/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(80);
console.log('Running on port 80...');
