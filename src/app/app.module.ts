import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import {MatToolbarModule,/* , MatDatepickerModule, ,
  , MatRadioModule,*/} from '@angular/material'; 
import {MatSliderModule} from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DishService } from './services/dish.service';
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/rest-config';
import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";
import { HighlightDirective } from './directives/highlight.directive';
import { FeedbackService } from './services/feedback.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule, 
    MatListModule,MatButtonModule,MatCardModule,MatGridListModule,MatIconModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,MatFormFieldModule,MatInputModule,MatCheckboxModule,
    MatSelectModule,MatSlideToggleModule,ReactiveFormsModule,
    MatProgressSpinnerModule, MatSliderModule,
    HttpClientModule,RestangularModule.forRoot(RestangularConfigFactory),
  ],
  providers: [DishService,PromotionService,ProcessHTTPMsgService, LeaderService,FeedbackService, {provide: 'BaseURL', useValue: baseURL},/*ProcessHTTPMsgService*/],
  entryComponents:[
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
