import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

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

  currentSender: string = "Zachary";

  onSendMessage() {
    const currentSubject: string = this.subject.nativeElement.value;
    const currentMessage: string = this.msgText.nativeElement.value;

    const message: Message = new Message(1, currentSubject, currentMessage, this.currentSender);

    this.addMessageEvent.emit(message);
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
