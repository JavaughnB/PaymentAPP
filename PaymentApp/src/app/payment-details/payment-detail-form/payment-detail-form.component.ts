import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService) { 
    
  }
  
  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.service.formSubmitted = true
    if(form.valid)
    {
    if(this.service.formData.paymentDetailID == 0)
     this.insertRecord(form)
    else
      this.updateRecord(form)
    }
  }  
  insertRecord(form:NgForm){
    this.service.postPaymentDetail()
    .subscribe({
      next: res =>{
        this.service.list = res as PaymentDetail[]
        this.service.resetForm(form)
      },
      error: err => console.log(err)
    })
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetail()
    .subscribe({
      next: res =>{
        this.service.list = res as PaymentDetail[]
        this.service.resetForm(form)
      },
      error: err => console.log(err)
    })
  }
}