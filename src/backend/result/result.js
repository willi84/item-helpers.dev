"use strict";
exports.__esModule = true;
exports.getProjects = void 0;
var getProjects = function () {
    return {
        time: Math.floor(Date.now() / 1000),
        "tags": [
            { "name": "CSS", "slug": "css", items: ["A", "B"] },
            { "name": "HTML", "slug": "html", items: ["A"] }
        ],
        "contributors": [
            {
                "name": "willi84",
                "url": "https://github.com/willi84",
                "image": "https://github.com/willi84.png",
                "plattform": "Github"
            },
            {
                "name": "stefanjudis",
                "url": "https://github.com/stefanjudis",
                "image": "https://github.com/stefanjudis.png",
                "plattform": "Github"
            }
        ],
        "items": [
            {
                "name": "project a",
                "maintainers": [
                    {
                        "name": "willi84",
                        "url": "https://github.com/willi84",
                        "image": "https://github.com/willi84.png",
                        "plattform": "Github"
                    },
                    {
                        "name": "stefanjudis",
                        "url": "https://github.com/stefanjudis",
                        "image": "https://github.com/stefanjudis.png",
                        "plattform": "Github"
                    }
                ],
                "tags": ["tag A", "tag B"],
                "desc": "das ist ein Project",
                "addedAt": "2023-09-08",
                "url": "https://robert.berlin",
                "image": "/api/screenshot/test.jpg"
            },
            {
                "name": "project b",
                "maintainers": [],
                "tags": ["tag A", "tag B"],
                "desc": "das ist ein Project",
                "addedAt": "2023-09-08",
                "url": "https://robert.berlin",
                "image": "/api/screenshot/test.jpg"
            },
            {
                "name": "Bahn heloer",
                "maintainers": [
                    {
                        "name": "willi84",
                        "url": "https://github.com/willi84",
                        "image": "https://github.com/willi84.png",
                        "plattform": "Github"
                    }
                ],
                "tags": ["tag A", "tag B"],
                "desc": "das ist ein Project",
                "addedAt": "2023-09-08",
                "url": "https://robert.berlin",
                "image": "/api/screenshot/test.jpg"
            }
        ]
    };
    // return {
    //     projects: [
    //         {
    //             "name": "Alchemize",
    //             "image": "/api/screenshot/test.png"
    //         }
    //     ]
    //     // projects: ['bahn-helpers.', 'tiny-helpers.dev', 'ng-helpers.dev']
    // }
};
exports.getProjects = getProjects;
