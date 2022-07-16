import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { SentimentGuard } from "src/guards/sentiment.guard";
import { QuoteResolver } from "src/resolver/quote.resolver";
import { SentimentResolver } from "src/resolver/sentiment.resolver";
import { SymbolNameResolver } from "src/resolver/symbol-name.resolver";
import { LoginComponent } from "./login/login.component";
import { SentimentalDetailsComponent } from "./sentimental-details/sentimental-details.component";
import { SymbolListComponent } from "./symbols-list/symbol-list.component";

const appRoutes: Routes = [
	{path:"", pathMatch:"full", component: SymbolListComponent, canActivate:[AuthenticationGuard], resolve:{stockData:QuoteResolver}},
	{path:'sentimental/:symbol', component:SentimentalDetailsComponent,canActivate:[AuthenticationGuard, SentimentGuard], resolve:{sentiments:SentimentResolver,name:SymbolNameResolver}},
	{path:'login', component: LoginComponent}
];

@NgModule({
	imports:[RouterModule.forRoot(appRoutes)],
	exports:[RouterModule]
})
export class AppRouting {

}
