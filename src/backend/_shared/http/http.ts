/**
 * @license MIT // TODO: not MIT
 * @author Robert Willemelis
 * @module itemsHelper/backend/http
 * @version 1.0.0
 */

import { HTTPStatusBase, HTTP_STATUS } from "../../index.d";
import { command } from "../cmd/cmd";
import { ERROR, LOG, OK } from "../log/log";
import { CURL_CONFIG_STATUS } from "./http.config";


export const splitLine = (line: string) => {
    const matchesColon = line.match(/^([^\s]+)\:\s(.*)/); // KEY: value
    const matchesSpace = line.match(/^([^\s]+)\s(.*)/); // KEY value
    let key = '';
    let value = '';
    if(matchesColon && matchesColon[2]){
        key = matchesColon[1];
        value = matchesColon[2];
    } else if(matchesSpace && matchesSpace[2]){
        key = matchesSpace[1];
        value = matchesSpace[2];
    }
    
    return {
        key: key,
        value: value,
    }
}
export const transformKey = (key: string) => {
    let newKey = key.toLowerCase().trim();
    if(newKey.indexOf('-') !== -1){
        const parts = newKey.split('-');
        let finalKey = '';
        parts.forEach((part:string, index: number) => {
            if(index === 0){
                finalKey = part;
            } else {
                finalKey += part.charAt(0).toUpperCase() + part.slice(1);
            }
        });
        newKey = finalKey;
    }
    return newKey;
}
export const getHttpItem = (input: string): HTTPStatusBase => {
    const httpItem: any = {};
    const lines = input.split('\n').filter(line => line.trim() !== '');
    lines.forEach(line => {
        const item = splitLine(line);
        const key = transformKey(item.key);

        httpItem[`${key}`] = item.value;
        // detect httpStatus
        if(key.indexOf('http/') === 0){
            const version = key.split('/')[1];
            httpItem.protocol = 'http';
            httpItem.protocolVersion = version;
            httpItem.status = item.value.split(' ')[0];
            httpItem.statusMessage = item.value.replace(httpItem.status, '').trim();
        }
    });
    if(httpItem.status === undefined){
        httpItem.status = '0';
    }
    return httpItem;

}

const getHTTPStatus = (url: string): HTTPStatusBase => {
    const status = command(`curl -I ${url} ${CURL_CONFIG_STATUS}`);
    const httpItem = getHttpItem(status);
    return httpItem;
}

export const getHttpStatus = (url: string, forwarding = false) => {
    const initialUrl = url;
    const maxRedirects = 5;
    let redirects = 0;
    if(forwarding){
        while(forwarding){
            redirects++;
            if(redirects > maxRedirects){
                LOG(ERROR, `max redirects reached for ${url}`);
                return '0';
            }
            // TODO: check valid url
            const httpItem = getHTTPStatus(url);
            const location = httpItem['location'];
            if(location){
                url = location;
            } else {
                forwarding = false;
                const status = parseInt(httpItem['status'], 10);
                if(status >= 200 && status < 400){
                    LOG(OK, `🌎 [HTTP-CHECK]: ${status} for ${initialUrl}`);
                } else {
                    LOG(ERROR, `🌎 [HTTP-CHECK]: ${status} for ${initialUrl}`);
                }
                return httpItem['status'];
            }
        }
    
    } else {
        const httpItem = getHTTPStatus(url);
        return httpItem['status'];
    }
}
export const getHttpStatusItem = (url: string, forwarding = false) => {
    const initialUrl = url;
    const maxRedirects = 5;
    let redirects = 0;
    if(forwarding){
        while(forwarding){
            redirects++;
            const httpItem = getHTTPStatus(url);
            if(redirects > maxRedirects){
                LOG(ERROR, `max redirects reached for ${url}`);
                return httpItem;
            }
            // TODO: check valid url
            const location = httpItem['location'];
            if(location){
                url = location;
            } else {
                forwarding = false;
                const status = parseInt(httpItem['status'], 10);
                if(status >= 200 && status < 400){
                    LOG(OK, `🌎 [HTTP-CHECK]: ${status} for ${initialUrl}`);
                } else {
                    LOG(ERROR, `🌎 [HTTP-CHECK]: ${status} for ${initialUrl}`);
                }
                return httpItem;
            }
        }
    
    } else {
        const httpItem = getHTTPStatus(url);
        return httpItem;
    }
}