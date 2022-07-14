import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { LoginComponent } from "./login/login.component";
import { SentimentalDetailsComponent } from "./sentimental-details/sentimental-details.component";
import { SymbolListComponent } from "./symbols-list/symbol-list.component";

const appRoutes: Routes = [
	{path:"", pathMatch:"full", component: SymbolListComponent, canActivate:[AuthenticationGuard]},
	{path:'sentimental/:symbol', component:SentimentalDetailsComponent,canActivate:[AuthenticationGuard]},
	{path:'login', component: LoginComponent}
];

@NgModule({
	imports:[RouterModule.forRoot(appRoutes)],
	exports:[RouterModule]
})
export class AppRouting {

}
