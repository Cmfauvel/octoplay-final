import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MediaService } from './services/media.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Octoplay-app';
  isAccueil: boolean = true;
  isMenuClosed: boolean = false;
  width: number;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  setWidth(widthNumber: number) {
    this.width = widthNumber;
    this.cdr.detectChanges();
  }

  isDesktop: boolean;
  private mediaService = new MediaService('(min-width: 1024px)');

  ngOnInit(): void {
    this.mediaService.match$.subscribe((value) => (this.isDesktop = value));
    this.onRoutingNavChange();
  }

  onRoutingNavChange(): void {
    this.route.queryParams.subscribe((params) => {
      this.title = params['name'];
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] === '/jeux' ||
          event['url'] === '/contact' ||
          event['url'] === '/bazar' ||
          event['url'] === '/a-propos'
        ) {
          this.isAccueil = false;
          this.isMenuClosed = true;
        } else {
          this.isAccueil = true;
          this.isMenuClosed = false;
        }
      }
    });
  }
}
