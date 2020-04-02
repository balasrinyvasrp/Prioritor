const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
	Patient_name:{
		type: String,
		required: true
	},
	Age:{
		type: String,
		required: true
	},
	Gender:{
		type: String
	},
	Weight:{
		type: String,
		required: true
	},
	Blood_Group:{
		type: String
	},
	Blood_Pressure:{
		type: String
	},
	Spo2_Level:{
		type: String
	},
	Problems:{
		type: String
	},
	Specific_Details:{
		type: String
	},
	Degree_of_Burn:{
		type: String
	},
	BSA_Value:{
		type: String
	},

	create_date:{
		type: Date,
		default: Date.now
	}
});

const Book = module.exports = mongoose.model('Book', bookSchema);
// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		Patient_name: book.Patient_name,
		Age: book.Age,
		Gender: book.Gender,
		Weight: book.Weight,
		Blood_Group: book.Blood_Group,
		Blood_Pressure: book.Blood_Pressure,
		Spo2_Level: book.Spo2_Level,
		Problems: book.Problems,
		Specific_Details: book.Specific_Details,
		Degree_of_Burn: book.Degree_of_Burn,
		BSA_Value: book.BSA_Value

	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}