import {Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../homepage-offer/offers.model';
import {UserService} from '../../user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'volontulo-offer-header',
  templateUrl: './offer-header.component.html',
  styleUrls: ['./offer-header.component.scss']
})
export class OfferHeaderComponent implements OnInit {
  @Input() offer: Offer;
  showEditButton$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.showEditButton$ = this.userService.canUserEditOffer(this.offer);
  }
}
