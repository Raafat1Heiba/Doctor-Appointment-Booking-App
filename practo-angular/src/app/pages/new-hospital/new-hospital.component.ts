import { Component, OnDestroy } from '@angular/core';
import { ApiResponseModel, Hospital } from '../../core/models/Hospital.model';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../../core/services/hospital.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-hospital',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-hospital.component.html',
  styleUrl: './new-hospital.component.css',
})
export class NewHospitalComponent implements OnDestroy {
  public hospitalObj: Hospital = new Hospital();
  private scbscriptions: Subscription[] = [];
  private isShow: boolean = false;

  constructor(private hospitalService: HospitalService) {}

  onRegister() {
    this.scbscriptions.push(
      this.hospitalService.registerHospital(this.hospitalObj).subscribe(
        (res: ApiResponseModel) => {
          if (res.result) {
            alert('Registration Success');
          } else {
            alert(res.result);
          }
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.scbscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
