// src/app/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { UserApiService } from '../services/userapi.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  editingIndex: number | null = null;

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService) {
    this.userForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profile: [''],
      valide: [false]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userApiService.getdata().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;

      if (this.editingIndex === null) {
        // Add user
        this.userApiService.postdata(user).subscribe(() => {
          this.fetchUsers();
        });
      } else {
        // Update user
        const userId = this.users[this.editingIndex].id;
        this.userApiService.update(userId, user).subscribe(() => {
          this.fetchUsers();
        });
        this.editingIndex = null;
      }

      this.userForm.reset({ valide: false });
    }
  }

  editUser(index: number): void {
    const user = this.users[index];
    this.editingIndex = index;

    this.userForm.patchValue({
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      password: user.password,
      profile: user.profile,
      valide: user.valide
    });
  }

  deleteUser(index: number): void {
    const userId = this.users[index].id;

    this.userApiService.delete(userId).subscribe(() => {
      this.fetchUsers();
    });
  }
}

