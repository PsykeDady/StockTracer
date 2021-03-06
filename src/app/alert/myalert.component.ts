import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector:'my-alert',
	templateUrl:'myalert.component.html',
	styleUrls:['myalert.component.css']
})
export class MyAlertComponent {
	closed:boolean=false;
	@Input() tipologia:"ALERT"|"WARNING"|"SUCCESS"|"DARK"|""="";
	@Input() message:string="";
	@Input() titolo:string="";
	@Output() closeEvent : EventEmitter<void> = new EventEmitter<void>();

	close(){
		this.closed=true;
		this.closeEvent.emit();
	}

	open(){
		this.closed=false;
	}

	classBasedType() {
		let background_color:string;
		let color:string;
		switch (this.tipologia) {
			case "ALERT":
				background_color="var(--bg-ko)";
				color="var(--fg-ko)";
				break;
			case "WARNING":
				background_color="var(--bg-wg)";
				color="var(--fg-wg)";
				break;
			case "SUCCESS":
				background_color="var(--bg-ok)";
				color="var(--fg-ok)";
				break;
			case "DARK":
				background_color="#000000";
				color="#FFFFFF";
				break;
			default:
				background_color="#FFFFFF";
				color="#000000";
		}
		return {'color':color,"background-color":background_color}
	}

	shadowX(event:Event){
		let closeX=event.target as HTMLElement
		if(closeX.style.textShadow){
			closeX.style.textShadow=""
		} else {
			let revertC=closeX.style.color
			closeX.style.textShadow=`0px 0px 5px ${revertC}`
		}
	}

	setType(tipologia:"ALERT"|"WARNING"|"SUCCESS"|"DARK"|""){
		this.tipologia=tipologia;
	}
}
