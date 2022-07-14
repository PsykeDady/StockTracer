import { Component, Input } from "@angular/core";
import { FinnhubSentimentalDataModel } from "src/models/finnhub-sentiment-data.model";

@Component({
	selector:"sentimental-data-month",
	templateUrl:"sentimental-data-month.component.html",
	styleUrls:["sentimental-data-month.component.css"]
})
export class SentimentalDataMonthComponent {
	@Input("data") sentimentalDataModel : FinnhubSentimentalDataModel| null=null;

	stonk():boolean{
		return this.sentimentalDataModel?  this.sentimentalDataModel.change>0 : false;
	}
}
