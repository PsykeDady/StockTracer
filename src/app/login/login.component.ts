import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LocalDataService } from "src/services/local-data.service";
import { StockFinnhubService } from "src/services/stockFinnhub.service";

@Component({
	selector:"login",
	templateUrl:"login.component.html"
})
export class LoginComponent {
	public apiForm:FormGroup=new FormGroup({});

	constructor(
		private localDataService:LocalDataService,
		private router: Router,
		public  stockFinnhubService: StockFinnhubService
	){
		this.apiForm=new FormGroup({
			"apikeyInput":new FormControl("",Validators.required)
		})
	}

	saveApiKey():void{
		this.localDataService.setApiKey(this.apiForm?.get("apikeyInput")?.value);
		this.router.navigate(["/"]);
	}

	resetMsg():void{
		this.stockFinnhubService.errMsg="";
	}
}
