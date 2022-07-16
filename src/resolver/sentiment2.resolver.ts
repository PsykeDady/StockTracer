import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
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
		let d2= new Date();
		let d3= new Date();
		let d4= new Date();
		d2.setDate(d.getDate()-30);
		d3.setDate(d.getDate()-60);
		d4.setDate(d.getDate()-90);

		let day :string = `${d .getDate()<10?'0':''}${d .getDate()}`;
		let day2:string = `${d2.getDate()<10?'0':''}${d2.getDate()}`;
		let day3:string = `${d3.getDate()<10?'0':''}${d3.getDate()}`;
		let day4:string = `${d4.getDate()<10?'0':''}${d4.getDate()}`;

		let month :string = `${d .getMonth()+1<10?'0':''}${d .getMonth()+1}`;
		let month2:string = `${d2.getMonth()+1<10?'0':''}${d2.getMonth()+1}`;
		let month3:string = `${d3.getMonth()+1<10?'0':''}${d3.getMonth()+1}`;
		let month4:string = `${d4.getMonth()+1<10?'0':''}${d4.getMonth()+1}`;

		let year :string = `${d .getFullYear()}`;
		let year2:string = `${d2.getFullYear()}`;
		let year3:string = `${d3.getFullYear()}`;
		let year4:string = `${d4.getFullYear()}`;

		return forkJoin([
			this.stockFinnhubService.getSentiment(symbol,`${year2}-${month2}-${day2}`,`${year}-${month}-${day}`),
			this.stockFinnhubService.getSentiment(symbol,`${year2}-${month2}-${day2}`,`${year3}-${month3}-${day3}`),
			this.stockFinnhubService.getSentiment(symbol,`${year3}-${month3}-${day3}`,`${year4}-${month4}-${day4}`)
		]).pipe(map(arr=>{
			console.log(arr)
			return new FinnhubSentimentResponseModel(arr[0].data.concat(arr[1].data).concat(arr[2].data), arr[0].symbol)}
		))
	}
}
