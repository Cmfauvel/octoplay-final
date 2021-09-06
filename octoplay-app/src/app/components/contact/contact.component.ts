import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus, init } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    init('user_VMMU8YqvV4ygnm6WOZIRg');
  }
  public sendEmail(e: Event): void {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_3ss3vg4',
        'template_sv2lq5m',
        e.target as HTMLFormElement,
        'user_VMMU8YqvV4ygnm6WOZIRg'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          this.router.navigate(['/contact/merci']);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}
