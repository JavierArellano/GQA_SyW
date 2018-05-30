import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
	animal:any;
	r=false;
  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private animalService: AnimalService
  	) {
  }

  ngOnInit() {
  	let id = this.route.snapshot.paramMap.get('id');

    this.animalService.getAnimal(id).subscribe(data=> {
        this.animal=data[0];
        this.r = true;
    })
  }

}
