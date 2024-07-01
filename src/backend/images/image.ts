// function deepMerge<T>(target: T, source: T): T {
import { HTTPStatusBase, IMAGE_UPDATE } from "../index.d";
import { fileExists, readFile } from "../_shared/fs/fs"
import { LOG, WARNING } from "../_shared/log/log";
import { IMAGE_FILES, IMAGE_ERROR } from "./image.config";
import { makeDescision } from "./descision/descision";
import { IMAGE_DATA as IMAGE_DB, IMAGE_ITEM } from "./image.d";


export const readImageData = (type: string) => {
    const cwd = process.cwd();
    const file: string = IMAGE_FILES[type];
    if(file){
        const path = `${cwd}/${file}`;
        if(!fileExists(path)){
            // writeFileSync(path,JSON.stringify({}));
        }
        const imageData = readFile(path);
        if(!imageData){
            return {};
        }
        const images = JSON.parse(imageData);
        return images;
    } else {
        LOG(WARNING, `no file configuration for ${type} found`)
    }
    
}



const getImageID = (url: string) => {
    const PLATTFORM = `github`;
    const parts = url.split('/') || [url];
    const id = parts[parts.length - 1].replace('.png', '');
    return `${PLATTFORM}/${id}`;
}
export const createImageItem = (profil: IMAGE_UPDATE, isEmpty = false): IMAGE_ITEM => {
    const httpItem: HTTPStatusBase = profil.httpItem;
    const profileId: string = getImageID(profil.url);
    const emptyItem: IMAGE_ITEM = {
        id: '',
        url: '',
        lastModified: new Date(),
        size: '0',
        imageUrl: '',
        status: ''
    };
    console.log(emptyItem.lastModified);
    return isEmpty ? emptyItem : {
        status: httpItem.status,
        id: profileId,
        url: profil.url,
        lastModified: new Date(httpItem.lastModified),
        size: httpItem.contentLength,
        imageUrl: httpItem.lastLocation
    }
}


export const updateImage = (database: IMAGE_DB, image: IMAGE_UPDATE): IMAGE_DB => {
    
    const newItem: IMAGE_ITEM = createImageItem(image);
    let doUpdate: boolean = false;
    if(!database[newItem.id]){ // create imageEntry if not exists
        // doUpdate = true;
        const oldItem: IMAGE_ITEM  = createImageItem(image, true);
        doUpdate = makeDescision(oldItem, newItem);
    } else {
        const oldItem: IMAGE_ITEM = database[newItem.id];
        doUpdate = makeDescision(oldItem, newItem);
    }
    if(doUpdate === true){
        database[newItem.id] = {
            ...newItem
        }
    }
    return database;
}

export const storeImage = (path: string, type: string, httpItem: HTTPStatusBase) => {
    const cwd = process.cwd();
    const pathImageData = `${cwd}/src/_data/images.json`;
    if(!fileExists(pathImageData)){
        // writeFileSync(pathImageData, JSON.stringify({}));
    }
    const imageData = readFile(pathImageData);
    if(imageData){
        const images = JSON.parse(imageData);
        // console.log(images);
        
        switch(type){
            case 'profile':
                //storeProfileImage(images, path, httpItem);
                break;
            default:
                break;
        }
        if(!images.profiles){
            images.profiles = {};
        }
    }

}