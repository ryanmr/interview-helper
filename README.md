# Interview Helper

Write and edit your markdown interview guides, turn them into HTML output, and enjoy.

## Tech

- Axios
- Bulma
- [Create React App](https://github.com/facebook/create-react-app)
- Lodash
- Luxon
- [markdown-it](https://github.com/markdown-it/markdown-it)
- sass
- react / router / [create-react-app](https://github.com/facebook/create-react-app)

## License

The source code in repository is licensed under MIT. Please see the LICENSE file.

## Setup

This project requires _document_ files to function. Specifically, the code for this is essentially open, while the contents are fairly proprietary. In that light, if you decide to contribute additional code to this repository, it will likewise be open, while your documents will be excluded from the `/public/documents` directory.

To setup, the _current expectation_ is that you supply:

- `tech-response.md` in the document folder for the technical interview module

## Available Scripts

In the project directory, you can run:

### `npm start:dev`

Runs the app in the development mode.<br>
Open [http://localhost:8113](http://localhost:8113) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm start` will run the development server on `PORT:3000` instead.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
