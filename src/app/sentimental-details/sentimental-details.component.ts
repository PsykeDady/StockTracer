import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FinnhubSentimentResponseModel } from "src/models/finnhub-sentiment-response.model";
import { LoadingService } from "src/services/loading.service";
import { StockFinnhubService } from "src/services/stockFinnhub.service";

@Component({
	selector:"sentimental-details",
	templateUrl:"sentimental-details.component.html",
	styleUrls:["sentimental-details.component.css"]
})
export class SentimentalDetailsComponent implements OnInit, OnDestroy{

	subscribtion:Subscription|null=null;
	mdDisplay:boolean=false;
	stockName:string=""
	readonly alertMessage="Error on check Finnhub Stock. Change Symbol or try to reset APIKEY";

	finnhubSentimentResponseModel:FinnhubSentimentResponseModel|null= null;

	constructor(activatedRoute:ActivatedRoute,public loadingService:LoadingService){

		this.subscribtion=activatedRoute.data.subscribe(data=> {
			this.finnhubSentimentResponseModel=data["sentiments"];
			this.stockName=data["name"];

			console.log("this.finnhubSentimentResponseModel",this.finnhubSentimentResponseModel)
			console.log("this.stockName",this.stockName)

			loadingService.endLoading()
		})
	}

	ngOnInit(): void {
		this.onResize();
	}

	ngOnDestroy(): void {
		this.subscribtion?.unsubscribe();
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.mdDisplay=window.innerWidth>=768;
	}

	lastItem(ind:number):boolean{

		return !!this.finnhubSentimentResponseModel && ind<this.finnhubSentimentResponseModel.data.length-1;
	}


}
