import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { FirestoneUsersService } from '../services/firestone-users.service';

export const sessionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authSessionService: FirestoneUsersService = inject(FirestoneUsersService);
  const router : Router = inject(Router);

  if(route.url[0].path == "login") {
    if(authSessionService.isSessionActive()) {
       //S'intenta accedir a "/login" un cop iniciada la sessió => Redirecció a "/home"
       router.navigate(["home"]);
       return false;
    } else {
       //S'intenta accedir a "/login" sense cap sessió iniciada => Accés permès
       return true;
    }
 } else {
    if(authSessionService.isSessionActive()) {
       //S'intenta accedir a "/dashboard" o a "/logout" amb la sessió iniciada => Accés permès
       return true;
    } else {
       //S'intenta accedir a "/dashboard" o a "/logout" sense sessió iniciada => Redirecció a "/login"
       router.navigate(["/login"]);
       return false;
    }
 }
};
