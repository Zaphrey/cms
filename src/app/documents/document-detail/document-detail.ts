import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  imports: [RouterLink],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail implements OnInit {
  nativeWindow: any;
  document: Document | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private documentService: DocumentService, 
    private windRefService: WindRefService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];
      this.document = this.documentService.getDocument(id);
    })

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView(): void {
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(): void {
    if (this.document) {
      this.documentService.deleteDocument(this.document);
      this.router.navigateByUrl("documents");
    }
  }
}
