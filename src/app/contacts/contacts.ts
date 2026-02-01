import { Component, Input, OnInit } from '@angular/core';
import { ContactList } from "./contact-list/contact-list";
import { ContactDetail } from "./contact-detail/contact-detail";
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  imports: [ContactList, ContactDetail],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts implements OnInit {
  @Input() selectedContact: Contact | undefined = undefined;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    })
  }
}
