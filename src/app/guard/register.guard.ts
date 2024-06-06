import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { FirestoneUsersService } from '../services/firestone-users.service';

export const registerGuard:  CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authSessionService: FirestoneUsersService = inject(FirestoneUsersService);
  const router : Router = inject(Router);

  if(route.url[0].path == "register") {
    if(authSessionService.isSessionActive()) {
  
       router.navigate(["home"]);
       return false;
    } else {

       return true;
    }
 } else {
    if(authSessionService.isSessionActive()) {

       return true;
    } else {

       router.navigate(["/login"]);
       return false;
    }
 }
};
