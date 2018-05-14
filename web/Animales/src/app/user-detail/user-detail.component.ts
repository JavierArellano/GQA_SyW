import { Component, OnInit, Input } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
	public user;
  @Input() userid;

  constructor(private animalService: AnimalService) {
  }

  getUserAnimals(userid){
    this.animalService.getUserAnimals(userid).subscribe(data=> {
        this.user=data;
    })
    
  }

  ngOnInit() {
  }

}
