import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public isConnected = false;
  classToggled = false;
  isClicked = false;
  menuOpen = false;
  userId;
  @Input() mouseFirstOut = false;
  @Input() isAccueil: boolean;
  currentUser: User;
  @Input() isClosed = false;
  items = [
    {
      title: 'Jeux',
      url: 'jeux/1',
      index: 0,
    },
    {
      title: 'à propos',
      url: 'a-propos',
      index: 1,
    },
    {
      title: 'contact',
      url: 'contact',
      index: 2,
    },
  ];
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    try {
      this.authService.currentUserSubject.subscribe((response) => {
        this.currentUser = response;
      }, (err) => {
        console.log(err);
      })
      this.userId = this.authService.getUserId();
      this.authService.findUserById();
    } catch (error) {
      console.log("__Error handled gracefully : ", error.name);
    };
  }

  logout(): void {
    this.authService.logOut();
  }

  openMenu(): void {
    this.classToggled = !this.classToggled;
    this.isClicked = !this.isClicked;
  }

  menuDesktopOpen(event: any): void {
    if (!this.isAccueil && this.mouseFirstOut) {
      this.isClosed = false;
    };
  }

  resetMouseFirstOut(): void {
    this.mouseFirstOut = false;
    this.isClosed = !this.isAccueil;
  }

  menuDesktopClosed(event: any): void {
    if (!this.isAccueil) {
      this.isClosed = true;
    };
    this.mouseFirstOut = true;
  }
}
