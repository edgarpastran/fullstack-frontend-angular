// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST: 'http://localhost:8080'  
};

export const messages = {
  INFO_TITLE: 'INFORMATION',
  ERROR_TITLE: 'ERROR',
  DATA_REGISTERED: 'DATA REGISTERED',
  DATA_UPDATED: 'DATA UPDATED',
  DATA_DELETED: 'DATA DELETED',
  DATA_REQUIRED: 'YOU MUST ENTER THE REQUIRED DATA'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
