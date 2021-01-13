import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private emailService: EmailService) {

  }

  ngOnInit(): void {
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe(response => {
    //     console.log(response)
    //   })
    // })
    this.route.params.pipe(switchMap(({ id }) => {
      return this.emailService.getEmail(id);
    })
    ).subscribe((email) => {
      console.log(email)
    })
  }

}
