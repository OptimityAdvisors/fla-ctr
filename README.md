# fla-ctr
Countdown to All-Hands 2017 in Florida.

Used as a simple example of gulp build tasks and lite-server

## Notes

* Weekdays calculation is a fairly crude, brute-force implementation which probably doesn't scale well
* The real-time counter is not efficient!
* Weekdays do not account for public / bank holidays. Feel free to create a pull request to implement this :)

## Running the example (using Visual Studio Code)

* After cloning the repo, open the _folder_ in VS Code and execute "npm install" in the terminal to restore packages defined in package.json
* Hit CTRL+SHIFT+P and type "run task". This will popup a list of tasks from tasks.json. Select "watch". This will automatically generate minified CSS & JS in the "dist" folder whenever one of the files changes.
* To stop the running task, hit CTRL+SHIFT+P again and type "terminate running task"
* Type "npm start" in a new terminal window to load index.html in a local server (lite-server). The "start" script is defined in package.json, and lite-server is configured in bs-config.json
* This also includes browser sync, so saving changes in the HTML will auto-update in the browser
* Tasks are defined in gulpfile.js - these must be created before adding to tasks.json
* The first (and only the first) task in tasks.json is the "build" task, which gets executed if you hit CTRL+SHIFT+B