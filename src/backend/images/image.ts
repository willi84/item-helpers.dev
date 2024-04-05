import { HTTPStatusBase, HTTP_STATUS } from "../index.d";
import { fileExists, writeFileSync, readFile } from "../_shared/fs/fs"

const storeProfileImage = (images: any, url: string, httpItem: HTTPStatusBase) => {
    const cwd = process.cwd();
    // const pathImageData = `${cwd}/src/_data/images.json`;
    // const profile = readFile(path);
    // TODO: check if file exists
    if(!images.profiles){
        images.profiles = {};
    }
    console.log(url)
    const isGithub = url.indexOf('github.com') !== -1;
    if(isGithub){
        const parts = url.split('/');
        const id = parts[parts.length - 1].replace('.png', '');
        if(!images.profiles[`github/${id}`]){
            images.profiles[`github/${id}`] = {
                url: url,
                imageUrl: url, // forwarded url
                id: id,
                type: 'github',
                path: '', // local path
                lastModified: '',
                size: '',
                isStored: false, // on local 
                status: 'OK',
                sha: '',
                timeRequest: ''

            };
        } else {
            if(httpItem.lastModified !== images.profiles[`github/${id}`].lastModified){
                images.profiles[`github/${id}`].lastModified = httpItem.lastModified;
                // store new image
            }
        }
        // check contentType
        // convert to webp
        const image_url = `github_${id}.png`;

    }
    // writeFileSync(`${cwd}/src/_data/images.json`, JSON.stringify(images, null, 4) );

}

export const storeImage = (path: string, type: string, httpItem: HTTPStatusBase) => {
    const cwd = process.cwd();
    const pathImageData = `${cwd}/src/_data/images.json`;
    if(!fileExists(pathImageData)){
        writeFileSync(pathImageData, JSON.stringify({}));
    }
    const imageData = readFile(pathImageData);
    if(imageData){
        const images = JSON.parse(imageData);
        console.log(images)
        switch(type){
            case 'profile':
                storeProfileImage(images, path, httpItem);
                break;
            default:
                break;
        }
        if(!images.profiles){
            images.profiles = {};
        }
    }

}