import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  getFeedbacks(): Observable<Feedback[]> {
	return this.restangular.all('feedback').getList();
  }
  
  submitFeedback(feedback: Feedback): Observable<Feedback>{
	return this.restangular.all('feedback').post(feedback);
  }

}