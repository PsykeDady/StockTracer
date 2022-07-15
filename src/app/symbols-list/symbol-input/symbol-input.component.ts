import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FinnhubQuotaResposeModel } from "src/models/finnhub-quota-response.model";
import { FinnhubSearchResposeModel } from "src/models/finnhub-search-response.model";
import { StockModelQuotaInterface } from "src/models/stock-model-quota.interface";
import { StockModel } from "src/models/stock.model";
import { LoadingService } from "src/services/loading.service";
import { StockListService } from "src/services/stock-list.service";
import { StockFinnhubService } from "src/services/stockFinnhub.service";

@Component({
	selector:"symbol-input",
	templateUrl:"symbol-input.component.html",
	styleUrls:["symbol-input.component.css"],
})
export class SymbolInputComponent implements OnInit{

	symbolForm: FormGroup=new FormGroup({});

	constructor(
		private stockListService:StockListService,
		private stockFinnhubService : StockFinnhubService,
		public loadingService: LoadingService
	){}

	ngOnInit() {
		this.symbolForm=new FormGroup({
			"symbolNameInput" : new FormControl("",[
				Validators.required,
				Validators.maxLength(5),
				Validators.pattern(/^[A-Za-z]*$/)
			])
		})
	}

	trackSymbol():void{
		let symbolName = this.symbolForm.get("symbolNameInput");
		let stockMQI:StockModelQuotaInterface = {
			stockModel: new StockModel("",symbolName?.value),
			quotaModel: new FinnhubQuotaResposeModel(-1,-1,-1,-1,-1,-1,-1)
		}
		this.stockFinnhubService.getSymbols(symbolName?.value).subscribe(
			(searchResposeModel: FinnhubSearchResposeModel)=>{
				stockMQI.stockModel.stockName=searchResposeModel.result[0]?.description ?? "ERRORE";

				this.stockFinnhubService.getQuota(symbolName?.value).subscribe(
					finnhubQuotaResposeModel=>{
						stockMQI.quotaModel=finnhubQuotaResposeModel;

						this.stockListService.addStock(stockMQI);

						symbolName?.reset();
					},
					error=>{
						this.stockFinnhubService.errMsg=error.statusText;
						this.loadingService.endLoading();
					},
					()=>{
						this.loadingService.endLoading();
					}
				);
			},
			error=>{
				this.stockFinnhubService.errMsg=error.statusText;
				this.loadingService.endLoading();
			},
			()=>{
				this.loadingService.endLoading();
			}
		);

	}
}
