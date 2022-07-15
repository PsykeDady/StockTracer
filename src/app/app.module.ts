import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ApiKeyInterceptor } from 'src/interceptors/api-key.interceptor';
import { MyPercentPipe } from 'src/pipe/mypercent.pipe';
import { SelectMonthPipe } from 'src/pipe/select-month.pipe';
import { LoadingService } from 'src/services/loading.service';
import { LocalDataService } from 'src/services/local-data.service';
import { StockListService } from 'src/services/stock-list.service';
import { StockFinnhubService } from 'src/services/stockFinnhub.service';
import { MyAlertComponent } from './alert/myalert.component';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent } from './login/login.component';
import { SentimentalDataMonthComponent } from './sentimental-details/sentimental-data-month/sentimental-data-month.component';
import { SentimentalDetailsComponent } from './sentimental-details/sentimental-details.component';
import { SymbolInputComponent } from './symbols-list/symbol-input/symbol-input.component';
import { SymbolListComponent } from './symbols-list/symbol-list.component';
import { TrackDialogComponent } from './symbols-list/track-dialog/track-dialog.component';

@NgModule({
  declarations: [
	MyAlertComponent,
    AppComponent,
	SymbolInputComponent,
	SymbolListComponent,
	TrackDialogComponent,
	SentimentalDetailsComponent,
	SentimentalDataMonthComponent,
	LoginComponent,
	MyPercentPipe,
	SelectMonthPipe
  ],
  imports: [
	BrowserModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	AppRouting
  ],
  providers: [
	LoadingService,
	LocalDataService,
	StockFinnhubService,
	StockListService,
	AuthenticationGuard,
	{
		provide:HTTP_INTERCEPTORS,
		useClass:ApiKeyInterceptor,
		multi:true
	}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
