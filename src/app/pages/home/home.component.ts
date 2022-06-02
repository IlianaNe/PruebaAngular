import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router) { 
      console.log(VERSION.full)

    }

  ngOnInit() {
  }


  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
