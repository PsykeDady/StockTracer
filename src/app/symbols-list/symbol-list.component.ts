import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { StockModelQuotaInterface } from "src/models/stock-model-quota.interface";
import { LoadingService } from "src/services/loading.service";
import { LocalDataService } from "src/services/local-data.service";
import { StockListService } from "src/services/stock-list.service";
import { StockFinnhubService } from "src/services/stockFinnhub.service";

@Component({
	selector:"symbol-list",
	templateUrl:"symbol-list.component.html",
	styleUrls:["symbol-list.component.css"]
})
export class SymbolListComponent implements OnDestroy {

	public errMsg:string="";
	readonly alertMessage="Error on check Finnhub Stock. Change Symbol or try to reset APIKEY";
	public finishSubscription:Subscription|null=null;

	constructor(
		private localDataService:LocalDataService,
		private router:Router,
		private stockFinnhubService:StockFinnhubService,
		public stockListService:StockListService,
		public loadingService:LoadingService,
			   activatedRoute:ActivatedRoute
	){
		this.finishSubscription=loadingService.finish.subscribe(
			()=>{
				this.errMsg=stockFinnhubService.errMsg;
			}
		)
		activatedRoute.data.subscribe(data=>{
			if(data["stockData"]) {
				stockListService.stockLists = (data["stockData"] as StockModelQuotaInterface []).map(v=>v);
			}
			loadingService.endLoading();
		})
	}

	ngOnDestroy(): void {
		this.finishSubscription?.unsubscribe();
	}

	removeStock(stockIndex:number){
		this.stockListService.removeStock(stockIndex)
	}

	resetApiKey():void{
		this.localDataService.resetApiKey();
		this.router.navigate(["/login"])
	}

	resetMsg():void{
		this.errMsg="";
		this.stockFinnhubService.errMsg="";
	}
}
