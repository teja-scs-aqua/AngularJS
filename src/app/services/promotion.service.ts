import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import { Observable } from "rxjs/Observable";
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import "rxjs/add/operator/delay";
import 'rxjs/add/observable/of';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }
  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions' + id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
    .pipe(map(leaders => leaders[0]));
  }
}