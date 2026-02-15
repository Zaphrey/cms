import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  imports: [RouterLink],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail implements OnInit, OnDestroy {
  @Input() contact: Contact | undefined = undefined;
  private contactsChanged?: Subscription;

  constructor(private contactService: ContactService, 
    private router: Router, 
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.contactsChanged = this.route.params.subscribe((params: Params) => {
        const id = params["id"];
        this.contact = this.contactService.getContact(id);
      })
    }

    onDelete(): void {
      if (this.contact) {
        this.contactService.deleteContact(this.contact);
        this.router.navigateByUrl("contacts");
      }
    }

    ngOnDestroy(): void {
      this.contactsChanged?.unsubscribe();
    }
}
