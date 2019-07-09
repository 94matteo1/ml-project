import { Component, State, h } from '@stencil/core';

import { AuthService } from '../../services/Auth';
import { DatabaseService } from '../../services/Database';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @State()
  defaultProps: {
    auth: AuthService,
    db?: any,
    session?: any
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

  componentDidLoad() {
    this.defaultProps.db = new DatabaseService();
    this.defaultProps.auth.onAuthChanged(session => {
      console.log(session);
      this.defaultProps.session = session;
      this.defaultProps = {...this.defaultProps};
    });
    this.defaultProps = {...this.defaultProps};
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" componentProps={{...this.defaultProps}} />
          <ion-route url="/profile/:name" component="app-profile" componentProps={{...this.defaultProps}} />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
