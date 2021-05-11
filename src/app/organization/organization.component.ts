import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.less']
})
export class OrganizationComponent implements OnInit {
  organizationForm: FormGroup;
  organizationList = [];
  isEdited:boolean = false;
  selectedIndex:number = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.organizationForm = this.formBuilder.group({
    name: ['', Validators.required],
    desc: ['', [Validators.required]]
   });
   // Show data previs on load 
   if(localStorage.getItem('organization')!='' && localStorage.getItem('organization')!=undefined){
     this.organizationList=JSON.parse(localStorage.getItem('organization'));
   }
   }
   
    get fval() {
    return this.organizationForm.controls;
    }
  onSubmit(){
    console.log(this.organizationForm.value);
    if(!this.isEdited){
      this.organizationList.push(this.organizationForm.value);
    }else{
      this.organizationList[this.selectedIndex].name= this.organizationForm.value.name;
      this.organizationList[this.selectedIndex].desc= this.organizationForm.value.desc;
      this.isEdited = false;
    }
    //Strore Data in LOcal strorge Org
    localStorage.setItem('organization', JSON.stringify(this.organizationList));

    
    this.organizationForm.reset();
  }
  editOrgan(index){
    //this.organization = this.organizationList[index];
    this.selectedIndex = index;
    this.isEdited = true;
    this.organizationForm.patchValue({name:this.organizationList[index].name,desc:this.organizationList[index].desc})
  }
  deleteOrgan(i){
    this.organizationList.splice(i,1);
  }
}
