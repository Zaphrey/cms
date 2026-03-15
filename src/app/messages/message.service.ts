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
    this.http.get<Message[]>("http://localhost:3000/messages").subscribe((response) => {
      this.messages = response;
      // this.maxMessageId = this.getMaxId();
      // this.messages.sort()
      console.log(response)
      this.messageChangedEvent.next(this.messages.slice());
    }, (error: any) => {
      console.log(error);
    })
  }

  sortAndSend() {
    const messagesCopy = this.messages.slice()
    // We probably don't want to sort messages since
    // that would mess up the order they were sent in
    // messagesCopy.sort((a, b) => {
    //   return a.subject.localeCompare(b.subject);
    // })
    this.messageChangedEvent.next(messagesCopy)
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
    if (!message)
      return;

    message.id = "";
    
    const headers = new HttpHeaders({"Content-Type": "application/json"});

    this.http.post<{message: string, createdMessage: Message}>("http://localhost:3000/messages", 
      message, 
      {headers: headers}
    ).subscribe(responseData => {
      this.messages.push(responseData.createdMessage);
      this.sortAndSend();
    })
  }

  updateDocument(originalMessage: Message, newMessage: Message) {
      if (!originalMessage || !newMessage) {
        return;
      }
  
      const pos = this.messages.findIndex(d => d.id === originalMessage.id);
  
      if (pos < 0) {
        return;
      }
  
      // set the id of the new Message to the id of the old Message
      newMessage.id = originalMessage.id;
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      // update database
      this.http.put('http://localhost:3000/documents/' + newMessage.id,
        newMessage, { headers: headers })
        .subscribe(() => {
            this.messages[pos] = newMessage;
            this.sortAndSend();
          }
        );
    }

  deleteMessage(message: Message) {
    if (!message) {
        return;
      }
  
    const pos = this.messages.findIndex(d => d.id === message.id);
  
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/messages/' + message.id)
    .subscribe(() => {
      this.messages.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }

  // getMaxId(): number {
  //   let maxId = 0;
    
  //   this.messages.forEach((message: Message) => {
  //     // Get the greatest id out of either maxId or the contact's id 
  //     maxId = Math.max(maxId, +message.id);
  //   })

  //   return maxId;
  // }
}
