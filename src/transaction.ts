import {copyMetadata} from "./helpers/copy-metadata";

export const NewRelicTransaction = (transactionName: string = ""): any => (
    target: any,
    key: any,
    descriptor: PropertyDescriptor
): any => {
    type NewRelic = typeof import('newrelic')
    const method = descriptor.value;
    const trimSlashes = str => str.split('/').filter(v => v !== '').join('/');
    const transactionIdentifier = trimSlashes(transactionName).length > 0 ? trimSlashes(transactionName) : key.toString();
    let nr: NewRelic | null = null;
    try {
        // Dynamically load newrelic
        nr = require('newrelic');
    } catch {
        return descriptor
    }

    if(nr){
        descriptor.value = async function (...args) {
            return new Promise((resolve, reject) => {
                nr.startWebTransaction(transactionIdentifier, async () => {
                    const transaction = nr.getTransaction();
                    const result = await method.apply(this, args);
                    transaction.end();
                    return resolve(result);
                })
            })
        };
        copyMetadata(method, descriptor.value)
    }
    return descriptor
}