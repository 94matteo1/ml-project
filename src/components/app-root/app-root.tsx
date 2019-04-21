import { Component } from '@stencil/core';

import { AuthService } from '../../services/Auth';
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  defaultProps: {
    auth: AuthService
  } = {
    auth: new AuthService({
      firebase: {
        apiKey: "AIzaSyBpVG2JOIVTXfO-fWx7-YZq938dSINu9Lc",
        authDomain: "madness-labs-pwa.firebaseapp.com",
        databaseURL: "https://madness-labs-pwa.firebaseio.com",
        projectId: "madness-labs-pwa",
        storageBucket: "madness-labs-pwa.appspot.com",
        messagingSenderId: "540141413358"
      }
    })
  };  

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" componentProps={this.defaultProps} />
          <ion-route url="/profile/:name" component="app-profile" componentProps={this.defaultProps} />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
