import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { FirestoneUsersService } from '../services/firestone-users.service';
import { Users } from '../models/users';

export const rolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService: FirestoneUsersService = inject(FirestoneUsersService);
  const router: Router = inject(Router);

  const user: Users | null = userService.userRol;

  if (route.url[0].path == "addProperty" && "updateProperty/:element") {
    if (user?.level == "administrador") {
      return true;
    } else {

      router.navigate(["home"]);
      return false;
    }
  } 
  return true;
};
