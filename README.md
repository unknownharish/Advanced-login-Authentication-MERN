the project is made using MERN stack.

The Authentication is token based.

when there is no error in entering inputs then it makes an axios request to backend.

modules used:

-dotenv,
-jsonwebtoken,
-express,
-mongoose,
-bcryptjs,
-sendGrid


when there is a valid credentiels the server generate a token which contain some info about user this token is used to access the dashboard "/".



In the project directory, you can run:

for starting Frontend running at port 3000
### `npm start`

for starting server running at port 80
### `node server `

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### `/login` - to login
### `/forgotpassword` - to forgotpass
### `/register` - to newuser
### `/` - to root dashboard





