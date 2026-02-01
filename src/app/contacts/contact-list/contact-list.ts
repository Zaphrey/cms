import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { ContactItem } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  imports: [ CommonModule, ContactItem ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  onSelected(contact: Contact)
  {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }
}
