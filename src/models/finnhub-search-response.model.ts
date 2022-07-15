import { FinnhubSymbolModel } from "./finnhub-symbol.model";

/*
 *	count
 *	Number of results.
 *
 *	result
 *	Array of search results.
 */
export class FinnhubSearchResposeModel {
	constructor(
		public count 	: number,
		public result 	: FinnhubSymbolModel[]
	) {	}
}
