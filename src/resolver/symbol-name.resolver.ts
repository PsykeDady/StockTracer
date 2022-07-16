import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { StockListService } from "src/services/stock-list.service";

@Injectable()
export class SymbolNameResolver implements Resolve<string> {

	constructor(private stockListService:StockListService){}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
		let symbol = route.params["symbol"];
		let name:string = this.stockListService.stockLists.filter(v=>symbol==v.stockModel.stockSymbol).map(v=> v.stockModel.stockName).reduce(p=>p);

		return name;
	}
}
