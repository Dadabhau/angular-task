import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {
  roles = [];
  roleForm: FormGroup;
  organizationList = [];
  roleList = [];
  isEdited:boolean = false;
  selectedIndex:number = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.roleForm = this.formBuilder.group({
    name: ['', Validators.required],
    org: ['', [Validators.required]]
   });
   // Show data previs on load 
   if(localStorage.getItem('role')!='' && localStorage.getItem('role')!=undefined){
    this.roleList=JSON.parse(localStorage.getItem('role'));
  }
  
  // Dropdown org
    this.organizationList = JSON.parse(localStorage.getItem('organization'));
   }
   
    get fval() {
    return this.roleForm.controls;
    }
  onSubmit(){
    console.log(this.roleForm.value);
    if(!this.isEdited){
      this.roleList.push(this.roleForm.value);
    }else{
      this.roleList[this.selectedIndex].name= this.roleForm.value.name;
      this.roleList[this.selectedIndex].org= this.roleForm.value.org;
      this.isEdited = false;
    }
    //Strore Data in LOcal strorge Org
    localStorage.setItem('role', JSON.stringify(this.roleList));


    this.roleForm.reset();
  }
  editOrgan(index){
    //this.organization = this.roleList[index];
    this.selectedIndex = index;
    this.isEdited = true;
    this.roleForm.patchValue({name:this.roleList[index].name,org:this.roleList[index].org})
  }
  deleteOrgan(i){
    this.roleList.splice(i,1);
  }

}
