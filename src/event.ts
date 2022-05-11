import {copyMetadata} from "./helpers/copy-metadata";

export const NewRelicEvent = (eventType: string, attributes: Record<string, string | number | boolean> ) => (
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
        nr.recordCustomEvent(eventType, attributes)
        method.apply(this, args);
    };
    copyMetadata(method, descriptor.value)
    return descriptor;
}