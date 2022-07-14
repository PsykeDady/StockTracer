export class APIUtils {
	private constructor() {}

	public static readonly FINNHUB_API_URL_BASE:string ="https://finnhub.io/api/v1/";
	public static readonly FINNHUB_API_URL_GET_SYMBOL:string=APIUtils.FINNHUB_API_URL_BASE+"/search?q=apple"
	public static readonly FINNHUB_API_URL_GET_SENTIMENT:string=APIUtils.FINNHUB_API_URL_BASE+"/stock/insider-sentiment?symbol=TSLA&from=2015-01-01&to=2022-03-01"
	public static readonly FINNHUB_API_URL_GET_QUOTE:string=APIUtils.FINNHUB_API_URL_BASE+"/quote?symbol=AAPL"
}
