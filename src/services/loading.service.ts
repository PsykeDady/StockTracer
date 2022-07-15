import { EventEmitter } from "@angular/core";

export class LoadingService {
	public loading:boolean=false;
	public finish:EventEmitter<void> = new EventEmitter();

	endLoading():void{
		this.loading=false;
		this.finish.emit();
	}

}
