import { fileExists, getFileList, readFile } from "../_shared/fs/fs";
import { getHttpItem, getHttpStatus, getHttpStatusItem } from "../_shared/http/http";
import { DEBUG, INFO, LOG, OK, WARNING } from "../_shared/log/log";
import { readMDFile } from "../_shared/markdown/markdown";
import { storeImage } from "../images/image";
import { HTTP_STATUS, ITEM, PROJECT } from "../index.d";


const config = require("./../../../project.config.js");
const PROJECT_DATA =  `${config.PROJECT_DATA}`;

const getArray = (data: string) => {
    const tags = data.split(',').map(item => item.trim());
    return tags;
}

const getGithubID = (id: string) => {
    const imageUrl = `https://github.com/${id}.png`;
    const httpItem = getHttpStatusItem(imageUrl, true);
    if(httpItem){
        storeImage(imageUrl, 'profile', httpItem);
        const imageStatus = httpItem['status'];
        const imgUrl = imageStatus === '200' ? 
            imageUrl : `/assets/avatar_unknown.svg`;
        return {
            "name": `${id}`,
            "url": `https://github.com/${id}`,
            "image": imgUrl,
            "plattform": "Github"
        }

    } else {
        // TODO
        return {}
    }
}

const readProjectFile = (project: string) => {
    const data = readFile(`${PROJECT_DATA}/${project}`);
    const result: any = {}
    if (data) {
        const metadata = readMDFile(data);
        metadata.forEach(metaItem => {
            switch (metaItem.key) {
                case 'image': 
                const cwd = process.cwd();
                // TOOD if no leadlin slash
                // TODO: test if http/https
                const path = `${cwd}/${metaItem.value}`;
                const hasFile = fileExists(path);
                // LOG(DEBUG, `fileExists: ${path}`);
                if(hasFile){
                    LOG(OK, `📁 [FILE-CHECK] ${metaItem.value}`)
                    result['image'] = metaItem.value;
                } else {
                    LOG(WARNING, `📁 [FILE-CHECK] ${metaItem.value}`)
                    const imageStatus = getHttpStatus(metaItem.value, true);
                    if(imageStatus === '200'){
                        result['image'] = metaItem.value;
                    } else {
                        result['image'] = '/api/placeholder.png';
                    }
                }
                    break;
                case 'tags':
                    result['tags'] = getArray(metaItem.value);
                    break;
                case 'maintainers':
                    result['maintainers'] = getArray(metaItem.value).map(githubID => getGithubID(githubID.trim()));
                    break;
                default:
                    result[metaItem.key] = metaItem.value;
                    break;
            };
            
        });
    }
    return result;
}

export const getProjects = (selected: Array<string>) => {
    const fileList = getFileList(`${PROJECT_DATA}/`);
    const projectData: Array<PROJECT> = [];
    fileList.forEach((file: string) => {
        const data: PROJECT = readProjectFile(file);
        // TODO: check basic values
        if(data['name']){
            projectData.push(data);
        }
        // if( data['name'] === undefined){
        //     console.log(data);
        // }

        // if (data !== undefined) {
        // }
    });
    
    const projects = projectData;
    const data: any = {
        time: Math.floor(Date.now() / 1000),
        "tags": [],
        "contributors": [],
        "items": []
    }
    // const contributors = selected.maps
    const hasSelected = selected.length > 0;
    const selectedProjects = hasSelected ? projects.filter((project: any) => { return selected?.includes(project.name) }) : projects;
    selectedProjects.forEach((project: PROJECT) => {
        data.items.push(project); // TODO: fix this

        // contributors
        const contributors = project.maintainers;
        contributors.forEach((maintainer: any) => {
            let hasAlreaday = false;
            data.contributors.forEach((contributor: any) => {
                if(contributor.name  === maintainer.name){
                    hasAlreaday = true;
                }
            });
            if (!hasAlreaday) {
                data.contributors.push(maintainer);
            }
        });

        // tags
        const tags = project.tags;
        if (tags) {
            tags.forEach((tag: string) => {
                let hasAlreaday = false;
                data.tags.forEach((tagItem: any) => {
                    if(tagItem.name === tag){
                        hasAlreaday = true;
                    }
                });
                if (!hasAlreaday) {
                    data.tags.push({ "name": tag, "slug": tag, items: [project] });
                } else {
                    data.tags.forEach((tagItem: any) => {
                        if(tagItem.name === tag){

                            tagItem.items.push(project);
                        }
                    });
                }
            });
        }
    });
    return data;
};
