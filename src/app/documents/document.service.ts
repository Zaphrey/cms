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
    this.http.get<Document[]>("https://zwhcms-default-rtdb.firebaseio.com/documents.json").subscribe((response) => {
      this.documents = response;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort()
      this.documentsChangedEvent.next(this.documents.slice());
    }, (error: any) => {
      console.log(error);
    })
  }

  storeDocuments() {
    const documentString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ "ContentType": "application/json" });
    this.http.put("https://zwhcms-default-rtdb.firebaseio.com/documents.json", documentString, { headers: headers }).subscribe(() => {
      this.documentsChangedEvent.next(this.documents.slice())
    }, (error: any) => {
      console.log(error);
    })
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

  getMaxId(): number {
    let maxId = 0;
    
    this.documents.forEach((document: Document) => {
      // Get the greatest id out of either maxId or the document's id 
      maxId = Math.max(maxId, +document.id);
    })

    return maxId;
  }

  deleteDocument(document: Document): void {
    if (!document)
      return;

    const pos = this.documents.indexOf(document);

    if (pos < 0) 
      return;
    
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  addDocument(newDocument: Document) {
    if (!newDocument)
      return;

    this.maxDocumentId++;

    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument)
      return;

    let originalPos = this.documents.indexOf(originalDocument);

    if (originalPos < 0)
      return;

    newDocument.id = originalDocument.id;
    this.documents[originalPos] = newDocument;

    this.storeDocuments();
  }
}
