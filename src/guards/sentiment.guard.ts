import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalDataService } from "src/services/local-data.service";
import { StockListService } from "src/services/stock-list.service";

@Injectable()
export class SentimentGuard implements CanActivate {
	constructor(private stockListService:StockListService, private localDateService:LocalDataService, private router:Router){

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


		if(this.stockListService.stockLists.length==0 || this.stockListService.stockLists.length!=this.localDateService.getSymbols().length){
			return this.router.createUrlTree(["/"]);
		}

		return true;
	}
}
