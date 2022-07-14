/*
 *	c
 *	Current price
 *
 *	d
 *	Change
 *
 *	dp
 *	Percent change
 *
 *	h
 *	High price of the day
 *
 *	l
 *	Low price of the day
 *
 *	o
 *	Open price of the day
 *
 *	pc
 *	Previous close price
 */
export class FinnhubQuotaResposeModel {
	constructor(
		public c	: number ,
		public d	: number ,
		public dp	: number ,
		public h	: number ,
		public l	: number ,
		public o	: number ,
		public pc	: number
	) {}
}
