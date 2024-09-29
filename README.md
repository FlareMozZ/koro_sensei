Chrome Extension Setup for Koro Sensei
This document outlines the steps to set up the Koro Sensei Chrome extension. Follow these instructions to get your development environment ready and load the extension in Chrome.

Prerequisites
Make sure you have the following installed on your system:

Node.js (v14 or higher)
npm (Node package manager)
Getting Started
1. Clone the Repository
First, clone the project repository to your local machine:

bash
Copy code
git clone <repository-url>
cd koro_sensei
2. Install Dependencies
Install the required dependencies for the project using npm. These include Mistral, CORS, Axios, CRACO, express, and other necessary packages. Run the following command:

bash
Copy code
npm install @mistralai/mistralai cors axios @craco/craco express
3. Configure Environment Variables
Create a .env file in the root of your project directory and add your API keys and any other required configurations. The structure should look like this:

makefile
Copy code
API_KEY=your_mistral_api_key
PORT=5000
4. Build the Extension
Once the dependencies are installed and the environment is configured, build the extension for production. This will create a build folder containing the packaged extension files:

bash
Copy code
npm run build
5. Load Unpacked Extension in Chrome
To load your unpacked extension in Google Chrome, follow these steps:

Open Chrome and go to the Extensions page by entering chrome://extensions/ in the address bar.
Enable "Developer mode" by toggling the switch in the top right corner.
Click on the "Load unpacked" button.
Select the build folder generated in the previous step.
6. Testing the Extension
Once the extension is loaded, you can start testing its functionality. Open the extension from the Chrome toolbar and interact with it to see how it works.

7. Running the Development Server
If you want to run a local development server for testing:

bash
Copy code
npm start
This will start the server on http://localhost:5000, and any changes made to the source code will automatically reload the extension.

Troubleshooting
Build Issues: If you encounter issues while building, ensure that all dependencies are correctly installed and your environment variables are properly set.
CORS Issues: If you face CORS errors while making API calls, make sure the server is configured to allow requests from your extension.
Additional Resources
Mistral Documentation
CORS Documentation
CRACO Documentation
