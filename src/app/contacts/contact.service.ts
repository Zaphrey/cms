import { EventEmitter, Injectable } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | undefined {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact
      }
    }

    return undefined;
  }
}
