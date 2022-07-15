import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FinnhubQuotaResposeModel } from "src/models/finnhub-quota-response.model";
import { StockModelQuotaInterface } from "src/models/stock-model-quota.interface";
import { StockModel } from "src/models/stock.model";
import { LocalDataService } from "src/services/local-data.service";

@Component({
	selector:"symbol-list",
	templateUrl:"symbol-list.component.html",
	styleUrls:["symbol-list.component.css"]
})
export class SymbolListComponent {

	constructor(private localDataService:LocalDataService, private router:Router){
	}

	public stockLists: StockModelQuotaInterface[] = [
		{stockModel: new StockModel("Tesla Inc.", "TSLA"), quotaModel: new FinnhubQuotaResposeModel(
			699,
			0,
			-9.6,
			711,
			0,
			703,
			0
		)},
		{stockModel: new StockModel("Nintendo", "NTDOY"), quotaModel: new FinnhubQuotaResposeModel(
			51.23,
			0,
			-1.28,
			54.60,
			0,
			54.60,
			0
		)},
		{stockModel: new StockModel("Apple Inc.", "AAPL"), quotaModel: new FinnhubQuotaResposeModel(
			147.71,
			0,
			1.47,
			147.66,
			0,
			144.08,
			0
		)},
	]

	removeStock(stockIndex:number){
		this.stockLists=this.stockLists.filter((v,i)=>i!=stockIndex);
	}

	resetApiKey():void{
		this.localDataService.resetApiKey();
		this.router.navigate(["/login"])
	}
}
