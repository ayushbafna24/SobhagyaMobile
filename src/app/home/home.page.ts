import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  urlSafe: SafeResourceUrl | undefined;
  url: string = 'https://www.malavkesari.com/';
  constructor(public sanitizer: DomSanitizer) {}
  ngOnInit() {
    // Hide the splash (you should do this on app launch)
    SplashScreen.hide();

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
