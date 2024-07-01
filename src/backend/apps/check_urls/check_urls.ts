import { getFileList, readFile } from '../../_shared/fs/fs'
import { getConnectionTime, getHttpStatusItem } from '../../_shared/http/http';
import { ERROR, LOG, OK, WARNING } from '../../_shared/log/log';


export const checkUrls = () => {
    const start = new Date();
    
    // get files from tmp/helpers
    const cwd = process.cwd();
    const helperPath = `${cwd}/tmp/helpers`;
    const helpers = getFileList(`${cwd}/tmp/helpers`);
    let i = 0;
    const max = helpers.length
    for(const helper of helpers) {
        i += 1;
        //   console.log(helper);
        try {
            const data = readFile(`${helperPath}/${helper}`);
            if (data) {
                const json = JSON.parse(data);
                const timeout = getConnectionTime(json.url);
                
                if(timeout !== ''){

                    const timeoutNumber = parseFloat(timeout);
                    if (timeoutNumber < 0.5){
                        const httpStatusItem = getHttpStatusItem(json.url, true, 0.5);
                        const status = httpStatusItem['status'];
                        LOG(OK, ` [${i}/${max}] [${status}] ${json.url} has ${timeout}`);
                    } else if(timeoutNumber < 1){
                        const httpStatusItem = getHttpStatusItem(json.url, true, 1);
                        const status = httpStatusItem['status'];
                        LOG(WARNING, ` [${i}/${max}] [${status}] ${json.url} has ${timeout}`);
                    } else {
                        const httpStatusItem = getHttpStatusItem(json.url, true, 3);
                        const status = httpStatusItem['status'];
                        LOG(ERROR, ` [${i}/${max}] [${status}] ${json.url} has ${timeout}`);
                    }
                } else {
                    LOG(ERROR, ` [${i}/${max}] ${json.url} has no data`);
                }

                // LOG(OK, ` [${i}/${max}] ${json.url} has ${timeout}`);
                // const status = httpStatusItem['status'];
                // LOG(OK, ` [${i}/${max}] [${status}] helper ${json.url} has ${httpStatusItem.redirects}`);
            } else {
                LOG(ERROR, `helper ${helper}: has no data`); 
            }
        } catch(e){
            LOG(ERROR, `helper ${helper} hass error: ${e}`);
        }
    }

    LOG(OK, `checkUrls took ${new Date().getTime() - start.getTime()}ms`);
}