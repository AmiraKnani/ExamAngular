import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  authForm!: FormGroup;

  
  constructor(private formBuilder: FormBuilder, private router: Router, private userApiService: UserApiService) { }


  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      const email = this.authForm.get('email')?.value;
      const password = this.authForm.get('password')?.value;
  
      this.userApiService.authenticateUser(email, password).subscribe((users) => {
        if (users.length > 0) {
          // Authentification réussie, rediriger vers la page d'accueil
          this.router.navigate(['/']);
        } else {
          // Authentification échouée, afficher un message d'erreur ou effectuer d'autres actions
          console.log('Authentification échouée');
        }
      });
    }
  }
  

  register() {
    this.router.navigate(['/register']);
  }
}
