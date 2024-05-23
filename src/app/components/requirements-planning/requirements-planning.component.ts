import { Component, OnInit } from '@angular/core';
import { RequirementPlanningModel } from '../../models/requirementPlanningModel';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-requirements-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requirements-planning.component.html',
  styleUrl: './requirements-planning.component.css'
})
export class RequirementsPlanningComponent implements OnInit {


  constructor(
    private activated : ActivatedRoute,
    private http : HttpService
  ){
    this.activated.params.subscribe(res =>{
      this.orderId = res['orderId'];
      this.get();
    })
  }
  orderId : string = '';
  model : RequirementPlanningModel = new RequirementPlanningModel();

  ngOnInit(): void {
  }


  get(){
    this.http.post<RequirementPlanningModel>("Order/RequirementsPlanningByOrderId",{orderId : this.orderId},res =>{
      
      this.model = res;
    })
  }
}
