import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AboutService } from "../../core/services/about-service";

@Component({
  selector: "app-about",
  imports: [ReactiveFormsModule],
  templateUrl: "./about.html",
  styleUrl: "./about.css",
})
export class About implements OnInit {
  constructor(
    private aboutService: AboutService,
    private cdr: ChangeDetectorRef,
  ) {}

  myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    image: new FormControl<File | null>(null),
  });

  successMessage = "";
  errorMessage = "";

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe((data) => {
      this.myForm.patchValue({
        title: data.title,
        description: data.description,
      });

      this.cdr.detectChanges();
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.myForm.patchValue({ image: file });
    }
  }

  onSubmit(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append("title", this.myForm.value.title || "");
    formData.append("description", this.myForm.value.description || "");

    const image = this.myForm.value.image;

    if (image) {
      formData.append("image", image);
    }

    this.aboutService.updateAbout(formData).subscribe({
      next: () => {
        this.successMessage = "About updated successfully";
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = "Failed to update About";
        this.cdr.detectChanges();
      },
    });
  }
}
