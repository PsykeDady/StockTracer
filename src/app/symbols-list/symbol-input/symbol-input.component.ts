import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
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

		forkJoin([
			this.stockFinnhubService.getSymbols(symbolName?.value),
			this.stockFinnhubService.getQuota(symbolName?.value)
		]).pipe(map(arr=>{
			return {
				stockModel: new StockModel(arr[0].result[0].description,symbolName?.value),
				quotaModel: arr[1]
			} as StockModelQuotaInterface
		})).subscribe(
			stockQuota => {
				this.stockListService.addStock(stockQuota)
				symbolName?.reset();
			},
			error => {
				this.stockFinnhubService.errMsg=error.statusText;
				this.loadingService.endLoading();
			}, () => {
				this.loadingService.endLoading();
			}
		)

	}
}
