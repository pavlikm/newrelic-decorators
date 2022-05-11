import 'reflect-metadata'
export function copyMetadata(source: any, target: any): void{
    let result = Reflect.getMetadataKeys(source);
    for(var key of result){
        Reflect.defineMetadata(key, Reflect.getMetadata(key, source), target)
    }
}