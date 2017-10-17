# Fake SMMT Service
Fake SMMT service written in Node.js and deployed as a lambda function on AWS.

Assigned JIRA: BL-6132

# [Software Development Quality Assurance Policy](docs/NodejsDevQuality.md)


# Documentation
### Supported SMMT endpoints

* Endpoint used to verify if vehicle has outstanding recall
```
POST /vincheck
```

* Endpoint returning list of supported vehicles brands
```
POST /marque
```

* Endpoint used to verify SMMT service availability
```
/serviceavailability
```

Full fake SMMT api documentation with requests examples is located [on Postman page](https://documenter.getpostman.com/view/649866/fake-local-smmt/71B3Xsx)

##
### How to start

* Clone repo
* Go to app folder
* Execute command
```
npm install
```
* Execute command
```
npm start
```

It will start express.js app on localhost port 3000

##
### How to develop

* Download Visual Studio Code
```
brew cask visual-studio-code
```
* Execute command
```
npm install
```
* Start npm watchers in Visual Studio Code terminals
```
npm run test:watch
npm run lint:watch
```

##
### Provided npm commands
* npm start -> It will start web app on localhost:3000 using debug api key and any change will reload server (thx to [nodemon](https://github.com/remy/nodemon))
* npm test -> It will execute unit, integration tests and unit tests code coverage check.
* npm run test:watch -> It starting file watcher who will trigger tests if any file will change
* npm run retire -> It will check libraries for safety
* npm run lint -> It will trigger JavaScript code style check (esLint)
* npm run lint:watch -> It will start file watcher and trigger esLint if anything change will be detected
* npm run report -> Generate tests coverage report (check app/coverage/index.html for details)
* npm run build -> Create release zip package in app/dist/ folder
