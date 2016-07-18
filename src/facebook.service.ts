import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class FacebookConfig {
    appId: string;
}

@Injectable()
export class FacebookService {

    conn: any;
    _permissions: Array<string> = [];
    _app_id = '';
    _params = {
        appId      : '',
        cookie     : false,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.7' // use graph api version 2.5
    }

    constructor( fb_config: FacebookConfig) {
        this.conn = FB;
        this.init(fb_config);
    }

    init (config?: FacebookConfig) {
      let params = Object.assign({}, this._params, config);
      this.conn.init(params);
    }

    getAuthResponse () {
        return this.conn.getAuthResponse();
    }

    getLoginStatus (force?: Boolean) {
        let self = this;
        
        return Observable.create( (observer: Observer<FBResponseObject>) => {
            try {
                self.conn.getLoginStatus( (resp: FBResponseObject) => {
                    if (resp.error) {
                        observer.error(resp.error);
                    } else {
                        observer.next(resp);
                        observer.complete();
                    }
                }, force);
            } catch (error) {
                observer.error(error);
            }

            return function () {

            }
        });
    }
    
    login (opts: Object) {
        let self = this;

        return Observable.create( (observer: Observer<FBResponseObject>) => {
            try {
                self.conn.login( (resp: FBResponseObject) => {
                    if (resp.error) {
                        observer.error(resp.error);
                    } else {
                        observer.next(resp);
                        observer.complete();
                    }
                }, opts);
            } catch (error) {
                observer.error(error);
            }

            return function () {

            }
        });

    }

    logout () {
        let self = this;
        
        return Observable.create( (observer: Observer<FBResponseObject>) => {
            try {
                self.conn.logout( (resp: FBResponseObject) => {
                    if (resp.error) {
                        observer.error(resp.error);
                    } else {
                        observer.next(resp);
                        observer.complete();
                    }
                });

            } catch (error) {
                observer.error(error);
            }

            return function () {

            }
        });
    }

    ui (params: FBUIParams) {
        let self = this;
        
        return Observable.create( (observer: Observer<FBResponseObject>) => {
            try {
                self.conn.ui( (params: FBUIParams, resp: FBResponseObject) => {
                    if (resp.error) {
                        observer.error(resp.error);
                    } else {
                        observer.next(resp);
                        observer.complete();
                    }
                });
            } catch (error) {
                observer.error(error);
            }

            return function () {

            }
        });

    }
    
    api(...args: any[]) {
        let self = this;
    
        return Observable.create( (observer: Observer<FBResponseObject>) => {
            try {

                args[args.length+1] = (resp: FBResponseObject) => {
                    if (resp.error) { 
                        observer.error(resp.error); 
                    } else {
                        observer.next(resp);
                        observer.complete();
                    }
                }
                
                self.conn.api(...args);

            } catch (error) {
                observer.error(error);
            }
            return function () {
                // clean up function
            }
            
        });
    }
}

