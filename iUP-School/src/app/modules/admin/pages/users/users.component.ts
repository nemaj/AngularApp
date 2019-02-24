import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { AddUserComponent } from '../../components/modals/add-user/add-user.component';
import { UsersService } from '@shared/services';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersList: Array<any> = [];

  constructor(
    private modalService: BsModalService,
    private _users: UsersService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._users.getUsers().subscribe(res => {
      this.usersList = res;
    });
  }

  addUser(id: number = 0) {
    const initialState = {
      usersId: id
    };
    const modalRef = this.modalService.show(AddUserComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AddUserComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getUsers();
      }
    });
  }

  deleteUser(item) {
    const initialState = {
      message: `Do you want to delete user ${item.username}?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._users.deleteUser(item.id).subscribe(res => {
          if (res) {
            this.getUsers();
          }
        });
      }
    });
  }
}
