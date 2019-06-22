import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiURL + '/sites/';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Site} from '../model/site.model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private sites: Site[] = [];
  private sitesUpdate = new Subject<Site[]>();

  constructor(private http: HttpClient, private  router: Router, private location: Location) {
  }

  getSites() {
    this.http.get<{ message: string, sites: any, maxPosts: number }>(BACKEND_URL)
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
      console.log(responseData);
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
      console.log(responseData);
      // Need to set up object
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
}
