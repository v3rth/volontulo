import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Organization } from './organization/organization.model';
import { User } from './user';
import {Offer} from "./homepage-offer/offers.model";

@Injectable()
export class UserService {

  constructor (private authService: AuthService) {}

  addOrganization(organization: Organization): Observable<User> {
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        const alteredUser = {
          ...user,
          organizations: [...user.organizations, organization],
        };
        this.authService.setCurrentUser(alteredUser);
        return alteredUser;
      })
    );
  }
  updateOrganization(organization: Organization) {
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        const index = user.organizations.findIndex(org => org.id === organization.id);
        const alteredUser = {
          ...user,
          organizations: [
            ...user.organizations.slice(0, index - 1),
            organization,
            ...user.organizations.slice(index + 1)
          ],
        };
        this.authService.setCurrentUser(alteredUser);
        return alteredUser;
      })
    );
  }

  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  canUserEditOffer(offer: Offer): Observable<boolean> {
    return this.authService.user$
      .pipe(map((user: User) => this.isUserOrganizationMember(user, offer.organization)));
  }

  private isUserOrganizationMember(user: User, organization: Organization) {
    return user && organization && user.organizations.filter(organ => organ.id === organization.id).length > 0;
  }
}
