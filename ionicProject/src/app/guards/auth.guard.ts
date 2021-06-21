
import { Platform } from '@ionic/angular';
import { DataService } from './../services/data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    public dataService: DataService,
    private router: Router,
    private platForm: Platform,

  ) {
    this.platForm.backButton.subscribe((back) => {
      // if needed you can handel the back button
    })
  }

  //Guard handle the authentication when user login to Database
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(logging => {

        if (!logging) {
          this.router.navigateByUrl('/login')
        }
      })
    )
  }

}
