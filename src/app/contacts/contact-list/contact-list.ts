import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { ContactItem } from '../contact-item/contact-item';

@Component({
  selector: 'app-contact-list',
  imports: [ CommonModule, ContactItem ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList {
  contacts: Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonK@byui.edu", "208-496-3771", "/assets/images/jacksonk.jpg", null),
    new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "/assets/images/barzeer.jpg", null),
  ];

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  onSelected(contact: Contact)
  {
    this.selectedContactEvent.emit(contact);
  }
}
