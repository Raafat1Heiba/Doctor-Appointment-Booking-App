import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './core/models/Login.model';
import { FormsModule } from '@angular/forms';
import { HospitalService } from './core/services/hospital.service';
import { ApiResponseModel, Hospital } from './core/models/Hospital.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userObj: User = new User();
  loggedHospitalData: Hospital = new Hospital();

  constructor(private hospitalService: HospitalService) {
    const loggedData = localStorage.getItem('practoLogin');
    if (loggedData != null) {
      this.loggedHospitalData = JSON.parse(loggedData);
    }
  }

  showLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }
  closeLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
  onLogin() {
    this.hospitalService
      .login(this.userObj)
      .subscribe((res: ApiResponseModel) => {
        if (res.result) {
          this.loggedHospitalData = res.data;
          localStorage.setItem('practoLogin', JSON.stringify(res.data));
          this.closeLogin();
        } else {
          res.message;
        }
      });
  }
  Logout() {
    localStorage.removeItem('practoLogin');
    this.loggedHospitalData = new Hospital();
  }
}
