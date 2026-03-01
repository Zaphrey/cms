import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageEdit } from '../message-edit/message-edit';
import { MessageItem } from '../message-item/message-item';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  imports: [MessageEdit, MessageItem],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit {
  messages: Message[] = [];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  constructor(
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;

      // Angular wasn't automatically updating the page, so we need to force it to now.
      this.changeDetector.markForCheck();
    })
  }
}
