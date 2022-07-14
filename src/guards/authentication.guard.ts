import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalDataService } from "src/services/local-data.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private localDataService:LocalDataService,
		private router:Router) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

		return this.localDataService.existsApiKey() || this.router.createUrlTree(["login"]);
	}
}
