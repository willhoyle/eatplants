I pulled the built plain-draggable lib from here: https://github.com/anseki/plain-draggable

For some reason, they don't include the following imported dependencies: anim-event cssprefix m-class-list pointer-event as dependencies (they are only in devDependencies)

As such, I'd rather import the library manually and maintain them in-source. I could probably also fork that repo and add the dependencies to package.json myself and npm install github/myfork or whatever but this works too.

If plain-draggable.esm.js ever needs to be updated, those other dependencies also need to be synced to the same versions plain-draggable uses. 

Note also, the author of that library says they have "solved" this problem by telling users to `cd node_modules/plain-draggable` and `npm i` but I hate it. Mainly because when I deploy to prod or staging, now I have to remember to add that to my build step. It's just bound to cause me some trouble. I want it to be easy for people to clone this repo and get started right away too with no weird build steps. Just `npm i` and good to go! /rant done