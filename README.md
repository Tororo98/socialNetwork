# socialNetwork
Basic API handler using ExpressJs
Technical Test

Installation guide

1. npm add express mongoose dotenv helmet morgan nodemon:
	Express is the nodeJs framework - server will run here
	Mongoose is used to create the MongoDB models inside the non relational database.
	dotenv secret url for the database
	helmet secure request on server
	morgan handle requests easier
	nodemon as the name sugests is a demon that allows us to automatically update application with any change made

2. MongoDB:
	user: Adm0n
	pass: lP8QSHazssDwOrya
	GET methods can't be async but POST methods must be async

3. Run the server:
	npm start
	the server should be running on: localhost:8800/

	For user actions:
		localhost:8800/api/users

	For authentication:
		localhost:8800/api/users/register
		localhost:8800/api/users/login

	For Posts actions:
		localhost:8800/api/posts

		To update a post is necessary to have both the userId and the postId
