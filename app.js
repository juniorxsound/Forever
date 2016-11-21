//////EXPRESS////////
const express = require('express');
const app = express();

////////HTTP/////////
const http = require('http').createServer(app);

//Port and server setup
let port = process.env.PORT || 5555;

//Server
let server = app.listen(port);

//Console the port
console.log('Server is running localhost on port: ' + port );

/////SOCKET.IO///////
const io = require('socket.io').listen(server);

////////EJS//////////
const ejs = require('ejs');

//GLOBAL VARIABLES///
let usersCounter;
let sockets = {};
let userType;

//Setup the views folder
app.set("views", __dirname + '/views');

//Setup ejs, so I can write HTML(:
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');

//Setup the public client folder
app.use(express.static(__dirname + '/public'));

//Socket setup
io.on('connection', client=>{

	//Players and conductors introduce yourself
	client.on('introduction', who=>{
		
		userType = who;

		if ( userType == 'conductor' ){

			//Conductor connected log
			console.log('A conductor connected');

		} else if ( userType == 'player' ){

				//Add the user to the identifiening object
				sockets[client.id] = client;

				usersCounter = Object.keys(sockets).length;

				//User connected log
				console.log('A player connected');
				console.log('There are currently ' + usersCounter + ' players connected');

				// Everytime a user connects notify all users and pass a number
				io.sockets.emit('user', usersCounter);

		} else {

				console.log('Error, type of user not defined');

		}

	});

	client.on('geolocation', geodata=>{

		if (geodata != null){

			console.log(geodata);

		}

	});

		//Disconnecting a user
		client.on('disconnect',()=>{

			if ( userType == 'player' ){

				//Remove the user id from the userTable object
				delete sockets[client.id];

				//Another one bites to dust
				usersCounter = Object.keys(sockets).length;
				if( usersCounter == 0 ){
					console.log('A player disconnected');
					console.log('There are currently no players connected');
				} else {

					//User disconnected log
					console.log('A player disconnected');
					console.log('there are currently ' + usersCounter + ' player connected');

				}
			
				userType == 'player';

			} else if ( userType == 'conductor' ) {

				console.log('A conductor dissconected');

				userType == 'conductor';

			}

			// //Everytime a user disconnects notify all users and pass a number
			io.sockets.emit('user', usersCounter);

		});

});

/////////////////////
//////ROUTER/////////
/////////////////////

//Client view
app.get('/', (req, res) => {

	res.render('index.html');

});

//Conductor view
app.get('/conductor.html', (req, res) => {

	res.render('conductor.html');

});

//404 view
app.get('/*', (req, res) => {

	res.render('404.html');

});

// setInterval(function(){
// console.log(userTable);
// console.log(usersCounter);
// }, 1000);


