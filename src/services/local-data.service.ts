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

	addSymbol(symbol:string):void{
		symbol=symbol.toUpperCase();
		let symbols:string[]|undefined = localStorage.getItem(LocalDataService.symbols)?.split("|")
		if(!symbols){
			symbols=[]
		}
		if(! symbols.some(v=>v.toUpperCase()==symbol)){
			symbols.push(symbol);
			localStorage.setItem(LocalDataService.symbols,symbols.reduce((prev,curr)=>{
				return prev+"|"+curr
			}));
		}
	}

	removeSymbol(symbol:string):void{
		let symbols:string[]|undefined = localStorage.getItem(LocalDataService.symbols)?.split("|")
		if(!symbols){
			return;
		}
		if(symbols.indexOf(symbol)>=0){
			symbols=symbols.filter(s=>s!=symbol)
			if(symbols.length==0){
				localStorage.removeItem(LocalDataService.symbols)
			} else {
				localStorage.setItem(LocalDataService.symbols,symbols.reduce((prev,curr)=>{
					return prev+"|"+curr
				}));
			}
		}
	}

	getSymbols():string[]{
		return localStorage.getItem(LocalDataService.symbols)?.split("|")??[];
	}
}
