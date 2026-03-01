import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { RouterLink } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  imports: [DocumentItem, RouterLink],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnInit, OnDestroy {
  documents: Document[] = [];
  private documentsChanged?: Subscription;

  constructor(private documentService: DocumentService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentsChanged = this.documentService.documentsChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;

      // Angular wasn't automatically updating the page, so we need to force it to now.
      this.changeDetector.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.documentsChanged?.unsubscribe();
  }
}
