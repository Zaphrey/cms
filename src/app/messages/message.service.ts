import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId = 0;

  constructor(private http: HttpClient) {
    this.http.get<Message[]>("https://zwhcms-default-rtdb.firebaseio.com/messages.json").subscribe((response) => {
      this.messages = response;
      this.maxMessageId = this.getMaxId();
      this.messages.sort()
      this.messageChangedEvent.next(this.messages.slice());
    }, (error: any) => {
      console.log(error);
    })
  }

  storeMessages() {
    const messageString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ "ContentType": "application/json" });
    this.http.put("https://zwhcms-default-rtdb.firebaseio.com/messages.json", messageString, { headers: headers }).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    }, (error: any) => {
      console.log(error);
    })
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | undefined {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }

    return undefined;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    
    this.messages.forEach((message: Message) => {
      // Get the greatest id out of either maxId or the contact's id 
      maxId = Math.max(maxId, +message.id);
    })

    return maxId;
  }
}
