import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './Login.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdminLoginGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean>{
        return this.loginService.authResponse.pipe(take(1),map(response => {
            const isAuth = !! response;
            let isAdmin = false;
            if(isAuth && response._role === 'ROLE_ADMIN'){
                isAdmin = true;
            }
            if(isAuth && isAdmin){
                return true;
            }
            return this.router.createUrlTree(['/home']);
        }));
    }

}