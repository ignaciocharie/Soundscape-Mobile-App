import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  reviewForm = this.fb.group({
    name: [''],
    review: ['']
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onReview() {
    console.log("Review submitted!", this.reviewForm.value);
    this.reviewForm.reset();
  }

}
