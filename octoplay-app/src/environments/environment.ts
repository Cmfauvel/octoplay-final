// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  firebaseConfig : {
    apiKey: 'AIzaSyBYfGlhMoktL9p7DS-TjlnVQqxfVrAQZlM',
    authDomain: 'octoplay-1ffe4.firebaseapp.com',
    projectId: 'octoplay-1ffe4',
    storageBucket: 'octoplay-1ffe4.appspot.com',
    messagingSenderId: '116952089442',
    appId: '1:116952089442:web:cbae4089005c932548623b',
    measurementId: 'G-ZKYBFEV3X3'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
