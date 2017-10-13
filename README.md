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
