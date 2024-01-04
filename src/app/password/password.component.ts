import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  hide: boolean = true;
  password: string ='';


  constructor() { }

  ngOnInit(): void {
  }

}
