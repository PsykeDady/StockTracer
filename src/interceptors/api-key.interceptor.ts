import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalDataService } from "src/services/local-data.service";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

	constructor(private localDataService:LocalDataService){}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authenticatedRequest: HttpRequest<any> = req.clone({
			params:req.params.set("token",this.localDataService.getApiKey()??"")
		});
		return next.handle(authenticatedRequest);
	}



}
