import { Injectable } from "@angular/core";
import { FinnhubQuotaResposeModel } from "src/models/finnhub-quota-response.model";
import { StockModelQuotaInterface } from "src/models/stock-model-quota.interface";
import { StockModel } from "src/models/stock.model";
import { LocalDataService } from "./local-data.service";

@Injectable()
export class StockListService {
	public stockLists: StockModelQuotaInterface[] = [
		// {stockModel: new StockModel("Tesla Inc.", "TSLA"), quotaModel: new FinnhubQuotaResposeModel(
		// 	699,
		// 	0,
		// 	-9.6,
		// 	711,
		// 	0,
		// 	703,
		// 	0
		// )},
		// {stockModel: new StockModel("Nintendo", "NTDOY"), quotaModel: new FinnhubQuotaResposeModel(
		// 	51.23,
		// 	0,
		// 	-1.28,
		// 	54.60,
		// 	0,
		// 	54.60,
		// 	0
		// )},
		// {stockModel: new StockModel("Apple Inc.", "AAPL"), quotaModel: new FinnhubQuotaResposeModel(
		// 	147.71,
		// 	0,
		// 	1.47,
		// 	147.66,
		// 	0,
		// 	144.08,
		// 	0
		// )},
	]

	constructor(private localDataService:LocalDataService) {}

	addStock(stockModelQuota: StockModelQuotaInterface){
		this.stockLists.push(stockModelQuota);
		this.localDataService.addSymbol(stockModelQuota.stockModel.stockSymbol);
	}

	removeStock(stockIndex:number){
		console.log("stockIndex",stockIndex)
		this.stockLists=this.stockLists.filter((_v,i)=>{
			console.log("i,stockindex:",i,stockIndex)
			return i!=stockIndex
		});
	}
}
