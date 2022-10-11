import {searchFile} from "./searchFile";
import {PodConditions} from "../models";
import {getProperty} from "./getProperty";


export async function analyzePodConditions(filePath:string): Promise<PodConditions> {
    const searchResults = await searchFile(filePath, "Conditions:");
    const regex = /\s+/g;
    if (searchResults.match) {
        const initialized= (await getProperty(filePath, 'Initialized', {startLine:searchResults.lineNumber, separator:regex})).toLowerCase() === 'true';
        const ready= (await getProperty(filePath, 'Ready', {startLine:searchResults.lineNumber, separator:regex})).toLowerCase() === 'true';
        const containersReady= (await getProperty(filePath, 'ContainersReady', {startLine:searchResults.lineNumber, separator:regex})).toLowerCase() === 'true';
        const podScheduled= (await getProperty(filePath, 'PodScheduled', {startLine:searchResults.lineNumber, separator:regex})).toLowerCase() === 'true';

        return new PodConditions({initialized, ready, containersReady, podScheduled});
    }
    return new PodConditions({podScheduled: false, initialized: false, ready: false, containersReady: false});
}