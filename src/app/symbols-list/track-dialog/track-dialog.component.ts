import { Component, EventEmitter, Input, Output } from "@angular/core";
import { StockModel } from "src/models/stock.model";

@Component({
	selector:"track-dialog",
	templateUrl:"track-dialog.component.html",
	styleUrls:["track-dialog.component.css"]
})
export class TrackDialogComponent {

	@Input() stockModel:StockModel|null=null;

	@Output() close:EventEmitter<void> = new EventEmitter();

	closeStock():void{
		this.close.emit();
	}

	stonk():boolean{
		return this.stockModel?.changeToday!>=0??false;
	}
}
