# Module: Images

## purpose

* flat json for each image category to avoid copy issues

## description
consists of image.ts and descisions.ts

## TODOS:

add image if:
* ✅ image is missing/new
* ✅ image is outdated
* ✅ has new path/version
* ✅ is in range of image size (20% till 2x of last image)
* ✅ http Status is 200
* content has changed

dont add image if
*  image is smaller minimal size

missing properties
* timeRequest - speed of url request (max retries)
* sha - hash of content
* url - url (requested url)
* imageUrl - url of image (forwared url)
* type - plattform
* contentType - convert to webp or so
* isStored - if image is stored
* updateFrequency - how often image is updated
* lastUpdateTries - after 7 days maybe website is not anymore
* is domain reachable

* needs to be updated at all

## notes

* slow domain: https://httpbin.org/delay/10 (src: https://stackoverflow.com/questions/38201627/slow-website-server-for-testing-http-modules)
* why request is not stopping: https://avatars.githubusercontent.com/u/48512251?s=10&v=4
* get time: get time:  curl -w "%{time_total}" -o /dev/null -s https://www.strato.de
