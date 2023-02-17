# Run the sample code

---

## Overview

The following describes how to run the sample code of the In-app Chat Kit.

## Prerequisites

- Go to [ZEGOCLOUD Admin Console\|\_blank](https://console.zegocloud.com/) and do the following:
  1.  Create a project, and get the `AppID` and `AppSign` of your project.
  2.  Subscribe to the **In-app Chat** service (Contact technical support if the subscript doesn’t go well).

## Run the sample code

1. Download the sample code, open the `KeyCenter.js` file under the `/src` directory using VSCode (or other programming software), and fill in the `appID` and `appSign` you get from the ZEGOCLOUD Admin Console.

```javascript
const appConfig = {
  appID: 0, // The AppID you get from ZEGOCLOUD Admin Console.
  appSign: '', // The AppSign you get from ZEGOCLOUD Admin Console.
};
export default appConfig;
```

2. In Terminal, use the cd command to navigate to the `Samples/ZIMKitDemo` directory, and run the following command in order to run the sample code.

```bash
    yarn install   # Install dependencies.
    yarn ios # After installing the dependencies, execute this to run the project in iOS.
    yarn android # After installing the dependencies, execute this to run the project in Android.
```
