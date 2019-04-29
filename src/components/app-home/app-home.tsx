import { Component, Prop } from '@stencil/core';

import { AuthService } from '../../services/Auth';
import { DatabaseService } from '../../services/Database';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  
  @Prop() auth: AuthService;
  @Prop() db: DatabaseService;
  @Prop() session: firebase.User;

  async loginWithGithub(_event) {
    try {
      const result = await this.auth.withSocial('github');
      const docRef = await this.db.update("users", result.user.uid, {
          email: result.user.email,
          oldUser: true
      });
      console.log(docRef);
    } catch (error) {
      alert('There was an error logging in...');
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        {this.session ? <h1>Logged in as {this.session.email}</h1> : <ion-button onClick={(event) => this.loginWithGithub(event)} expand="block">Login with Github</ion-button>}
      </ion-content>
    ];
  }
}
