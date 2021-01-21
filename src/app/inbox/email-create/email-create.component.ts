import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal: boolean = false;
  email: Email;

  constructor(private authService: AuthService, private emailServive: EmailService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-email.com`
    }
  }

  ngOnInit(): void {
  }


  onSubmit(email: Email) {
    this.emailServive.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }
}
