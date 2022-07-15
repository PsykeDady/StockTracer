import { FinnhubQuotaResposeModel } from "./finnhub-quota-response.model";
import { StockModel } from "./stock.model";

export interface StockModelQuotaInterface {
	stockModel:StockModel;
	quotaModel:FinnhubQuotaResposeModel
}
