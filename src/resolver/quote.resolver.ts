import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { StockModelQuotaInterface } from "src/models/stock-model-quota.interface";
import { StockModel } from "src/models/stock.model";
import { LocalDataService } from "src/services/local-data.service";
import { StockListService } from "src/services/stock-list.service";
import { StockFinnhubService } from "src/services/stockFinnhub.service";

@Injectable()
export class QuoteResolver implements Resolve<StockModelQuotaInterface[]|null> {

	constructor(
		private localDataService:LocalDataService,
		private stockFinnhubService:StockFinnhubService,
		private stockListService:StockListService,
		private router : Router
	){

	}

	resolve(): Observable<StockModelQuotaInterface[]|null> | Promise<StockModelQuotaInterface[]|null> | StockModelQuotaInterface[]|null {
		let symbols:string[]=this.localDataService.getSymbols();

		if(this.stockListService.stockLists.length!=0 || symbols.length==0) {
			return null;
		}
		let observables: Observable<StockModelQuotaInterface>[] =[];
		symbols.forEach(v=>{
			let uv=v.toUpperCase();
			observables.push(forkJoin([
				this.stockFinnhubService.getSymbols(uv),
				this.stockFinnhubService.getQuota(uv)
			]).pipe(
				map( arr => {
					return {
						stockModel: new StockModel(arr[0].result[0].description,uv),
						quotaModel: arr[1]
					} as StockModelQuotaInterface
				}),
				catchError((err)=>{
					this.stockFinnhubService.errMsg="can't retrieve data! Reset api key?"
					this.router.navigate(["/login"])
					throw new Error(err.statusText);
				})
			))
		})
		return forkJoin(observables);
	}
}
