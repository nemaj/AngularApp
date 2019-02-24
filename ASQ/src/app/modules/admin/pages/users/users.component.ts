import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UsersService } from '@shared/services';
import { AddUserComponent } from '../../components/modals/add-user/add-user.component';
import { ConfirmationComponent } from '@shared/components/modals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  data: Array<any> = [];
  search;
  breadcrumbs: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _users: UsersService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.getUsers();
  }

  addUser(id = 0, isEdit = false) {
    const initialState = {
      isEdit: isEdit,
      usersId: id
    };
    const modalRef = this.modalService.show(AddUserComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<AddUserComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getUsers();
      }
    });
  }

  deleteUser(user) {
    const initialState = {
      message: `Do you want to delete
      ${user.role} ${user.lastName}
      from the list?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._users.deleteUser(user.id).subscribe(res => {
          if (res) {
            this.getUsers();
          }
        });
      }
    });
  }

  getUsers() {
    this._users.getUsers().subscribe(data => {
      if (data && data.length) {
        this.data = data;
      }
    });
  }
}
