import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FinnhubSentimentalDataModel } from "src/models/finnhub-sentiment-data.model";
import { FinnhubSentimentResponseModel } from "src/models/finnhub-sentiment-response.model";

@Component({
	selector:"sentimental-details",
	templateUrl:"sentimental-details.component.html",
	styleUrls:["sentimental-details.component.css"]
})
export class SentimentalDetailsComponent implements OnInit, OnDestroy{

	subscribtion:Subscription|null=null;
	mdDisplay:boolean=false;


	finnhubSentimentResponseModel:FinnhubSentimentResponseModel= new FinnhubSentimentResponseModel([
		new FinnhubSentimentalDataModel(-150,1,12.56,"",2022),
		new FinnhubSentimentalDataModel(78  ,2,25.46,"",2022),
		new FinnhubSentimentalDataModel(89  ,3,29.43,"",2022)
	],"");

	constructor(activatedRoute:ActivatedRoute){
		this.subscribtion = activatedRoute.params.subscribe(params=>{
			console.log(params)
			this.finnhubSentimentResponseModel.symbol=params["symbol"];
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
		return ind<this.finnhubSentimentResponseModel.data.length-1
	}

}
