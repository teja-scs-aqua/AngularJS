import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { Dish } from "../shared/dish";
import {DishService} from "../services/dish.service";
import { Params, ActivatedRoute } from '@angular/router';
import { visibility,flyInOut,expand } from '../animations/app.animation';

import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})


export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;

dish:Dish;
dishIds: number[];
prev: number;
next: number;
errMess: string;
dishErrMess: string;
comment: Comment;
commentForm: FormGroup;
dishcopy = null;
visibility = 'shown';

formErrors = {
  'author': '',
  'rating' : '',
  'comment': ''
};

validationMessages = {
  'comment': {
    'required':      'Comment is required. cannot be more that 250 characters'
  },
  'author' : {
    'required' : 'Name is required',
    'minlength' : 'Name must be at least 2 characters long',
    'maxlength' : 'Name cannot be more that 25 characters long'
  }
};

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { }
 
    ngOnInit() {
      this.createForm();
      this.dishservice.getDishIds()
     .subscribe(dishIds => this.dishIds = dishIds, errmess => this.dishErrMess = <any>errmess.message);
      this.route.params
      .pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
      .subscribe(dish => { 
              this.dish = dish; this.dishcopy = dish;
               this.setPrevNext(dish.id); this.visibility = 'shown'; },
               errmess => { this.dishErrMess = null; this.errMess = <any>errmess; });
        }

    createForm() {
      this.commentForm = this.fb.group({
        author: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ] ],
        rating: 5,
        comment: ["", [Validators.required, Validators.maxLength(250)]]
      }); 

      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // (re)set validation messages now
    }
    
    onSubmit() {
      this.comment = this.commentForm.value;
      this.comment['date'] = new Date().toISOString();
      console.log(this.comment);
      this.dishcopy.comments.push(this.comment);
      this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
      this.commentForm.reset({
        author: '',
        rating: 5,
        comment: ''
      });
    }

    onValueChanged(commentFormData?: any) {
      if (!this.commentForm) {
        return;
      }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
       if (this.commentForm.valid) {
        this.comment = this.commentForm.value;
      } else {
        this.comment = undefined;
      }
    }
  

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

}
