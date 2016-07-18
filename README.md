# ng2-facebook-rxjs

This module enables you to use the Facebook JS SDK through Rx Observables in-line with the rest of your Angular 2 project.
  
 

### Quick start

1. Install

   ```
   npm install ng2-facebook-rxjs --save
   ```

2. Assuming you are using ng-cli, update `angular-cli-build.js`

  ```
  module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'ng2-facebook-rxjs/dist/*',
     ]
    });
  };
   ```

3. Assuming you are using ng-cli, update 'src/system-config.ts`
  1. Add `ng2-facebook-rxjs` into `barrels`
    ```
    const barrels: string[] = [
      ...
      // Thirdparty barrels.
      'rxjs',
      'ng2-facebook-rxjs',
      ...
    ];
    ```
  
  2. Update `System.config` call 
    ```
    System.config({
      map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'ng2-facebook-rxjs': 'vendor/ng2-facebook-rxjs/dist',
        'main': 'main.js'
      },
      packages: cliSystemConfigPackages
    });
    ```
  
4. Add Facebook's script tag to your `index.html` file:
  ```
  <script id="facebook-jssdk" src="//connect.facebook.net/en_US/sdk.js"></script>
  ````
  
5. Use in your code as follows:
  ```
  import { Component, OnInit, provide } from '@angular/core';  // important to import provide
  import { FacebookService, FacebookConfig } from 'ng2-facebook-rxjs';
  ...  
  
  let fb_config = { appId: "00000000000" };  // use your FB App ID, duh!
  
  ...
  
  @Component({
    moduleId: module.id,
    selector: 'sometag',
    providers: [
      FacebookService,
      provide(FacebookConfig, {useValue: fb_config}),
      ],
    ...
  })
  
  ...
  
  constructor(
    private _facebookService: FacebookService
  ) {}
  
  login() {
    this._facebookService.login({
                scope: "email,public_profile",
                return_scopes: true
              })
        .subscribe(response => {
          console.log('LOGIN RESPONSE', response);
        })
  }
  
  use_api() {
     this._facebookService.api(fb_url)
      .subscribe( response => {
        console.log('API', response);
    
      }, error => {
        console.log('API ERROR', error);
      })
  }

  ```
  
  
  
  
  
