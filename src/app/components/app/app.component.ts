import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newspaper';
  user: any;

  // constructor(private userService: UserService) {
  //   userService.user()
  //     .subscribe(data => {
  //       this.user = data;
  //       console.log(this.user);
  //     });
  // }

}
