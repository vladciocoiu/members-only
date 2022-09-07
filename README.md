# members-only

## About The Project
This app hosts an exclusive clubhouse where members can write messages. Users cannot see the authors of the messages, unless they become members by entering a "secret" passcode: ```express```.

## Features
* User authentication using ```Passport.js```'s [LocalStrategy](https://www.passportjs.org/packages/passport-local/)
* Password encryption using ```bcrypt.js```
* MVC architecture for the back-end
* Non-relational database, hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try4)

## Stack
* ```Node.js``` + ```Express.js``` for the server-side app
* ```MongoDB``` + ```Mongoose``` for the database
* ```EJS``` templating engine for the client-side app
* ```Sass``` for styling the client-side app
