# URL Shorter Service


The url shorterner service is basically to generate short code for urls supplied to the service for this purpose

### Features
* 1. Fetch star wars movies
* 2. Fetch movie characters
* 3. Add comment to movie and retrieve comments


## Deployment
* This app is deployed on Heroku ::: https://movie-app-pay.herokuapp.com
* Documentation on [Postman](https://documenter.getpostman.com/view/6547388/2s93Y5Nz8v)

## Technology used
[Node js](https://nodejs.org/en/)
[Express](https://expressjs.com/)
[MongoDB](https://www.mongodb.com/)

## Installation
Requires [Node js](https://nodejs.org/en/), Version 14 or higher

Requires Docker (Optional if you have Mongo Installed Locally)

Clone the repository or download and unzip:

`git clone https://github.com/FemiOfficial/movie-app.git`

### Without Docker

Start the App by running:

`npm install`

`npm run build`

`npm run start:prod`


### With Docker

`git clone https://github.com/FemiOfficial/movie-app.git`

`nano .env (set all env as describle in env.example)`

`docker compose up`
