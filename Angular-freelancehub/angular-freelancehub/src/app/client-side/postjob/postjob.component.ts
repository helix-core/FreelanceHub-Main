import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../client.service';
import { FormGroup,FormBuilder,Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-postjob',
  standalone: false,
  templateUrl: './postjob.component.html',
  styleUrl: './postjob.component.css'
})
export class PostjobComponent implements OnInit {
  jobForm!: FormGroup;
    skills: string[] = [];
 clientJob: any = {
    jobTitle: '',
    jobDesc: '',
    skillReq: [],
    durMin: 0,
    durMax: 0,
    costMin: 0,
    costMax: 0,
    expMin: 0,
    jobStat: 'pending'
  };

  constructor(private http: HttpClient, private router: Router, private clientService: ClientService,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      jobTitle: ['', [Validators.required, Validators.minLength(5)]],
      jobDesc: ['', [Validators.required, Validators.minLength(10)]],
      skillReq: ['', Validators.required],
      durMin: [0, [Validators.required, Validators.min(1)]],
      durMax: [0, [Validators.required, Validators.min(1)]],
      costMin: [0, [Validators.required, Validators.min(1)]],
      costMax: [0, [Validators.required, Validators.min(1)]],
      expMin: [0, [Validators.required, Validators.min(1)]],
      jobStat: ['pending']
    });

  }

 

  addSkill(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Enter' && input.value.trim()) {
      event.preventDefault();
      this.skills.push(input.value.trim());
      input.value = ''; // Clear the input field
      this.jobForm.get('skillReq')?.setValue(this.skills.join(',')); // Update form value
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter((s) => s !== skill);
    this.jobForm.get('skillReq')?.setValue(this.skills.join(',')); // Update form value
  }

  submitJobForm(): void {
      this.jobForm.markAllAsTouched();
    console.log("triggered");
     console.log(this.jobForm.value); // Check submitted values
  console.log(this.jobForm.valid); // Check form validity
  console.log(this.jobForm.errors); // Check form-level errors
     if (this.jobForm.valid) {
    this.clientService.postJob(this.jobForm.value).subscribe({
      next: (response) => {
        alert('Job posted successfully!');
        this.router.navigate(['/posted-jobs']);
      },
      error: (error) => {
        alert('Failed to post the job.');
        console.error(error);
      },
    });
  }
}
}