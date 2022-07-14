import { FinnhubSentimentalDataModel } from "./finnhub-sentiment-data.model";


/*
 *	data
 *	Array of sentiment data.
 *
 *
 *	symbol
 *	Symbol of the company.
 */
export class FinnhubSentimentResponseModel {
	constructor (
		public data		: FinnhubSentimentalDataModel[],
		public symbol	: string
	){}
}
