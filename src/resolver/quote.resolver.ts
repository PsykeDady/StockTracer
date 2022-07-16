import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
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
		private stockListService:StockListService
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
			]).pipe(map( arr => {
				return {
					stockModel: new StockModel(arr[0].result[0].description,uv),
					quotaModel: arr[1]
				} as StockModelQuotaInterface
			})))
		})
		return forkJoin(observables);
	}
}
