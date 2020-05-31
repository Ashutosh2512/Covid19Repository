import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { LoginService } from './Login.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserLoginGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean>{
        return this.loginService.authResponse.pipe(take(1),map(response => {
            const isAuth = !! response;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/home']);
        }));
    }

}