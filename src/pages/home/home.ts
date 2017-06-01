import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
      private options = {
            name: "data.db",
            location: 'default',
            createFromLocation: 1
      };
      private createQuery = "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstna" +
                  "me TEXT, lastname TEXT)";
      private insertQuery = "INSERT INTO people (firstname, lastname) VALUES ('Nic', 'Raboy')";
      private selectQuery = "SELECT * FROM people";
      public names : String[] = [];
      public people : Array < Object >;
      constructor(public navCtrl : NavController, private sqlite : SQLite, private platform : Platform) {
            this
                  .platform
                  .ready()
                  .then(() => {
                        this
                              .sqlite
                              .create(this.options)
                              .then((db : SQLiteObject) => {
                                    db
                                          .executeSql(this.createQuery, {})
                                          .then(() => console.log('Executed SQL'))
                                          .catch(e => console.log(e));
                              })
                              .catch(e => console.log(e));
                  });
      }
      ionViewDidLoad() {}
      public add() {
            this
                  .sqlite
                  .create(this.options)
                  .then((db : SQLiteObject) => {
                        db
                              .executeSql(this.insertQuery, {})
                              .then(() => console.log('Executed SQL'))
                              .catch(e => console.log(e));
                  })
                  .catch(e => console.log(e));
      }
      public refresh() {
            this
                  .sqlite
                  .create(this.options)
                  .then((db : SQLiteObject) => {
                        db
                              .executeSql(this.selectQuery, {})
                              .then((data) => {
                                    this.people = []
                                    let rows = data.rows;
                                    for (let i = 0; i < rows.length; i++) 
                                          this.people.push({
                                                firstname: rows
                                                      .item(i)
                                                      .firstname,
                                                lastname: rows
                                                      .item(i)
                                                      .lastname
                                          });
                                    console.log("Number of names on database = " + this.people.length);
                              })
                  });
      }
      // Import the AlertController from ionic package Consume it in the constructor
      // as 'alertCtrl'

}