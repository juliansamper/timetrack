# TimeTrack API
Is a set of tools to help the FrontEnd developer in the making of a portal alike toggl, the project was developed under [nodejs](https://nodejs.org/) with [Typescript](https://www.typescriptlang.org/), [Express](http://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## Documentation

The documentation was build with [Swagger](https://swagger.io/specification/) - [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) and the link is the following:
<br>https://qrvey-js-time-tracker.herokuapp.com/api-docs/

## Installation

### Installing TimeTrack API Locally

First download the project and run the following command.

``` bash
  $ npm install
```

### Deploy the API on Heroku
1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
2. If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
``` bash
  $ heroku login
```
3. Clone the repository
``` bash
  $ heroku git:clone -a qrvey-js-time-tracker
  $ cd qrvey-js-time-tracker
```
4. Deploy your changes
``` bash
  $ git add .
  $ git commit -am "make it better"
  $ git push heroku master
```

## Run Tests
``` bash
  $ npm run test
```
_Important: Ensure the packages Nodemon, Ts-node and Typescript are under the dependencies node in the package.json, NOT in devDependencies_
### Tests Results

The following screenshots are the results of the tests prior to the deploy on heroku, these tests were made with [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest).

#### General - /
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20ALL%20FILES%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - ALL FILES (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Root - /src
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20ALL%20FILES%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - ALL FILES (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### DTO - /src/DTO
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-DTO%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-DTO (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Bussiness - /src/bussiness
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-BUSSINESS%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-BUSSINESS (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Connectors - /src/connectors
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-CONNECTORS%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-CONNECTORS (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Controllers - /src/controllers
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-CONTROLLERS%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-CONTROLLERS (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Middleware - /src/middleware
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-MIDDLEWARE%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-MIDDLEWARE (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Models - /src/models
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-MODELS%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-MODELS (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Routes - /src/routes
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-ROUTES%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-ROUTES (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Services - /src/services
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-SERVICES%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-SERVICES (JEST COVERAGE REPORT - 20210606 220644)">
</p>

#### Utils - /src/utils
<p align="center">
<img src="https://github.com/juliansamper/timetrack/blob/master/screenshots/%5BSCREENSHOT%5D%20UNIT%20TEST%20RESULT%20-%20SRC-UTILS%20(JEST%20COVERAGE%20REPORT%20-%2020210606%20220644).png"
  alt="[SCREENSHOT] UNIT TEST RESULT - SRC-UTILS (JEST COVERAGE REPORT - 20210606 220644)">
</p>


#### Author: [Julian Samper](mailto:juliansamper@gmail.com)
