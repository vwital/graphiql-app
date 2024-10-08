# Final Task the Rolling Scopes School react course by JSXSquad team
## [Deploy](https://dev--rest-graphiql-app.netlify.app) 
## [Demo](https://youtu.be/U7HwzInHGfI) 


## Description
### This application combines the functionality of REST and GraphiQL client. Created as part of the final task of the [RS School React course](https://rs.school/courses/reactjs). 
[Task link](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md) 

## Team 
### Vital Ilyuchyk aka [vwital](https://github.com/vwital) TeamLead<br>
### Aleh Dzehil aka [Dzehil02](https://github.com/dzehil02)<br>
### Kiryl Panamarou aka [panakiru](https://github.com/panakir)

## Stack
### React, TypeScript, Next.JS
### Package manager: NPM
### Testing: Vitest
### CSS Preprocessor: Sass
### Version control system: GIT

## Scripts
#### `dev`: Starts the development server for your application using Next.js. Used for local development.<br/>
#### `build`: Builds the production-ready version of your application using Next.js.
#### `start`: Starts the production server for your application. Typically used after running build.
#### `lint`: Runs ESLint to check your code for errors and warnings, disallowing any warnings (--max-warnings 0).
#### `lint:fix`: Runs ESLint with automatic fixing of issues found in the source files under the src directory.
#### `format`: Checks the formatting of files using Prettier, without making any changes.
#### `format:fix`: Automatically formats files using Prettier and applies fixes.
#### `style:fix`: Runs Stylelint to automatically fix styling issues in files with css, scss, and sass extensions.
#### `preview`: Starts a preview server for your application using Vite.
#### `prepare`: Runs Husky to set up Git hooks.
#### `test`: Runs tests using Vitest and collects code coverage reports.

## Token Expiration Configuration
### By default, Firebase tokens are set to expire after 1 hour. In this application, the token expiration time is intentionally reduced to 30 minutes to enhance security.

### Configuration Details
Default Token Expiration: 1 hour
Configured Token Expiration: 30 minutes
Expiration Calculation: expirationTimestamp is calculated as Date.now() - TOKEN_EXPIRATION_SUBTRACT, where TOKEN_EXPIRATION_SUBTRACT is the difference in milliseconds subtracted from the 1 hour default (located in ./src/constants/constants.ts). For instance, 60 minutes - 50 minutes = 10 minutes.
This adjusted expiration time is stored in cookies to manage token validity and ensure enhanced security.



## Setting up and running the project locally
1. Download or clone the repository using the `git clone (https://github.com/vwital/graphiql-app.git` command in the console
2. Go to the project folder in the console
3. Install dependencies with npm command `npm install`
4. Start building the project or local server using commands `npm run build` or `npm run dev`


