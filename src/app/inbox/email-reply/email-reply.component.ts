import { Component, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  showModal: boolean = false;
  @Input() email: Email;

  constructor(private emailServive: EmailService) { }

  ngOnChanges(): void {

    const text = this.email.text.replace(/\n/gi, '\n>');
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------------ ${this.email.from} wrote:\n> ${text}`
    }
  }


  onSubmit(email: Email) {
    this.emailServive.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }
}
