import { readImageData, updateImage } from "./image";
import * as fs from "../_shared/fs/fs"
import { HTTPStatusBase, IMAGE_UPDATE } from "../index.d";
import { DATE_CURRENT, DATE_CURRENT_STRING, DATE_NEWER, DATE_NEWER_STRING, IMAGE_ERROR } from "./image.config";
import { IMAGE_DATA, IMAGE_ITEM } from "./image.d";



const STANDARD_HTTP: HTTPStatusBase = {
    protocol: "",
    protocolVersion: "",
    status: "200",
    statusMessage: "",
    server: "",
    date: "",
    contentType: "",
    contentLength: "1232"
};
const USER_AVATAR_URL = 'https://github.com/willi84.png';
const USER_AVATAR_IMAGE = 'https://avatars.githubusercontent.com/u/6207308';

const IMAGE_STANDARD_V4 = `${USER_AVATAR_IMAGE}?v=4`;
const IMAGE_UPDATED_V5 = `${USER_AVATAR_IMAGE}?v=5`;
const STANDARD_WILLI84 = {
    location: USER_AVATAR_IMAGE,
    initialUrl: USER_AVATAR_URL
}
const STANDARD_GITHUB_PROFILE = {
    // type: 'github',
    // path: '',
    size: '1232',
    // isStored: false,
    // status: 'OK',
    // sha: '',
    // timeRequest: '',
};
const PROFILE_ID = 'github/willi84';
const CTX_PROFILE_ID = { PROFILE_ID: PROFILE_ID };

// standard profile
const PROFILE_WILLI84: Record<string, IMAGE_ITEM> = {};
PROFILE_WILLI84[PROFILE_ID] = {
    id: 'github/willi84',
    url: USER_AVATAR_URL,
    imageUrl: IMAGE_STANDARD_V4,
    lastModified: DATE_CURRENT,
    ...STANDARD_GITHUB_PROFILE,
    status: '200'
}

// newer profile
const PROFILE_WILLI84_NEWER: Record<string, IMAGE_ITEM> = {};
PROFILE_WILLI84_NEWER[PROFILE_ID] = {
    id: 'github/willi84',
    url: USER_AVATAR_URL,
    imageUrl: IMAGE_UPDATED_V5,
    lastModified: DATE_NEWER,
    ...STANDARD_GITHUB_PROFILE,
    status: '200'
}
const PROFILE_WILLI84_NEWER_SIZE_SAME: Record<string, IMAGE_ITEM> = {};
PROFILE_WILLI84_NEWER_SIZE_SAME[PROFILE_ID] = {
    id: 'github/willi84',
    url: USER_AVATAR_URL,
    imageUrl: IMAGE_UPDATED_V5,
    lastModified: DATE_NEWER,
    ...STANDARD_GITHUB_PROFILE,
    size: '1232',
    status: '200'
}
describe('⚙️ basic checks', () => {
    let mockCommand: jest.SpyInstance;
    beforeEach(() => {
        mockCommand = jest.spyOn(fs, 'readFile').mockImplementation((path: string) => {
            if(path.indexOf('empty.json') > -1){
                return '{"test": "test"}';
            } else if(path === 'someUrl.json'){
                return '{}';
            } else {
                return '{}';
            }
        });
    })
    afterEach(() => {
        mockCommand.mockRestore();
    });
    describe('read data', () => {
        it('should get', () => {
            expect(readImageData('profiles')).toEqual({ });
            expect(readImageData('empty')).toEqual({"test": "test"});
        });
    });
});


describe('🔄 update data', () => {
    describe('📌 descisions', () => {
        describe('🖼️ update image', () => {
            it('should add one profile if not exists', () => {
                const image: IMAGE_UPDATE = {
                    url: USER_AVATAR_URL,
                    httpItem: {
                        lastModified: DATE_CURRENT_STRING,
                        lastLocation: IMAGE_STANDARD_V4,
                        ...STANDARD_WILLI84,
                        ...STANDARD_HTTP,
                    }
                }
                const images: IMAGE_DATA = { };
                const expected: IMAGE_DATA = { ...PROFILE_WILLI84};

                const result: IMAGE_DATA = updateImage(images, image);
                expect(result).toEqual(expected);
            });
            it('should not add one profile if not exists but has 404', () => {
                const image: IMAGE_UPDATE = {
                    url: USER_AVATAR_URL,
                    httpItem: {
                        lastModified: DATE_CURRENT_STRING,
                        lastLocation: IMAGE_STANDARD_V4,
                        ...STANDARD_WILLI84,
                        ...STANDARD_HTTP,
                        status: '404'
                    }
                }
                const images: IMAGE_DATA = { };
                const expected: IMAGE_DATA = { };

                const result: IMAGE_DATA = updateImage(images, image);
                expect(result).toEqual(expected);
            });
            it('should not add one profile if size is too small', () => {
                const image: IMAGE_UPDATE = {
                    url: USER_AVATAR_URL,
                    httpItem: {
                        lastModified: DATE_CURRENT_STRING,
                        lastLocation: IMAGE_STANDARD_V4,
                        ...STANDARD_WILLI84,
                        ...STANDARD_HTTP,
                        contentLength: '120'
                    }
                }
                const images = { ...PROFILE_WILLI84 };
                
                const expected: IMAGE_DATA = { ...PROFILE_WILLI84 };

                const result: IMAGE_DATA = updateImage(images, image);
                expect(result).toEqual(expected);
            });
            it('should not add if status is 404', () => {
                const image: IMAGE_UPDATE = {
                    url: USER_AVATAR_URL,
                    httpItem: {
                        lastModified: DATE_NEWER_STRING,
                        lastLocation: IMAGE_UPDATED_V5,
                        ...STANDARD_HTTP,
                        status: '404'
                    }
                }
                const images = {  ...PROFILE_WILLI84 };
                
                const expected: IMAGE_DATA = { ...PROFILE_WILLI84 };

                const result: IMAGE_DATA = updateImage(images, image);
                expect(result).toEqual(expected);
            });
            it('should update if time is newer and size is in range', () => {
                const image: IMAGE_UPDATE = {
                    url: USER_AVATAR_URL,
                    httpItem: {
                        lastModified: DATE_NEWER_STRING,
                        lastLocation: IMAGE_UPDATED_V5,
                        ...STANDARD_HTTP
                    }
                }
                const images = {  ...PROFILE_WILLI84 };
                
                const expected: IMAGE_DATA = { ...PROFILE_WILLI84_NEWER };

                const result: IMAGE_DATA = updateImage(images, image);
                expect(result).toEqual(expected);
            });
            it('should update if time is newer and same size', () => {
                const image: IMAGE_UPDATE = {
                    url: USER_AVATAR_URL,
                    httpItem: {
                        lastModified: DATE_NEWER_STRING,
                        lastLocation: IMAGE_UPDATED_V5,
                        ...STANDARD_HTTP,
                        contentLength: '1232'
                    }
                }
                const images = {  ...PROFILE_WILLI84 };
                
                const expected: IMAGE_DATA = { ...PROFILE_WILLI84_NEWER_SIZE_SAME };

                const result: IMAGE_DATA = updateImage(images, image);
                expect(result).toEqual(expected);
            });
            
            it('should NOT update if time is newer but size is too big', () => {
                const image: IMAGE_UPDATE = {
                    url: USER_AVATAR_URL,
                    httpItem: {
                        lastModified: DATE_NEWER_STRING,
                        lastLocation: IMAGE_UPDATED_V5,
                        ...STANDARD_HTTP,
                        contentLength: '2500' // double size
                    }
                }
                const images = {  ...PROFILE_WILLI84 };
                
                const expected: IMAGE_DATA = { ...PROFILE_WILLI84 };

                const result: IMAGE_DATA = updateImage(images, image);
                expect(result).toEqual(expected);
            });
        });
    });
});