
# node-rest-api
A RESTful API for the Orange Sensors project. 

## Usage

 Route   	                             |    HTTP Verb       |      Description                                  
--------------------------------------------|------------------  |--------------------------                      
 /sensors/all	 	                     |        GET   	  |    Get all sensor details                         
 /sensors/find/:id 	                     |        GET         |    Find a specific sensor by id 	              
 /sensors/find/range/:id/:to           	     |	      GET         |    Get a list of sensors in specified range       
 /sensors/find/measures/:type 	     | 	      GET         |    Get sensors by type of measurement	      
 /sensors/find/application/:type 	     | 	      GET         |    Get sensors by type of application 	      
 /sensors/history/all                       |        GET         |    Show all sensors readings history             
 /sensors/history/find/:id               |        GET         |    Show history of specific sensor                
 /sensors/history/from/:id/:date      |        GET         |    Show history of a sensor from specified date  
  

##Further Information 

**Due to the way CQL databases handle string queries, calls to the database using the API are case sensitive. 
Example: A distinction is made between /find/measures/DISTANCE and find/measures/Distance
---------------------------------------------------------------------------------------------------------------------------
**Usage of date / timestamp based route (/sensors/history/from/:id/:date) for querying should be specified in format of either YYYY-MM-DD or alternatively
to be more specific, append THH:MM:SS to the end of YYYY-MM-DD
Example: 2015-05-21 for YYYY-MM-DD  and   2015-05-21T15:32:12 for YYYY-MM-DDTHH:MM:SS format
---------------------------------------------------------------------------------------------------------------------------
**At present, due to the API's public status, only .get() calls have been implemented. 
Likewise, this is also true for the Java API which can be found [here](https://github.com/GulliverJ/OrangeSensorsJavaAPI). 
This however, is open to expansion. 



#LIVE TEST@ https://orange-peel.herokuapp.com/sensors/











 

