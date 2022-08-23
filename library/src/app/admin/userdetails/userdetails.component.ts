import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibraryService } from 'src/app/library.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  toggle: boolean = false;
  globalindex!: number;

  updatebookservice: any;
  user: any
  userdata;
  constructor(private formBuilder: FormBuilder, private userserive: LibraryService) {
    this.userserive.userdata().subscribe(data => {
      this.user = data;
      // console.log("user hrint here", this.user)
    }

    ),
      this.userdata = formBuilder.group({
        uid: [''],
        userid: [''],
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        address: [''],
        number: ['', [Validators.required, Validators.min(7000000000), Validators.max(9999999999)]],
    
      }
      )

  }

  ngOnInit(): void {
    this.userserive.userdata().subscribe(data => {
      this.user = data;
      // console.log("user hrint here", this.user)
      this.getdata(this.user)

    })

  }


  getdata(user: any) {
    // console.log("book outside", this.user)
  }
  delete(data: any) {
    // console.log("index", data)

    this.userserive.deleteuser(data).subscribe({
      next(value) {
          // console.log(value);
      },
      error(err) {
          console.error(err);
          
      },
    })
  this.getdata(this.user) 
  
  }

  update(index: number) {
    // console.log("users in uppadte", this.userdata);
    // console.log("index", index)


    for (let i = 0; i < this.user.length; i++) {
      if (this.user[i].ID == index) {
        index = i
        // console.log("user in loop", this.user[index].ID);

      }

    }

    // console.log("user in uppadte", this.user[index].ID);

    this.toggle = true
    const element = this.user[index];

    // console.log(element, "element print")

    this.globalindex = element.ID
    this.userdata.patchValue({
      uid: element.uid,
      userid: element.username,
      fname: element.fname,
      lname: element.lname,
      address: element.address,
      number: element.number,
    
    });

  }
  updatebtn() {
    // console.log(" user upd btn value", this.userdata.value)
    // console.log("index captured", this.globalindex)

    this.userserive.updateuser(this.globalindex, this.userdata.value).subscribe(data => {

     
      this.toggle=false
      this.getdata(this.user)
    })

    this.getdata(this.user)
  }

}
