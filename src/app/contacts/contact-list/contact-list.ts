import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { ContactItem } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';
import { RouterLink } from "@angular/router";
import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, ContactItem, RouterLink, ContactsFilterPipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  term: string = ""

  constructor(
    private contactService: ContactService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactsChangedEvent.subscribe((contact: Contact[]) => {
      this.contacts = contact;

      // Angular wasn't automatically updating the page, so we need to force it to now.
      this.changeDetector.markForCheck();
    })
  }

  search(value: string) {
    this.term = value;
  }
}
