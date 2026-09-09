import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";

@Component({
  selector: "app-login",
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./login.html",
  styleUrl: "./login.css"
})
export class Login {
  readonly loading = signal(false);
  errorMessage = "";

  readonly form = new FormGroup({
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] })
  });

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = "";
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();

    this.auth.login(email, password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl("/dashboard");
      },
      error: error => {
        this.loading.set(false);
        this.errorMessage = error?.error?.message || "Login failed";
      }
    });
  }
}
