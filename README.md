# Koro Sensei Chrome Extension

This project is a Chrome extension that uses the Mistral API to provide an interactive learning experience. The extension features a chatbot persona of Koro Sensei, designed to guide users through questions.

## Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Building the Extension](#building-the-extension)
4. [Loading the Extension in Chrome](#loading-the-extension-in-chrome)
5. [Testing the Extension](#testing-the-extension)
6. [Running the Development Server](#running-the-development-server)
7. [Troubleshooting](#troubleshooting)
8. [Additional Resources](#additional-resources)
9. [Available Scripts](#available-scripts)
10. [Learn More](#learn-more)

## Installation

Install the required dependencies for the project using npm. These include Mistral, CORS, Axios, CRACO, Express, and other necessary packages. Run the following command:

```bash
npm install
```

## Configuration

Create a `.env` file in the root of your project directory and add your API keys and any other required configurations. The structure should look like this:

```
API_KEY=your_api_key_here
PORT=5000
```

## Building the Extension

Once the dependencies are installed and the environment is configured, build the extension for production. This will create a `build` folder containing the packaged extension files:

```bash
npm run build
```

## Loading the Extension in Chrome

To load your unpacked extension in Google Chrome, follow these steps:

1. Open Chrome and go to the Extensions page by entering `chrome://extensions/` in the address bar.
2. Enable "Developer mode" by toggling the switch in the top right corner.
3. Click on the "Load unpacked" button.
4. Select the `build` folder generated in the previous step.

## Testing the Extension

Once the extension is loaded, you can start testing its functionality. Open the extension from the Chrome toolbar and interact with it to see how it works.

## Running the Development Server

If you want to run a local development server for testing, use the following command:

```bash
node server2.js
```

This will start the server on `http://localhost:5000`, and any changes made to the source code will automatically reload the extension.

## Troubleshooting

- **Build Issues**: If you encounter issues while building, ensure that all dependencies are correctly installed and your environment variables are properly set.
- **CORS Issues**: If you face CORS errors while making API calls, make sure the server is configured to allow requests from your extension.

## Additional Resources

- [Mistral Documentation](https://docs.mistral.ai/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [CRACO Documentation](https://github.com/gsoft-inc/craco)
- [Getting Started with Create React App](https://create-react-app.dev/docs/getting-started)

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified, and the filenames include the hashes. Your app is ready to be deployed!\
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**\
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### work in progress :
Integrating Google's gemini API too as an alternative and many other models for the user to pick.
