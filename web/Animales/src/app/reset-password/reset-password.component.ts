import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
	data;
  constructor(
  	private animalService: AnimalService,
  	private route: ActivatedRoute,
  	private router: Router,
  	) { }

  change(pass,pass2){
  	if (pass == pass2) {
    	this.animalService.change(this.data, {password2:pass2}).subscribe(data=> {
        	this.router.navigate(['/signin']);
    	});
   	}
  }

  ngOnInit() {
	this.data = this.route.snapshot.paramMap.get('urldata');
  }

}
