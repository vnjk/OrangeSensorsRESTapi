var frisby = require('frisby');

//TESTING FOR ROUTE: /sensors/all

frisby.create('Get entire list of sensor meta data')
  .get('https://orange-peel.herokuapp.com/sensors/all')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('*', {
    "global_id": Number,
    "application": function(val) { expect(val).toBeTypeOrNull(String); },
    "first_added": function(val) { expect(val).toBeTypeOrNull(String); },
    "lat": function(val) { expect(val).toBeTypeOrNull(Number); },
    "lng": function(val) { expect(val).toBeTypeOrNull(Number); },
    "measures": function(val) { expect(val).toBeTypeOrNull(String); },
    "reading": function(val) { expect(val).toBeTypeOrNull(Number); },
    "timestamp": function(val) { expect(val).toBeTypeOrNull(String); },
    "unit": function(val) { expect(val).toBeTypeOrNull(String); }
  })
.toss();

//checking route  sensors/all specifically for one existing json object 

frisby.create('Get specific meta data of sensor with ID 11')
  .get('https://orange-peel.herokuapp.com/sensors/all')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON('?', {
        "global_id": 11,
        "application": "Orange Parking",
        "first_added": "2015-04-07T13:35:04.699Z",
        "lat": 51.524454,
        "lng": -0.131767,
        "measures": "distance",
        "unit": "cm"
    })
.toss();

//TESTING FOR ROUTE: /sensors/find/:id 

frisby.create('Get all data pertaining to specific sensor ID = 11')
  .get('https://orange-peel.herokuapp.com/sensors/find/11')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('?', {
    "global_id": Number,
    "application": function(val) { expect(val).toBeTypeOrNull(String); },
    "first_added": function(val) { expect(val).toBeTypeOrNull(String); },
    "lat": function(val) { expect(val).toBeTypeOrNull(Number); },
    "lng": function(val) { expect(val).toBeTypeOrNull(Number); },
    "measures": function(val) { expect(val).toBeTypeOrNull(String); },
    "reading": function(val) { expect(val).toBeTypeOrNull(Number); },
    "timestamp": function(val) { expect(val).toBeTypeOrNull(String); },
    "unit": function(val) { expect(val).toBeTypeOrNull(String); }
  })
.toss();


//TESTING FOR ROUTE: /sensors/find/:id/:to 

frisby.create('Get all data of sensors from id = 10 to id = 15')
  .get('https://orange-peel.herokuapp.com/sensors/find/range/10/15')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('*', {
    "global_id": Number,
    "application": String,
    "first_added": String,
    "lat": Number,
    "lng": Number,
    "measures": String,
    "reading": Number,
    "timestamp": String,
    "unit": String,
  })
.toss();

//TESTING FOR ROUTE: /sensors/find/measures/:type 

frisby.create('Get data of sensor(s) measuring distance')
  .get('https://orange-peel.herokuapp.com/sensors/find/measures/distance')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON('*', {
        "measures":"distance",
    })
.toss();

//TESTING FOR ROUTE: /sensors/find/application/:type 

frisby.create('Get data of sensor(s) of application type Orange Parking')
  .get('https://orange-peel.herokuapp.com/sensors/find/application/Orange Parking')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON('*', {
        "application": "Orange Parking",
    })
.toss();

//TESTING FOR ROUTE: /sensors/history/all

frisby.create('Get entire list of sensor reading history')
  .get('https://orange-peel.herokuapp.com/sensors/history/all')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('*', {
    "global_id": Number,
    "timestamp": String,
    "reading": Number,
  })
.toss();


//TESTING for ROUTE: sensors/history/find/:id

frisby.create('Get specific readings history of sensor with id = 15')
  .get('https://orange-peel.herokuapp.com/sensors/history/find/15')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON('?', {
    "global_id": 15,
    "timestamp": "2015-04-28T15:21:51.567Z",
    "reading": 29,
  })
.toss();

//TESTING for ROUTE: sensors/history/from/:id/:date
//less specific form: DD/MM/YYYY

frisby.create('Get all readings from a specified point in time for sensor with id = 15')
  .get('https://orange-peel.herokuapp.com/sensors/history/from/15/2015-04-28')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
   .expectJSONTypes('*', {
    "global_id": Number,
    "timestamp": String, //technically want to create a function to test for the date > curr specified in url
    "reading": Number,
  })
  .expectJSON('*', {
   "timestamp": function(val) { return new Date(val) >= new Date("2015-04-28"); }
  })
.toss();


//TESTING for ROUTE: sensors/history/from/:id/:date
//more specific form with time included



frisby.create('Get all readings from a specified point in time for sensor with id = 15')
  .get('https://orange-peel.herokuapp.com/sensors/history/from/15/2015-04-28T16:44:25')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
   .expectJSONTypes('*', {
    "global_id": Number,
    "timestamp": String, //technically want to create a function to test for the date > curr specified in url
    "reading": Number,
  })
   .expectJSON('*', {
   "timestamp": function(val) { return new Date(val) >= new Date(2015, 3, 28, 16, 44, 25, 0); }
  })
.toss();

