import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  public login: string;

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.login =  localStorage.getItem('login');
  }

  logout(): void{    
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

}
