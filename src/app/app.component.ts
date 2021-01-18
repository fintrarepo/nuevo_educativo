import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'educativo';


  constructor(
    private router: Router
  ) {
    const navEvents$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );
    navEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-88013736-1', {
        page_path: event.urlAfterRedirects
      });

    })
  }
}
