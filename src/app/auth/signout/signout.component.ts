import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authServive: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authServive.signout().subscribe(() => {
      //Naviagate to the user other page
      this.router.navigateByUrl('/');
    })
  }

}
