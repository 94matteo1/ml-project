import { Component, Prop } from '@stencil/core';

import { AuthService } from '../../services/Auth';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Prop() auth: AuthService;

  async loginWithGithub(_event) {
    const result = await this.auth.withSocial('github');
    console.log(result);
    // const provider = new firebase.auth.GithubAuthProvider();
    // const result = await firebase.auth().signInWithPopup(provider);
    // console.log(result);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-button onClick={(event) => this.loginWithGithub(event)} expand="block">Login with Github</ion-button>
      </ion-content>
    ];
  }
}
