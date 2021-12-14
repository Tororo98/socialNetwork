

# socialNetwork
Basic API handler using ExpressJs
Technical Test Teleperformance

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
		
		
4. This part of the project can be tested using Postman with the following routes:
	localhost:8800/api/posts -> To create a post
		Body: 
		{
    			"userId":"61b79c6266ba92917b1bc890",
    			"desc":"Brb..."
		}
	localhost:8800/api/posts/:PostId -> To update the post
		{
    			"desc":"Don't copy me Jane!",
    			"userId":"61b79c6266ba92917b1bc890"
		}
	http://localhost:8800/api/auth/register -> To register in the database
		{
    			"username": "anyUser",
    			"email": "anyUser@gmail.com",
    			"password":"anyPass"
		}
	http://localhost:8800/api/auth/login -> To login
		{
    			"email":"anyUser@gmail.com",
    			"password":"12345678"
		}
	http://localhost:8800/api/users/61b79c6266ba92917b1bc890/follow -> To follow user
		{
    			"userId":"61b77d7d12a3153945faa06e"
		}
	http://localhost:8800/api/users/61b79c6266ba92917b1bc890/unfollow -> To unfollow user
		{
    			"userId":"61b77d7d12a3153945faa06e"
		}
	localhost:8800/api/posts/61b7b87e8ee7f52f3dd3e368/like -> like or dislike post
		{
    			"userId":"61b77d7d12a3153945faa06e"
		}
	localhost:8800/api/posts/:PostId -> get specific post
		No body required
	localhost:8800/api/posts/timeline/all -> get all posts
		{
    			"userId":"61b77d7d12a3153945faa06e"
		}
