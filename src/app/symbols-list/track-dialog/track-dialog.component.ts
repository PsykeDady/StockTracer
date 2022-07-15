import { Component, EventEmitter, Input, Output } from "@angular/core";
import { StockModelQuotaInterface } from "src/models/stock-model-quota.interface";

@Component({
	selector:"track-dialog",
	templateUrl:"track-dialog.component.html",
	styleUrls:["track-dialog.component.css"]
})
export class TrackDialogComponent {

	@Input() stockModelQuota:StockModelQuotaInterface|null=null;

	@Output() close:EventEmitter<void> = new EventEmitter();

	closeStock():void{
		this.close.emit();
	}

	stonk():boolean{
		return this.stockModelQuota?.quotaModel?.dp!>=0??false;
	}
}
