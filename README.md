# Cross Platform Ecommerce App

---

This is a ecommerce app built using React Native and Firebase.

This built using a Expo wrapper.

##### Prerequistes:

1. Expo must be installed. To install expo use the following command:
   `npm install --global expo-cli`

2. After that you need an expo application available on your physical device or emulator configured on your development environment.

---

To use this project, clone it.

After clonning at the top directory level where `App.js` is present add a file named `environment.js`. Copy-paste the following code into this directory:

```
import Constants from "expo-constants";

const authUrl = "https://identitytoolkit.googleapis.com/v1";
const apiUrl = "";
const apiKey = "";

const ENV = {
    dev: {
        apiUrl: apiUrl,
        apiKey: apiKey,
        authUrl: authUrl,
    },
    staging: {
        apiUrl: apiUrl,
        apiKey: apiKey,
        authUrl: authUrl,
    },
    prod: {
        apiUrl: apiUrl,
        apiKey: apiKey,
        authUrl: authUrl,
    },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        return ENV.dev;
    } else if (env === "staging") {
        return ENV.staging;
    } else if (env === "prod") {
        return ENV.prod;
    }
};

export default getEnvVars;

```

Go to the firebase => configure RealTime database and Authentication ( Email and password based )

You'll get the api key for the authentication. Paste it in the `apikey` declaration.

While you'll get the API url for the Realtime database. Add it in the `apiUrl`.

Build it using the following command:

-   Install all the packages:
    `npm install`

-   Run the Application:
    `npm start`

Feel free to create issue if you find any bug!!
