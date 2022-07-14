import { Component } from "@angular/core";
import { Router } from "@angular/router";
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

	public stockLists: StockModel[] = [
		new StockModel("Tesla Inc.", "TSLA", -9.6,699,703,711),
		new StockModel("Nintendo", "NTDOY", -1.28 ,51.23,54.60,54.60),
		new StockModel("Apple Inc.", "AAPL", 1.47 ,147.71,144.08,147.66)
	]

	removeStock(stockIndex:number){
		this.stockLists=this.stockLists.filter((v,i)=>i!=stockIndex);
	}

	resetApiKey():void{
		this.localDataService.resetApiKey();
		this.router.navigate(["/login"])
	}
}
