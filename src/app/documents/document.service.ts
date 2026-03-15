import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number = 0;

  documentSelectedEvent = new EventEmitter<Document>();
  documentsChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.http.get<Document[]>("http://localhost:3000/documents").subscribe((response) => {
      this.documents = response;
      // this.maxDocumentId = this.getMaxId();
      this.documents.sort()
      this.documentsChangedEvent.next(this.documents.slice());
    }, (error: any) => {
      console.log(error);
    })
  }

  sortAndSend() {
    const documentsCopy = this.documents.slice()
    documentsCopy.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    this.documentsChangedEvent.next(documentsCopy)
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | undefined {
    for (let document of this.documents) {
      if (document.id == id) {
        return document
      }
    }

    return undefined;
  }

  // getMaxId(): number {
  //   let maxId = 0;
    
  //   this.documents.forEach((document: Document) => {
  //     // Get the greatest id out of either maxId or the document's id 
  //     maxId = Math.max(maxId, +document.id);
  //   })

  //   return maxId;
  // }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(() => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }

  addDocument(newDocument: Document) {
    if (!newDocument)
      return;

    newDocument.id = "";
    
    const headers = new HttpHeaders({"Content-Type": "application/json"});

    this.http.post<{message: string, document: Document}>("http://localhost:3000/documents", 
      newDocument, 
      {headers: headers}
    ).subscribe(responseData => {
      this.documents.push(responseData.document);
      this.sortAndSend();
    })
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(() => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }
}
