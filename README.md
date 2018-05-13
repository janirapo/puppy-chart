# Puppy Chart
This is a project for a school course called Full stack-websovelluskehitys at University of Helsinki

The final application will be, as the name implies, a full stack web application for tracking random stuff about puppies or actually anything you want, but I got the idea from a puppy we're getting in a few months.

The basic principle of the app is that the user should be able to sign in and add/modify/remove dog instances, add various data related to the instances and produce different graphs based on data.

For example you could add the weight of the puppy a couple times a week by setting weight and date and the app would then produce a graph showing the development. One could also add the height once a week and the app should be able to produce a graph showing the relation between weight and height.

The specifications might live a bit during development, but this would be the initial idea.

### Install and run (development)
1. Copy `config/local.config.js.dist` into `config/local.config.js`
2. Fill in the configuration settings that you want
3. Database creation queries are located in `docs/db/schema.sql` (only tested with mysql)
4. Install dependencies using
```npm install```
5. Run server and client using
```npm start```
6. Navigate to `localhost:3000`

### Deployment (Heroku in this case)
In case you want to deploy the project for instance on a service like Heroku,
then it is not advised to use a separate config file that is a part of the project.
Instead, you should take use of `process.env`-variables.

You might also need to create a separate database that is publicly accessible and then 
add the required configurations to access it. Or at least that's what I did.

Here is a list of minimum variables that need to be set for Heroku deployment:
```
NODE_ENV //'deployment' or 'production'
SECRET //secret, that is used for JWT
USE_ENV_DB_CONFIG //true or false - if true, then local.config.js is not loaded for db conf
DB_HOST //database hostname
DB_NAME //database name
DB_USER //database username
DB_PASSWD //database password
```

Webpack is run using the `heroku-postbuild` script found in `package.json`

Thank you to this awesome tutorial for helping me with the Heroku deployment,
when I had no idea what I was doing...
`https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment`
