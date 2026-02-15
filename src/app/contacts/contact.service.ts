import { EventEmitter, Injectable } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId = 0;

  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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

  getMaxId(): number {
      let maxId = 0;
      
      this.contacts.forEach((contact: Contact) => {
        // Get the greatest id out of either maxId or the contact's id 
        maxId = Math.max(maxId, +contact.id);
      })
  
      return maxId;
    }

  deleteContact(contact: Contact): void {
    if (!contact)
      return;

    const pos = this.contacts.indexOf(contact);

    if (pos < 0) 
      return;
    
    this.contacts.splice(pos, 1);
    this.contactsChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact)
      return;

    this.maxContactId++;

    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    this.contactsChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact)
      return;

    let originalPos = this.contacts.indexOf(originalContact);

    if (originalPos < 0)
      return;

    newContact.id = originalContact.id;
    this.contacts[originalPos] = newContact;

    this.contactsChangedEvent.next(this.contacts.slice());
  }
}
