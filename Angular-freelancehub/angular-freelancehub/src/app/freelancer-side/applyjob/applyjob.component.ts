import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applyjob',
  standalone: false,
  
  templateUrl: './applyjob.component.html',
  styleUrl: './applyjob.component.css'
})
export class ApplyjobComponent implements OnInit {
jobForm: FormGroup;
  job: any = null;
  sliders: any[] = [];
  matchedSkillsPercentage = 0;
  missingSkills: string[] = [];
  uploadedLinks: string[] = [];
  newLink: string = '';
  circularProgressStyle: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.jobForm = this.fb.group({
      salary: [0],
      duration: [0],
      experience: [0],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jobId = params['id'];
      if (jobId) {
        this.fetchJobDetails(jobId);
      } else {
        console.error('Job ID not provided.');
      }
    });
  }

  fetchJobDetails(jobId: number): void {
    if (typeof window !== 'undefined') { 
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in.');
      return;
    }

    const params = new HttpParams().set('userId', userId);
    this.http.get(`/api/apply?id=${jobId}`, { params }).subscribe(
      (data: any) => {
        this.job = data.job;
        this.matchedSkillsPercentage = data.matchedSkillsPercentage;
        this.missingSkills = data.missingSkills;
        this.sliders = [
          { label: 'Salary Range', control: 'salary', min: data.salaryMin, max: data.salaryMax },
          { label: 'Duration', control: 'duration', min: data.durationMin, max: data.durationMax },
          { label: 'Experience', control: 'experience', min: data.experienceMin, max: data.experienceMax },
        ];
        this.jobForm.patchValue({
          salary: data.salaryMin,
          duration: data.durationMin,
          experience: data.experienceMin,
        });
        this.updateCircularProgress();
      },
      (error) => {
        console.error('Error fetching job details:', error);
      }
    );
  }
}

  updateSlider(controlName: string): void {
    const value = this.jobForm.value[controlName];
    console.log(`Slider ${controlName} updated to: ${value}`);
  }

  updateCircularProgress(): void {
    const angle = this.matchedSkillsPercentage * 3.6;
    this.circularProgressStyle = `conic-gradient(
      rgba(21, 201, 180, 0.50) ${angle}deg,
      #ddd ${angle}deg 360deg
    )`;
  }

addLink(): void {
  if (this.newLink.trim()) {
    this.uploadedLinks.push(this.newLink.trim());
    this.newLink = ''; 
  }
}

removeLink(index: number): void {
  this.uploadedLinks.splice(index, 1); // Remove the link at the specified index
}

  onSubmit(): void {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('User ID not found in local storage.');
    return;
  }

  const jobId = this.job?.jobId; // Ensure the job ID is included
  if (!jobId) {
    console.error('Job ID is missing.');
    return;
  }

  const formData = {
    ...this.jobForm.value,
    previousWorks: this.uploadedLinks.join(','), // Convert links to a comma-separated string
    jobId: jobId,
    userId: userId,
  };
 
   const params = new HttpParams({
    fromObject: formData,
  });
   console.log(formData);
 this.http.post<{ message: string }>('/api/apply', params).subscribe(
  (response) => {
    // Handle successful submission
    console.log('Application submitted successfully:', response.message);
    alert(response.message);  // Show the success message
  },
  (error) => {
    // Handle error
    if (error.error && error.error.message) {
      console.error('Error submitting application:', error.error.message);
      alert(`Error: ${error.error.message}`); // Show error message to the user
    } else {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  }
);


}

}
