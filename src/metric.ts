import {copyMetadata} from "./helpers/copy-metadata";

export const NewRelicIncrementMetric = (category: string, name: string, value: number = 1) => (
    target: any,
    name: string,
    descriptor: PropertyDescriptor
) => {
    type NewRelic = typeof import('newrelic')
    let nr: NewRelic | null = null;
    try {
        // Dynamically load newrelic, in case it is not installed
        nr = require('newrelic');
    } catch { }

    const method = descriptor.value;
    descriptor.value = function (...args: any) {
        nr.incrementMetric(`Custom/${category}/${name}`, value)
        method.apply(this, args);
    };
    copyMetadata(method, descriptor.value)
    return descriptor;
}

export const NewRelicRecordMetric = (category: string, name: string, value: number = 1) => (
    target: any,
    name: string,
    descriptor: PropertyDescriptor
) => {
    type NewRelic = typeof import('newrelic')
    let nr: NewRelic | null = null;
    try {
        // Dynamically load newrelic, in case it is not installed
        nr = require('newrelic');
    } catch { }

    const method = descriptor.value;
    descriptor.value = function (...args: any) {
        nr.recordMetric(`Custom/${category}/${name}`, value)
        method.apply(this, args);
    };
    copyMetadata(method, descriptor.value)
    return descriptor;
}