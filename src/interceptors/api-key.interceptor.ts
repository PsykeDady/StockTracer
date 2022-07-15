import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalDataService } from "src/services/local-data.service";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

	constructor(private localDataService:LocalDataService){}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log("intercepted get request")

		const authenticatedRequest: HttpRequest<any> = req.clone({
			headers: new HttpHeaders({
				"X-Finnhub-Token" : this.localDataService.getApiKey()??""
			})
		});
		return next.handle(authenticatedRequest);
	}



}
