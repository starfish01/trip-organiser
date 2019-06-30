import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
// import {sitesService} from "../../shared/sites.service";
// import {Location} from "../../model/location.model";
import {Subscription} from 'rxjs';
import {Site} from '../../model/site.model';
import {SitesService} from '../../shared/sites.service';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit, OnDestroy {

  @Input('locationID') locationId: string;
  @Input('tripId') tripId: string;

  isFavourite = false;

  constructor(private router: Router, public route: ActivatedRoute, private siteService: SitesService) {
  }

  sites: Site[] = [];
  private siteSubs: Subscription;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.siteSubs = this.siteService.getSiteUpdateListener().subscribe((sites: Site[]) => {
      this.sites = sites;
      this.isLoading = false;
    });
    this.siteService.getSites(this.tripId);
  }

  ngOnDestroy(): void {
    this.siteSubs.unsubscribe();
  }


  onClickAddsite(): void {
    this.router.navigate([this.locationId, 'site', 'add']);
  }

  onEditClick(siteId) {
    this.router.navigate([this.locationId, 'site', 'edit', siteId]);
  }

  onFavoriteClick() {
    this.isFavourite = !this.isFavourite;
  }


}
