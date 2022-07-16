import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { FinnhubSentimentResponseModel } from "src/models/finnhub-sentiment-response.model";
import { LoadingService } from "src/services/loading.service";
import { StockFinnhubService } from "src/services/stockFinnhub.service";

@Injectable()
export class SentimentResolver implements Resolve<FinnhubSentimentResponseModel> {

	constructor(
		private stockFinnhubService:StockFinnhubService,
		private router:Router,
		private loadingService: LoadingService
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

		return this.stockFinnhubService.getSentiment(symbol,`${yearpre}-${monthpre}-${daypre}`,`${year}-${month}-${day}`).pipe(
			map(v=>{
				if(v.data) v.data.sort((a,b)=>{
					return a?.month-b?.month
				})
				if (v.data?.length>3 ){
					v.data=v.data?.slice(-3)??[]
				}
				return v;
			}),
			catchError((error)=>{
				this.stockFinnhubService.errMsg="Error. Try to reset API KEY";
				console.log("ciao")
				this.loadingService.endLoading()
				this.router.navigate(["/"])
				throw new Error(error.statusText);
			}
		));
	}
}
