export const NewRelicEvent = (eventType: string, attributes: Record<string, string | number | boolean> ) => (
    target: any,
    name: string,
    descriptor: PropertyDescriptor
) => {
    let nr;
    try {
        // Dynamically load newrelic, in case it is not installed
        nr = require('newrelic');
    } catch { }

    const method = descriptor.value;
    descriptor.value = function (...args: any) {
        nr.recordCustomEvent(eventType, attributes)
        method.apply(this, args);
    };
}