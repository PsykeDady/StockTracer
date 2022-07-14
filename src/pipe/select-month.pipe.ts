import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:"selectMonth"})
export class SelectMonthPipe implements PipeTransform {
	transform(value: any) {
		switch (value) {
			case 1:
				return "JANUARY";
			case 2:
				return "FEBRUARY";
			case 3:
				return "MARCH";
			case 4:
				return "APRIL";
			case 5:
				return "MAY";
			case 6:
				return "JUNE";
			case 7:
				return "JULY";
			case 8:
				return "AUGUST";
			case 9:
				return "SEPTEMBER";
			case 10:
				return "OCTOBER";
			case 11:
				return "NOVEMBER";
			case 12:
				return "DECEMBER";
			default:
				return "INVALID";
		}
	}
}
