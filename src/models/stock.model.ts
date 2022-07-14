export class StockModel {
	public constructor(
		public stockName:string,
		public stockSymbol:string,
		public changeToday:number,
		public changePrice:number,
		public openingPrice:number,
		public highPrice:number
	){}
}
