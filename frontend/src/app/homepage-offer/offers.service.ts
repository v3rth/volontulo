import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Offer } from './offers.model';
import { loadDefaultImage } from './offer.utils';

@Injectable()
export class OffersService {
  private url = `${environment.apiRoot}/offers/`;

  constructor (private http: HttpClient) { }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.url)
      .map(offers => offers.map(offer => loadDefaultImage(offer)));
  }

  getOffer(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.url}${id}/`)
      .map(offer => loadDefaultImage(offer));
  }

  getJoinViewUrl(offer: Offer): string {
    return `${environment.djangoRoot}/offers/${offer.slug}/${offer.id}/join`;
  }

  createOffer(offer: Offer)  {
    return this.http.post(`${environment.apiRoot}/offers/`, offer)
  }

  editOffer(offer: Offer, id: number) {
    return this.http.put(`${environment.apiRoot}/offers/${id}/`, offer);
  }

}
