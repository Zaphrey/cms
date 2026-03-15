import { EventEmitter, Injectable } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId = 0;

  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, contacts: Contact[]}>("http://localhost:3000/contacts").subscribe((response) => {
      this.contacts = response.contacts;
      // this.maxContactId = this.getMaxId();
      this.contacts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })

      this.contactsChangedEvent.next(this.contacts.slice());
    }, (error: any) => {
      console.log(error);
    })
  }

  // storeContacts() {
  //   const contactString = JSON.stringify(this.contacts);
  //   const headers = new HttpHeaders({ "ContentType": "application/json" });
  //   this.http.put("https://zwhcms-default-rtdb.firebaseio.com/contacts.json", contactString, { headers: headers }).subscribe(() => {
  //     this.contactsChangedEvent.next(this.contacts.slice())
  //   }, (error: any) => {
  //     console.log(error);
  //   })
  // }

  sortAndSend() {
    const contactsCopy = this.contacts.slice()
    contactsCopy.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    this.contactsChangedEvent.next(contactsCopy)
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string | undefined): Contact | undefined {
    if (!id)
    {
      return undefined;
    }

    for (let contact of this.contacts) {

      if (contact.id == id) {
        return contact
      }
    }

    return undefined;
  }

  // getMaxId(): number {
  //   let maxId = 0;
    
  //   this.contacts.forEach((contact: Contact) => {
  //     // Get the greatest id out of either maxId or the contact's id 
  //     maxId = Math.max(maxId, +contact.id);
  //   })

  //   return maxId;
  // }

  addContact(newContact: Contact) {
    if (!newContact)
      return;

    newContact.id = "";
    
    const headers = new HttpHeaders({"Content-Type": "application/json"});

    this.http.post<{message: string, contact: Contact}>("http://localhost:3000/contacts", 
      newContact, 
      {headers: headers}
    ).subscribe(responseData => {
      this.contacts.push(responseData.contact);
      this.sortAndSend();
    })
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://localhost:3000/contacts/' + newContact.id,
      newContact, { headers: headers })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
      );
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
      );
  }
}
