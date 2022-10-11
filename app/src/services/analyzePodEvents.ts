import {searchFile} from "./searchFile";
import {PodEvents} from "../models";


export async function analyzePodEvents(filePath:string): Promise<PodEvents> {
    const searchResults = await searchFile(filePath, "Events:");
    if (searchResults.match) {
        const events = searchResults.line.split(":")[1].trim().split(",");
        return new PodEvents(
            events
        );
    }
    return new PodEvents([]);
}