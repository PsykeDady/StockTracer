import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name:"mypercent"
})
export class MyPercentPipe implements PipeTransform {
	transform(value: any) {
		return (value>=0? "+":"")+value+"%";
	}
}
