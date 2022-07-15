import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http"
import { APIUtils } from "src/utils/API.utils";
import { FinnhubSentimentResponseModel } from "src/models/finnhub-sentiment-response.model";
import { FinnhubQuotaResposeModel } from "src/models/finnhub-quota-response.model";
import { FinnhubSearchResposeModel } from "src/models/finnhub-search-response.model";
@Injectable()
export class StockFinnhubService {

	constructor(private httpClient:HttpClient) {

	}

	getSentiment(symbol:string,from:string,to:string):Observable<FinnhubSentimentResponseModel>{
		return this.httpClient.get<FinnhubSentimentResponseModel>(APIUtils.FINNHUB_API_URL_GET_SENTIMENT,{
			params:new HttpParams().set("symbol",symbol).set("from",from).set("to",to)
		});
	}

	getQuota(symbol:string):Observable<FinnhubQuotaResposeModel>{
		return this.httpClient.get<FinnhubQuotaResposeModel>(APIUtils.FINNHUB_API_URL_GET_QUOTE,{
			params: new HttpParams().set("symbol",symbol)
		});
	}

	getSymbols(symbol:string): Observable<FinnhubSearchResposeModel> {
		return this.httpClient.get<FinnhubSearchResposeModel> (APIUtils.FINNHUB_API_URL_GET_SYMBOL,{
			params: new HttpParams().set("q",symbol)
		});
	}

}
