// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-role-selection',
//   templateUrl: './role-selection.component.html',
//   styleUrl: './role-selection.component.css'
// })
// export class RoleSelectionComponent {

// }
// src/app/role-selection/role-selection.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.css'],
  standalone:false
})
export class RoleSelectionComponent {
  selectedRole: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Form Submitted',this.selectedRole);
    if (this.selectedRole === 'freelancer') {
      this.router.navigate(['/signup/freelancer']);
    } else if (this.selectedRole === 'client') {
      this.router.navigate(['/signup/client']);
    }
  }
}

