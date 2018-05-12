# puppy-chart
This is a project for a school course called Full stack-websovelluskehitys at University of Helsinki

The final application will be, as the name implies, a full stack web application for tracking random stuff about puppies or actually anything you want, but I got the idea from a puppy we're getting in a few months.

The basic principle of the app is that the user should be able to sign in and add/modify/remove dog instances, add various data related to the instances and produce different graphs based on data.

For example you could add the weight of the puppy a couple times a week by setting weight and date and the app would then produce a graph showing the development. One could also add the height once a week and the app should be able to produce a graph showing the relation between weight and height.

The specifications might live a bit during development, but this would be the initial idea.

### Install and run
1. Copy `config/local.config.js.dist` into `config/local.config.js`
2. Fill in the configuration settings that you want
3. Database creation queries are located in `docs/db/schema.sql` (only tested with mysql)
4. Install dependencies using
```npm install```
5. Run server and client using
```npm start```
6. Navigate to `localhost:3000`
