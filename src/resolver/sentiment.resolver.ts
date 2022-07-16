import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { FinnhubSentimentResponseModel } from "src/models/finnhub-sentiment-response.model";
import { StockFinnhubService } from "src/services/stockFinnhub.service";

@Injectable()
export class SentimentResolver implements Resolve<FinnhubSentimentResponseModel> {

	constructor(
		private stockFinnhubService:StockFinnhubService
	){}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): FinnhubSentimentResponseModel | Observable<FinnhubSentimentResponseModel> | Promise<FinnhubSentimentResponseModel> {
		let symbol = route.params["symbol"];
		let d = new Date();
		let dpre= new Date();
		dpre.setDate(d.getDate()-90);

		let day :string = `${d .getDate()<10?'0':''}${d .getDate()}`;
		let daypre:string = `${dpre.getDate()<10?'0':''}${dpre.getDate()}`;

		let month :string = `${d .getMonth()+1<10?'0':''}${d .getMonth()+1}`;
		let monthpre:string = `${dpre.getMonth()+1<10?'0':''}${dpre.getMonth()+1}`;

		let year :string = `${d .getFullYear()}`;
		let yearpre:string = `${dpre.getFullYear()}`;

		return this.stockFinnhubService.getSentiment(symbol,`${yearpre}-${monthpre}-${daypre}`,`${year}-${month}-${day}`).pipe(catchError((error,caugth)=>{
			this.stockFinnhubService.errMsg=error.statusText;
			return caugth;
		}));
	}
}
