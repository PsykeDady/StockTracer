/*
 *	description
 *	Symbol description
 *
 *	displaySymbol
 *	Display symbol name.
 *
 *	symbol
 *	Unique symbol used to identify this symbol used in /stock/candle endpoint.
 *
 *	type
 *	Security type.
 */

export class FinnhubSymbolModel {
	constructor(
		public description 		: string,
		public displaySymbol 	: string,
		public symbol 			: string,
		public type 			: string
	) {}
}
