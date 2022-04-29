# New Relic Decorators

## Installation:
1. install New Relic Agent: 

    https://docs.newrelic.com/docs/apm/agents/nodejs-agent/installation-configuration/install-nodejs-agent/
3. `npm i new-relic-decorators`

## Usage:

### NewRelicTransaction
Add decorator *NewRelicTransaction* for trigger transaction into New Relic dashboard. If transaction as param is not provided, the name of method will be used.
```typescript
@NewRelicTransaction("/notification/test")
async someMethod(){
    console.log("something...");
}
```

### NewRelicRecordMetric
Add decorator *NewRelicRecordMetric* for trigger new record metric. Record metric is used to create a new custom metric.
```typescript
@NewRelicRecordMetric("cart", "chargeAmount", 100)
async someMethod(){
    console.log("something...");
}
```

### NewRelicIncrementMetric
Add decorator *NewRelicIncrementMetric* for trigger new increment metric. Increment metric is used to update the value of a custom metric.
```typescript
@NewRelicIncrementMetric("page", "pageViews", 1)
async someMethod(){
    console.log("something...");
}
```


### NewRelicEvent
Add decorator *NewRelicEvent* for trigger new event. The attributes must be an object of key and value pairs. The keys must be string, and the values must be string, number, or boolean.
```typescript
@NewRelicEvent("customEvent", {"event": 1})
async someMethod(){
    console.log("something...");
}
```