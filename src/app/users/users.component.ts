import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  roles = [];
  userForm: FormGroup;
  organizationList = [];
  roleList = [];
  userList = [];
  isEdited:boolean = false;
  selectedIndex:number = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
    name: ['', Validators.required],
    org: ['', [Validators.required]]
   });
    this.roleList = JSON.parse(localStorage.getItem('role'));
    this.organizationList = JSON.parse(localStorage.getItem('organization'));
     // Show data previs on load 
   if(localStorage.getItem('useruser')!='' && localStorage.getItem('user')!=undefined){
    this.userList=JSON.parse(localStorage.getItem('user'));
  }
   }
   
    get fval() {
    return this.userForm.controls;
    }
  onSubmit(){
    console.log(this.userForm.value);
    if(!this.isEdited){
      this.userList.push(this.userForm.value);
    }else{
      this.userList[this.selectedIndex].name= this.userForm.value.name;
      this.userList[this.selectedIndex].org= this.userForm.value.org;
      this.isEdited = false;
    }
    //Strore Data in LOcal strorge Org
    localStorage.setItem('user', JSON.stringify(this.userList));
    this.userForm.reset();
  }
  editOrgan(index){
    //this.organization = this.roleList[index];
    this.selectedIndex = index;
    this.isEdited = true;
    this.userForm.patchValue({name:this.userList[index].name,org:this.userList[index].org})
  }
  deleteOrgan(i){
    this.userList.splice(i,1);
  }
  getOrg(opt){
    // Find 
    let index = this.roleList.findIndex(x=>x.name == opt) ;
    if(index != -1){
      return this.roleList[index].org;
    }else{
      return '';
    }
  }
}
