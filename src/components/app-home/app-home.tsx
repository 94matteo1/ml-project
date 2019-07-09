import { Component, Listen, Prop, State, h } from '@stencil/core';

import { AuthService } from '../../services/Auth';
import { DatabaseService } from '../../services/Database';

import { UserModel } from '../../models/user';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  todoSubscription: any;
  user: UserModel;
  
  @Prop() auth: AuthService;
  @Prop() db: DatabaseService;
  @Prop() session: firebase.User;

  @State() formData = {
    todo: ''
  };
  @State() myTodos: firebase.firestore.QueryDocumentSnapshot[] = [];

  @Listen('ionInput')
  onIonInput(event) {
    if (event && event.target && event.target.name && event.target.value) {
      this.formData[event.target.name] = event.target.value;
    }
  }

  async loginWithGithub(_event) {
    try {
      const result = await this.auth.withSocial('github');
      await this.user.update(result.user.uid, {
        email: result.user.email,
        oldUser: true
      });
    } catch (error) {
      alert('There was an error logging in...');
    }
  }

  async addTodo(_event) {
    event.preventDefault();
    await this.user.addTodo(this.formData);
    this.formData = {
      todo: ''
    };
  }

  async deleteTodo(ref: firebase.firestore.DocumentReference) {
    if (confirm('Are you sure you wish to delete this todo?')) {
      await this.user.deleteTodo(ref);
    }
  }

  async getTodos() {
    this.todoSubscription = this.user.getTodos((snapshot) => {
      this.myTodos = snapshot.empty ? [] : snapshot.docs;
    }, (error) => {
      console.log(error);
    });
  }

  async toggleTodo(ref: firebase.firestore.DocumentReference, finished: boolean) {
    await this.user.toggleTodo(ref, finished);
  }

  async componentDidLoad() {
    if (this.session) {
      this.user = new UserModel({
        db: this.db,
        session: this.session
      });
      await this.getTodos();
    }
  }

  componentDidUnload() {
    if (this.todoSubscription) {
      this.todoSubscription();
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        {this.session ? [
          <h1>Logged in as {this.session.email}</h1>,
          <ion-card>
          <ion-list>
            {this.myTodos.map(todo => 
              <ion-item>
                <ion-icon name="checkmark-circle" slot="start" onClick={() => this.toggleTodo(todo.ref, !todo.data().finished)} />
                <div class={todo.data().finished ? "finished" : ""}>
                  <h2>{todo.id} - {todo.data().todo}</h2>
                </div>
                <ion-icon name="trash" slot="end" onClick={() => this.deleteTodo(todo.ref)} />
              </ion-item>
            )}   
          </ion-list>
          </ion-card>,
          <form id="todo-form" name="todo-form" onSubmit={(event) => this.addTodo(event)}>
          <ion-card>
            <ion-list>
              <ion-item>
                <ion-input name="todo" placeholder="What do you want to accomplish?" value={this.formData.todo}></ion-input>
              </ion-item>
            </ion-list>
          </ion-card>
          <ion-button type="submit">Save</ion-button>
        </form>
        ] : <ion-button onClick={(event) => this.loginWithGithub(event)} expand="block">Login with Github</ion-button>}
      </ion-content>
    ];
  }
}
