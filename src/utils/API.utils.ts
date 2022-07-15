export class APIUtils {
	private constructor() {}
	public static readonly FINNHUB_API_URL_BASE:string ="https://finnhub.io/api/v1/";
	public static readonly FINNHUB_API_URL_GET_SYMBOL:string=APIUtils.FINNHUB_API_URL_BASE+"search"
	public static readonly FINNHUB_API_URL_GET_SENTIMENT:string=APIUtils.FINNHUB_API_URL_BASE+"stock/insider-sentiment"
	public static readonly FINNHUB_API_URL_GET_QUOTE:string=APIUtils.FINNHUB_API_URL_BASE+"quote"
}
