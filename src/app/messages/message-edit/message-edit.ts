import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  imports: [],
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css',
})
export class MessageEdit {
  @Output() addMessageEvent = new EventEmitter<Message>();

  @ViewChild("subject") subject!: ElementRef<HTMLInputElement>;
  @ViewChild("msgText") msgText!: ElementRef<HTMLInputElement>;

  constructor(private messageService: MessageService) {}

  currentSender: string = "1";

  onSendMessage() {
    const currentSubject: string = this.subject.nativeElement.value;
    const currentMessage: string = this.msgText.nativeElement.value;

    const message: Message = new Message('', currentSubject, currentMessage, this.currentSender);

    this.messageService.addMessage(message);
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
