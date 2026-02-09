import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-contact-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  @Input() contact: Contact | undefined;
}
