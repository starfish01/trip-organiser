import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
// import {sitesService} from "../../shared/sites.service";
// import {Location} from "../../model/location.model";
import {Subscription} from 'rxjs';
import {Site} from '../../model/site.model';
import {SitesService} from '../../shared/sites.service';
import {Favourite} from "../../model/favourite.model";
import {AuthService} from "../../auth/auth.service";


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit, OnDestroy {

  @Input('locationID') locationId: string;
  @Input('tripId') tripId: string;

  isFavourite = false;

  constructor(private router: Router, public route: ActivatedRoute, private siteService: SitesService, private authService: AuthService) {
  }

  sites: Site[] = [];
  private siteSubs: Subscription;

  private favSites: Favourite[] = [];
  private favSitesSubs: Subscription;

  private uid;

  isLoading = false;

  isLoadingFavs = false;

  ngOnInit() {
    this.isLoading = true;
    this.isLoadingFavs = true;
    this.uid = this.authService.getUserId();

    this.siteSubs = this.siteService.getSiteUpdateListener().subscribe((sites: Site[]) => {
      this.sites = sites;
      this.isLoading = false;
      this.siteService.getFavouriteSites(this.tripId);
    });

    this.favSitesSubs = this.siteService.getFavouriteSitesUpdateListener().subscribe((fav: Favourite[]) => {
      this.favSites = fav;
      for (const sites of this.sites) {
        let favCount = 0;
        const listOfUserWhoLike: string[] = [];
        for (const favourite of fav) {
          if (favourite.refResSite === sites.id) {
            if (favourite.uid === this.uid) {
              if (favourite.favourite !== '0') {
                favCount++;
                listOfUserWhoLike.push(favourite.userName);
                sites.currentUserFavourite = true;
              } else {
                sites.currentUserFavourite = false;
              }
            } else {
              if (favourite.favourite !== '0') {
                listOfUserWhoLike.push(favourite.userName);
                favCount++;
              }
            }
          }
        }
        sites.listOfUserWhoLike = listOfUserWhoLike;
        sites.totalUserFavourite = favCount;
      }

      this.sites.sort((a, b) =>
        (a.totalUserFavourite < b.totalUserFavourite) ? 1 :
          ((a.totalUserFavourite > b.totalUserFavourite) ? -1 : 0));

      this.isLoadingFavs = false;
    });

    this.siteService.getSites(this.tripId);
  }


  ngOnDestroy() {
    this.siteSubs.unsubscribe();
  }


  onClickAddsite() {
    this.router.navigate([this.locationId, 'site', 'add']);
  }

  onEditClick(siteId) {
    this.router.navigate([this.locationId, 'site', 'edit', siteId]);
  }

  onFavoriteClick(siteId, userFav, res) {

    const uid = this.authService.getUserId();
    const userName = this.authService.getFirstName() + ' ' + this.authService.getLastName();

    const favouriteData: Favourite = {
      location: this.locationId,
      refResSite: siteId,
      uid,
      favourite: new Date().toString(),
      tripId: this.tripId,
      _id: null,
      userName,
    };


    if (userFav) {
      favouriteData.favourite = '0';
    }

    this.siteService.favouriteSite(favouriteData, siteId);
  }


}
