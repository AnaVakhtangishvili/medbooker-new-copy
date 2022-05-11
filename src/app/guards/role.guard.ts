import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = route.data['role'];
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (
          Number(JSON.parse(String(user?.displayName)).entityNo) === role
        ) {
          return true;
        }
        this.router.navigate(['main/dashboard']);
        return false;
      })
    );
  }
  
}
