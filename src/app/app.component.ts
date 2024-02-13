import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserList } from './class/userlist';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isBossHappy: boolean = true;
  bonus = new Object();
  dataUrl = 'https://api.jsonbin.io/v3/b/63e252e1ebd26539d07844a1';
  data_users: UserList = new UserList();
  title = 'prim_lek4_pszzd';
  //Приклад1
  getBonus(isBossHappy: boolean) {
    return new Promise((resolve, reject) => {
      if (isBossHappy) {
        this.bonus = { size: 'big', price: 2000 };
        resolve(this.bonus);
      } else {
        var reason = new Error('Boss is not happy. Премії не буде');
        reject(reason);
      }
    });
  }
  //Приклад1
  async_promise() {
    this.getBonus(this.isBossHappy)
      .then(function (fulfilled) {
        console.log(fulfilled);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
  //Приклад2
  getBonusTeam = (bonus: any) => {
    let message: string;
    message = 'I have bonus size=' + bonus.size + ' price=' + bonus.price + '$';
    return Promise.resolve(message);
  };
  async_promise_team() {
    console.log('Boss is not Happy!!!');
    this.getBonus(this.isBossHappy)
      .then(this.getBonusTeam)
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log('Boss is Happy!!!');
    console.log('Boss is Happy!!!');
    console.log('Boss is Happy!!!');
    console.log('Boss is Happy!!!');
  }
  //Приклад3
  async async_await_promise_team() {
    try {
      console.log('Boss is not Happy!!!');
      let bonus = await this.getBonus(this.isBossHappy);
      let message = await this.getBonusTeam(bonus);
      console.log(message);
      console.log('Boss is Happy!!!');
    } catch (error) {
      console.log('error.message');
    }
  }
  //приклад4

  //функція зчитування
  async load() {
    this.data_users.users = [];
    //Отримання запиту асинхроно
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        // Обробка отриманих даних
        console.log(data);
        data = data.record;
        console.log(data);
        let i = 0;
        while (data[i] != undefined) {
          this.data_users.addUser(data[i][0].user, data[i][0].money);
          i++;
        }
      })
      .catch((error) => {
        alert('Помилка зчитування даних');
        console.error('Помилка:', error);
      });
  }
  getColor(a: number) {
    let rezult = this.data_users.getMinMaxMoney();
    if (a == rezult[0]) return 'green';
    else if (a == rezult[1]) return 'red';
    else return '';
  }
}
