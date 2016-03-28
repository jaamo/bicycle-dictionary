## Bicycle dictionary

Small react experiment to create dictionary app that translates bicycle terms from Finnish to English and vice versa.

Base on this boilerplate:
https://github.com/christianalfoni/flux-react-boilerplate

### Development
* Run `npm install`
* Run `gulp`
* Start a webservice in the `build` folder, f.ex. `python -m SimpleHTTPServer`
* Go to `localhost:8000` to display the app
* Go to `localhost:8000/testrunner.html` to see your tests
* Any changes to `app` or `styles` folder will automatically rebuild to `build` folder
* Both tests and application changes will refresh automatically in the browser
* Run `gulp test` to run all tests with phantomJS and produce XML reports

### Minify the code, ready for production
* Run `gulp deploy`

### Directory
* **build/**: Where your automatically builds to. This is where you launch your app in development
* **dist/**: Where the deployed code exists, ready for production
* **styles/**: Where you put your css files
* **specs/**: Where you put your test files
* **gulpfile**: Gulp configuration

### Credits
Bicycle icon by Edward Boatman from the Noun Project
