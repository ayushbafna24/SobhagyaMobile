import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { SplashScreen } from '@capacitor/splash-screen';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  urlSafe: SafeResourceUrl | undefined;
  url: string = 'https://www.malavkesari.com/';
  networkListener!: PluginListenerHandle;
  status!: boolean;
  model = {};

  constructor(public sanitizer: DomSanitizer, private ngZone: NgZone) {}

  async ngOnInit() {
    // Hide the splash (you should do this on app launch)
    // SplashScreen.hide();

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.networkListener = await Network.addListener(
      'networkStatusChange',
      (status) => {
        console.log('Network status changed', status);
        this.ngZone.run(() => {
          this.changeStatus(status);
        });
      }
    );
    const status = await Network.getStatus();
    console.log('Network status:', status);
    this.changeStatus(status);
    console.log('Network status:', this.status);
  }

  changeStatus(status: ConnectionStatus) {
    this.status = status?.connected;
    if (!this.status) {
      this.model = {
        background: 'assets/imgs/12.png',
        title: 'No Connection',
        subtitle: 'Your internet connection was',
        description: 'interrupted, Please retry.',
        titleColor: 'dark',
        color: 'medium',
        button: 'RETRY',
        buttonColor: 'dark',
      };
      this.ngOnDestroy();
    }
  }

  checkStatus(event: any) {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    if (this.networkListener) this.networkListener.remove();
  }
}
