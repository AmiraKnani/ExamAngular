import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userApiService: UserApiService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: Users = {
        prenom: this.registerForm.get('prenom')?.value,
        nom: this.registerForm.get('nom')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        valide: 'false',
        id: 0
      };

      this.userApiService.addUser(newUser).subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès:', response);
          
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout d\'un utilisateur:', error);
          
        }
      );
    } else {
      // Affichage d'un message d'erreur 
    }
  }}