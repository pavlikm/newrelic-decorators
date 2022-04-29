#New Relic Decorators

##Installation:
1. install New Relic Agent: 

    https://docs.newrelic.com/docs/apm/agents/nodejs-agent/installation-configuration/install-nodejs-agent/
3. `npm i new-relic-decorators`

##Usage:
Add decorator *NewRelicTransaction* for trigger transaction into New Relic dashboard. If transaction as param is not provided, the name of method will be used.
```typescript
@NewRelicTransaction("/notification/test")
async someMethod(){
    console.log("something...");
}
```