import { ERROR, OK, WARNING } from "../_shared/log/log";

export const IMAGE_ERROR = {
    'TOO_SMALL': {
        type: ERROR,
        message: `image for <PROFIL_ID> size is too small and probably empty`
    },
    'OUT_OF_RANGE': {
        type: ERROR,
        message: `image for <PROFIL_ID> size (<SIZE>) is out of range [min: <MIN>, max: <MAX>]`
    },
    'IS_OLDER': {
        type: WARNING,
        message: `image for new <PROFIL_ID> is older than the current one`
    },
    "IMAGE_UPDATED": {
        type: OK,
        message: `image for <PROFIL_ID> updated`
    }

}

export const DATE_OLDER_STRING = 'Mon, 13 Apr 2020 19:37:57 GMT';
export const DATE_CURRENT_STRING = 'Tue, 14 Apr 2020 19:37:57 GMT';
export const DATE_NEWER_STRING = 'Wed, 15 Apr 2020 19:37:57 GMT';

export const DATE_CURRENT = new Date(DATE_CURRENT_STRING);
export const DATE_CURRENT2 = new Date(DATE_CURRENT_STRING);
export const DATE_OLDER = new Date(DATE_OLDER_STRING);
export const DATE_NEWER = new Date(DATE_NEWER_STRING);

export const IMAGE_FILES: { [key: string]: string} = {
    'empty': 'src/_data/empty.json',
    'profiles': 'src/_data/profiles.json',
}