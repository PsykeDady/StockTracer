import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import { map } from "rxjs/operators";
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
		public  loadingService: LoadingService
	){}

	ngOnInit() {
		this.symbolForm=new FormGroup({
			"symbolNameInput" : new FormControl("",[
				Validators.required,
				Validators.maxLength(5),
				Validators.pattern(/^[A-Za-z]*$/),
				this.symbolAlreadyRegistered.bind(this)
			])
		})
	}

	symbolAlreadyRegistered(f:FormControl):{[s:string]:boolean}|null {
		if(!this.stockListService.stockLists || this.stockListService.stockLists?.length==0) return null;
		let uvalue=f.value?(f.value as string).toUpperCase():"";
		if(this.stockListService.stockLists?.some(v=>{
			return v.stockModel.stockSymbol.toUpperCase()==uvalue
		})) {
			return {'alreadyRegistered':true};
		}
		return null;
	}


	trackSymbol():void{
		let symbolName = this.symbolForm.get("symbolNameInput");
		let newSymbol= (symbolName?.value as string).toUpperCase()
		let subscription:Subscription=forkJoin([
			this.stockFinnhubService.getSymbols(newSymbol),
			this.stockFinnhubService.getQuota(newSymbol)
		]).pipe(map(arr=>{
			return {
				stockModel: new StockModel(arr[0].result[0].description,newSymbol),
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
				subscription?.unsubscribe()
			}, () => {
				this.loadingService.endLoading();
				subscription?.unsubscribe()
			}
		)
	}
}
