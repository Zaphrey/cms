import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem implements OnInit, OnDestroy {
  @Input() message: Message | undefined = undefined
  messageSender?: string;

  contactSubscription?: Subscription;

  constructor(
    private contactService: ContactService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
    this.messageSender = contact?.name;

    this.contactSubscription = this.contactService.contactsChangedEvent.subscribe((contacts) => {
      const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
      this.messageSender = contact?.name;

      // Angular wasn't automatically updating the page, so we need to force it to now.
      this.changeDetector.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
  }
}
