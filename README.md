# Puppy Chart

This is a project for a school course called Full stack-websovelluskehitys at University of Helsinki

The final application is, as the name implies, a full stack web application for tracking the height and 
weight of your pet. I got the idea from a puppy that we got this month and I didn't want to use Excel...

The basic principle of the app is that the user is be able to sign in and add/modify/remove pet instances, 
add various data related to the instances and produce different graphs based on data.

For example you could add the weight of the puppy a couple times a week by setting weight and date and the 
app would then produce a graph showing the development. One could also add the height once a week and the app 
should be able to produce separate graphs showing both height and weight curves based on entered data.

#### Brief user manual
You can register new users on the login page and after that sign in to the app. **Be sure to save your password used
in registering process, because at the moment there is no way to recover/reset passwords!!!**

On main page you can add new pets, view basic info about the pets, and by clicking the row you can
open more detailed info about the chosen pet. You can view/add/remove weight or height measurements
and you can also remove existing pets.

***

### Install and run (development)

1. Copy `config/local.config.js.dist` into `config/local.config.js`
2. Fill in the configuration settings that you want
3. Database creation queries are located in `docs/db/schema.sql` (only tested with mysql)
4. Install dependencies using
   `npm install`
5. Run server and client using
   `npm start`
6. Navigate to `localhost:3000`

### Deployment (Heroku in this case)

In case you want to deploy the project for instance on a service like Heroku,
then it is not advised to use a separate config file that is a part of the project.
Instead, you should take use of `process.env`-variables.

You might also need to create a separate database that is publicly accessible and then
add the required configurations to access it. Or at least that's what I did.

(I used `https://www.freemysqlhosting.net/` as  database provider. Only downside for the free account is
a 5MB size limit and you have to click a link once a week, that indicates that you are still using the database)

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
