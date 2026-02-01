import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem implements OnInit {
  @Input() message: Message | undefined = undefined
  messageSender?: string;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender || "");
    this.messageSender = contact?.name;
  }
}
