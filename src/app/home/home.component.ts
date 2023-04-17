import { OnInit, Component } from '@angular/core';
import { UserApiService } from '../services/user-api.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: Users | undefined;
  usersList: Users[] = [];

  constructor(private userApiService: UserApiService) { }

  ngOnInit() {
    console.log(this.currentUser);
    console.log(this.usersList);
    const currentUser = this.userApiService.getCurrentUser();
    if (currentUser !== undefined) {
      this.currentUser = currentUser;
    }
    this.usersList = this.userApiService.getUsers();

    
  }
}
