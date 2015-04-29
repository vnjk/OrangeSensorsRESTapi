//BASIC SETUP 
//===============================================================================

//Calling required packages
var express = require("express");
var cassandra = require("cassandra-driver");
var app = express();

//Initialising connection to Nosql Cassandra database
var client = new cassandra.Client( { contactPoints : [ '128.16.80.125' ], keyspace : 'orangesystem'} );
client.connect(function(err, result) {
    console.log('Connected.');
});


app.set('port', process.env.PORT || 1995 ); //setting port number for local testing


var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
	console.log('An API request received...');
    res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    
    if (req.method == 'OPTIONS') {
    	return res.sendStatus(200);
    }
    
    next(); 
});

// test route to make sure everything is working 
router.get('/', function(req, res){
	res.json({
		message: "API ONLINE!"
	});
});


//Setting ROUTES for API 
//=====================================================================================

// all routes will be prefixed with /sensors

app.use('/sensors', router);



//Show all sensors 
router.route('/all')

	.get(function(request,response){
		client.execute("SELECT * FROM sensor_details;", function(err,result){
		
				console.log("Executed Query");	
					if(!err)
						response.json(result.rows);
					else
						response.json(err);
			});
	});

//new route which can be accessed @ /sensors/find
router.route('/find/:id') 

//find a specific sensor by global_id
	.get(function(request, response){

		client.execute("SELECT * FROM sensor_details WHERE global_id=" + request.params.id +";", function(err, result){
		console.log("Executed Query");
		if (!err)
			response.json(result.rows);
		else
			response.json(err);
		}); 


	});

//find a specific set of sensors by specifying start & end IDs. (localhost:1995/sensors?id=_&to=_) 

router.route('/find/range/:id/:to')
		.get(function(request, response){

		var id = request.params.id;
		var to = request.params.to;
	
		var range = rangefinder(parseInt(id),parseInt(to));

		client.execute("SELECT * FROM sensor_details WHERE global_id IN (" + range +") ;", function(err, result){
			console.log("Executed Query");
			if (!err)
				response.json(result.rows);
			else
				response.json(err);
		}); 

	});

//finds all sensors dealing with specified measure 

router.route('/find/measures/:type')

	.get(function(request, response){
		client.execute("SELECT * FROM sensor_details WHERE measures = '" + request.params.type +"';", function(err, result){
		console.log("Executed Query");
		if (!err)
			response.json(result.rows);
		else
			response.json(err);
		}); 


	});

//finds all sensors dealing with specified application 

router.route('/find/application/:type')
	.get(function(request, response) {
		client.execute("SELECT * FROM sensor_details WHERE application = '" + request.params.type +"';", function(err, result){
		console.log("Executed Query");
		if (!err)
			response.json(result.rows);
		else
			response.json(err);
		}); 

	});


//new route for alt. table 

router.route('/history/all')

	.get(function(request, response){

		client.execute("SELECT * FROM data_archive;", function(err, result){
		console.log("Executed Query");
		if (!err)
			response.json(result.rows);
		else
			response.json(err);
		}); 

	});

//find the history of readings for a particular (specified) global sensor id
router.route('/history/find/:id')

	.get(function(request, response){

		client.execute("SELECT * FROM data_archive WHERE global_id=" + request.params.id + ";", function(err, result){
		console.log("Executed Query");
		if (!err)
			response.json(result.rows);
		else
			response.json(err);
		}); 

	});

//retrieves a specific sensor's reading from (specific time in YYYY-MM-DD format)
router.route('/history/from/:id/:date')
	.get(function(request, response) {
		var id = request.params.id;
		var date = request.params.date;
	
		client.execute("SELECT * FROM data_archive WHERE global_id=" + id + " AND timestamp>='" + date + "';", function(err, result){
			console.log("Executed Query");
			if (!err)
				response.json(result.rows);
			else
				response.json(err);
		}); 

	});


var rangefinder = function(start,end){

	var i;
	var string = "";

	for(i=start; i<=end; i++){

		if (i!=end) {
			string+= i + ",";
			continue;
		};
		string+= i; 
	}
	console.log(string);
	return string;
}



//START THE SERVER
//=============================================================================

var server = app.listen(app.get('port') , function(){
	console.log('Listening on port %d', server.address().port)
});


//SHUT DOWN access to db after use
//==============================================================================
process.on("SIGTERM", function()
{
	client.shutdown(); 
});
