import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiURL + '/sites/';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Site} from '../model/site.model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Favourite} from '../model/favourite.model';



@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private sites: Site[] = [];
  private sitesUpdate = new Subject<Site[]>();

  private favouriteSites: Favourite[] = [];
  private favouriteSitesUpdate = new Subject<Favourite[]>();

  constructor(private http: HttpClient, private  router: Router, private location: Location) {
  }

  getSites(tripId) {
    this.http.get<{ message: string, sites: any, maxPosts: number }>(BACKEND_URL + tripId)
      .pipe(map((siteData) => {
        return {
          sites: siteData.sites.map(site => {
              return {
                id: site._id,
                siteTitle: site.siteTitle,
                siteLocation: site.siteLocation,
                siteDescription: site.siteDescription,
                siteCost: site.siteCost,
                siteLocationRef: site.siteLocationRef,
                siteUrl: site.siteUrl,
                created_at: site.created_at,
                updatedAt: site.updatedAt,
                usersWhoLike: site.usersWhoLike,
              };
            }
          ),
          maxPosts: siteData.maxPosts
        };
      })).subscribe((transformedsiteData) => {
      this.sites = transformedsiteData.sites;
      this.sitesUpdate.next([...this.sites]);
    });
  }

  getSiteUpdateListener() {
    return this.sitesUpdate.asObservable();
  }

  updateSite(siteData: Site, siteId) {
    this.http.put<{ message: string }>
    (BACKEND_URL + siteData.id, siteData).subscribe((responseData) => {
      const index = this.sites.findIndex(x => x.id === siteData.id);
      this.sites[index] = siteData;
      this.sitesUpdate.next([...this.sites]);
      this.location.back();
    });
  }


  getSite(siteId) {
    return this.sites.find(x => x.id === siteId);
  }

  addSite(siteData: Site) {
    this.http.post<{ message: string, id: string, locationId: string }>
    (BACKEND_URL + 'create', siteData).subscribe((responseData) => {
      siteData.id = responseData.id;
      this.sites.push(siteData);
      this.sitesUpdate.next([...this.sites]);
      this.location.back();
    });
  }

  deleteSite(siteId, locationId) {
    this.http.delete<{ message: string }>(BACKEND_URL + siteId).subscribe((responseData) => {
      const index = this.sites.findIndex(x => x.id === siteId);
      this.sites.splice(index, 1);
      this.sitesUpdate.next([...this.sites]);
      this.location.back();
    });
  }


  getFavouriteSites(tripId) {
    this.http.get<{ message: string, favSites: Favourite[] }>(BACKEND_URL + 'favourite/get/' + tripId).subscribe((response) => {
      this.favouriteSites = response.favSites;
      this.favouriteSitesUpdate.next([...this.favouriteSites]);
    });
  }

  getFavouriteSitesUpdateListener() {
    return this.favouriteSitesUpdate.asObservable();
  }

  favouriteSite(data, SiteId) {

    this.http.post<{ message: string, favId: string; }>(BACKEND_URL + 'favourite/' + SiteId, data).subscribe((response) => {

      if (response.favId) {
        data._id = response.favId;
        this.favouriteSites.push(data);
      } else {
        const favElement = this.favouriteSites.filter((favSites) => {
          return (favSites.uid === data.uid && favSites.refResSite === data.refResSite);
        });

        const favId = favElement[0]._id;
        const favIndex = this.favouriteSites.findIndex(el => el._id === favId);
        this.favouriteSites[favIndex].favourite = data.favourite;
      }

      this.favouriteSitesUpdate.next([...this.favouriteSites]);

    });
  }


}
