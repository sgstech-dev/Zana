import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return (auth.check() && (route.routeConfig.path == "" || auth.getPermision("menu:" + route.routeConfig.path)))  ? true : router.parseUrl('/auth/login');
  //return true;

};
