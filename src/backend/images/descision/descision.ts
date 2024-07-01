import { IMAGE_ITEM } from "../image.d";
import { DESCISIONS } from "./descision.d";

export const makeDescisionPath = (oldSize: string, newSize: string): DESCISIONS => {
    if(newSize === oldSize){
        return 'NO_CHANGE';
    } else {
        return 'UPDATE';
    }
}
export const makeDescisionSize = (oldSize: number, newSize: number): DESCISIONS => {
    const minimalSize: number = oldSize * 0.2;
    const maximalSize: number = oldSize * 2;
    if(newSize > minimalSize && newSize < maximalSize){
        return 'UPDATE';
    } else {
        if(newSize < minimalSize){
            return 'TOO_SMALL';
        } else {
            return 'TOO_BIG';
        }
    }
}
export const makeDescisionStatus = (newStatus: string): DESCISIONS => {
    if(newStatus === '200'){
        return 'UPDATE';
    } else {
        return 'NO_CHANGE';
    }
}
export const makeDescisionDate = (oldDate: Date, newDate: Date): DESCISIONS => {
    const intLastModifiedNew: number = Date.parse(newDate.toString());
    const intLastModifiedOld: number = Date.parse(oldDate.toString());
    if(intLastModifiedNew !== intLastModifiedOld){
        if(intLastModifiedNew > intLastModifiedOld){
            return 'UPDATE';
        } else {
            return 'IS_OLDER';
        }
    } else {
        return 'NO_CHANGE';
    }
}
export const makeDescision = (oldItem: IMAGE_ITEM, newItem: IMAGE_ITEM): boolean => {
    const status = newItem.status;
    let doUpdate: boolean = false;
        
    const oldPath: string = oldItem.url;
    const newPath: string = newItem.url;
    const oldDate: Date = oldItem.lastModified;
    const newDate: Date = newItem.lastModified;
    const oldSize: number = parseInt(oldItem.size, 10);
    const newSize: number = parseInt(newItem.size, 10);
    const descisionSize: boolean = makeDescisionSize(oldSize, newSize) === 'UPDATE';
    const descisionDate: boolean = makeDescisionDate(oldDate, newDate) === 'UPDATE';
    const descisionPath: boolean = makeDescisionPath(oldPath, newPath) === 'UPDATE';
    const descisionStatus: boolean = makeDescisionStatus(status) === 'UPDATE';
        
    
    if(descisionStatus && 
        ((descisionSize && descisionDate) || descisionPath)){
            doUpdate = true;
    }

    return doUpdate;
}