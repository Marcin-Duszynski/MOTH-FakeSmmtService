# MOTH - Fake SMMT Service
Fake SMMT service written in Node.js and deployed as a lambda function on AWS.

Assigned JIRA: BL-6132

##
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

It will start express.js app on port 3000

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
* Start gulp watchers in Visual Studio Code terminals
```
gulp test:watch
gulp lint:watch
gulp retire:watch
```
Gulp cli is required!!!

Happy coding :)

##
### Provided npm commands
* npm start
* npm test 
* npm run prod -> Remove dev dependencies and install production dependencies if needed

### Provided Gulp commands
* gulp -> Execute once tests, linter and retire lib check
* gulp test
* gulp lint
* gulp retire
* gulp test:watch
* gulp lint:watch
* gulp retire:watch
