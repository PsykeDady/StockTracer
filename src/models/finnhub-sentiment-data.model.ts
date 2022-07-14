/*
 *	change
 *	Net buying/selling from all insiders' transactions.
 *
 *	month
 *	Month.
 *
 *	mspr
 *	Monthly share purchase ratio.
 *
 *	symbol
 *	Symbol.
 *
 *	year
 *	Year.
 */
export class FinnhubSentimentalDataModel {
	constructor(
		public change	: number,
		public month	: number,
		public mspr		: number,
		public symbol	: string,
		public year		: number
	) {}
}
