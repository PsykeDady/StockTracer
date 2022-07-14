export class LocalDataService {

	static readonly apiKey:string="apikey"
	static readonly symbols:string="symbols"

	getApiKey():string|null {
		return localStorage.getItem(LocalDataService.apiKey);
	}

	setApiKey(apiKey:string):void{
		localStorage.setItem(LocalDataService.apiKey,apiKey);
	}

	existsApiKey():boolean{
		return localStorage.getItem(LocalDataService.apiKey)!=null;
	}

	resetApiKey():void{
		return localStorage.removeItem(LocalDataService.apiKey)
	}
}
