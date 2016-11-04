var express = require('express'),
	 app = express(),
	 bodyParser = require('body-parser'),
	 fs = require('fs'),
	 mongoose = require('mongoose'),
	 multipart = require('connect-multiparty'),
	 multipartMiddleware = multipart(),
	 newPath = '',
	 ContentType = '';

app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));

mongoose.connect('mongodb://localhost/items');
var ItemsSchema = new mongoose.Schema({
	name:String,
	img:{data:String, contentType: String},
	price: Number
});
var Item = mongoose.model('Item',ItemsSchema);

app.get('/items',function(req,res){
	Item.find(function(err,doc){
		res.json(doc);
	});
});
app.get('/items/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	Item.findById(id , function(err, doc){
		res.json(doc);
	});
});	
app.post('/upload', multipartMiddleware, function(req,res){
	newPath = '';
	ContentType = '';
	var files = req.files;
	console.log(files.f);
	if(files.f === undefined){
		console.log('No file!');	
	}
	else{
	newPath = req.files.f.path;
	ContentType = req.files.f.type;
	}
});
app.post('/additem', function(req, res){
	var itm = new Item;
	itm.name = req.body.name;
	itm.price = req.body.price;
	if(newPath ==='') {
		itm.img.data = fs.readFileSync(__dirname+"/public/img/do-it.png").toString('base64');
		itm.img.contentType = 'image/png';
	}
	else{
		itm.img.data = fs.readFileSync(newPath).toString('base64');
		itm.img.contentType = ContentType;
		newPath='';
	}
	itm.save(function(err, doc){
	if(err)
		console.log(err);
	else
		res.json(doc);
	});
});
app.put('/items/:id', function(req,res){
	var id = req.params.id;
	if(newPath === ''){
		Item.findOneAndUpdate({_id : id},{name:req.body.name, price:req.body.price},function(err,doc){
			res.json(doc);
		});
	}
	else{
		var edit = fs.readFileSync(newPath).toString('base64');
		Item.findOneAndUpdate({_id : id},{name:req.body.name,img:{data: edit, contentType: ContentType}, price:req.body.price},function(err,doc){
			res.json(doc);
		});
	}

});
app.delete('/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	Item.findByIdAndRemove(id,function(err,doc){
		if(err)
			console.log(err);
		else
			res.json(doc);
	});
});

app.listen(3000);
console.log("Server is running on port 3000!");