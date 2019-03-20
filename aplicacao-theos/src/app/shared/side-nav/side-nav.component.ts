import { Component, OnInit, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  @Input() initiais: string;
  // tslint:disable-next-line:variable-name
  _mobileQueryListener: () => void;
  constructor(
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.initiais = 'A';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.router.navigate(['account/login']);
  }

}
