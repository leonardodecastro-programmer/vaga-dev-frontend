import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../../../services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  formErrors = {
    emailRequired: false,
    emailInvalid: false,
    emailNotFound: false,
    passwordRequired: false,
    passwordNotFound: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.handleFormValidationErrors();
      return;
    }
  
    this.isLoading = true;
  
    const { email, senha } = this.loginForm.value;
  
    this.authService.getUsersData().subscribe({
      next: (items: Item[]) => {
        this.isLoading = false;
        this.resetFormErrors();
  
        const user = items.find(item => item.email === email && item.password === senha);
  
        if (!user) {
          this.formErrors.emailNotFound = !items.some(item => item.email === email);
          this.formErrors.passwordNotFound = !items.some(item => item.password === senha);
        } else {
          console.log('Usuário autenticado:', user);
          if (this.authService.authenticate(email, senha, items)) {
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Erro ao autenticar usuário');
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro ao buscar itens', error);
      }
    });
  }
  

  handleFormValidationErrors() {
    this.formErrors.emailRequired = this.loginForm.get('email')?.hasError('required') || false;
    this.formErrors.emailInvalid = this.loginForm.get('email')?.hasError('email') || false;
    this.formErrors.passwordRequired = this.loginForm.get('senha')?.hasError('required') || false;
  }

  resetFormErrors() {
    this.formErrors = {
      emailRequired: false,
      emailInvalid: false,
      emailNotFound: false,
      passwordRequired: false,
      passwordNotFound: false
    };
  }
}
