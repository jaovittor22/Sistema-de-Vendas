import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public login: string;

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.login =  localStorage.getItem('login');
  }


}
