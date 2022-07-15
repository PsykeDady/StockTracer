import { FinnhubQuotaResposeModel } from "src/models/finnhub-quota-response.model";
import { StockModel } from "src/models/stock.model";

export class StockListService {
	public stockLists: {stockModel:StockModel,quotaModel:FinnhubQuotaResposeModel}[] = [
		{stockModel: new StockModel("Tesla Inc.", "TSLA"), quotaModel: new FinnhubQuotaResposeModel(
			699,
			0,
			-9.6,
			711,
			0,
			703,
			0
		)},
		{stockModel: new StockModel("Nintendo", "NTDOY"), quotaModel: new FinnhubQuotaResposeModel(
			51.23,
			0,
			-1.28,
			54.60,
			0,
			54.60,
			0
		)},
		{stockModel: new StockModel("Apple Inc.", "AAPL"), quotaModel: new FinnhubQuotaResposeModel(
			147.71,
			0,
			1.47,
			147.66,
			0,
			144.08,
			0
		)},
	]


}
