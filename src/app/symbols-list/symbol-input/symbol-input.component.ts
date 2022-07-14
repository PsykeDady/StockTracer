import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
	selector:"symbol-input",
	templateUrl:"symbol-input.component.html",
	styleUrls:["symbol-input.component.css"]
})
export class SymbolInputComponent implements OnInit{

	symbolForm: FormGroup=new FormGroup({});

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
		let symbolName = this.symbolForm.get("symbolNameInput")
		console.log(symbolName?.value);
		symbolName?.reset();
	}
}
