import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationsService} from '../../../shared/locations.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Site} from '../../../model/site.model';
import {SitesService} from '../../../shared/sites.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-add-edit-sites',
  templateUrl: './add-edit-sites.component.html',
  styleUrls: ['./add-edit-sites.component.scss']
})
export class AddEditSitesComponent implements OnInit {


  siteEdit: FormGroup;
  isLoading = false;
  paramsSubscription: Subscription;
  locationParamId: string = null;
  editMode: boolean;
  siteId: string;
  siteDetails: Site;

  constructor(public locationService: LocationsService,
              private route: ActivatedRoute,
              private router: Router,
              private sitesService: SitesService,
              private location: Location) {
  }

  ngOnInit() {

    this.isLoading = true;

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      console.log(params.location);
      this.locationParamId = params.location;
      this.siteId = params.siteId;
      const check = this.locationService.locationCheck(this.locationParamId);
      if (!check) {
        this.location.back();
      } else if (params.siteId) {
        this.editMode = true;
        this.siteDetails = this.sitesService.getSite(params.siteId);
        if (!this.sitesService) {
          console.log('ERROR');
          this.router.navigate(['/']);
        } else {
          this.initForm();
        }
      } else {
        this.initForm();
        this.editMode = false;
      }
    });
  }

  initForm() {
    let siteTitle = '';
    let siteLocation = '';
    let siteDescription = '';
    let siteCost = '';
    let siteUrl = '';

    if (this.editMode) {
      siteTitle = this.siteDetails.siteTitle;
      siteLocation = this.siteDetails.siteLocation;
      siteDescription = this.siteDetails.siteDescription;
      siteCost = this.siteDetails.siteCost;
      siteUrl = this.siteDetails.siteUrl;
    }

    this.siteEdit = new FormGroup({
      siteTitle: new FormControl(siteTitle, [Validators.required]),
      siteLocation: new FormControl(siteLocation, [Validators.required]),
      siteCost: new FormControl(siteCost, [Validators.required]),
      siteDescription: new FormControl(siteDescription, [Validators.required]),
      siteUrl: new FormControl(siteUrl)
    });
    this.isLoading = false;
  }

  onSubmit() {

    if (this.siteEdit.invalid) {
      return;
    }

    const site: Site = {
      id: null,
      siteTitle: this.siteEdit.value.siteTitle,
      siteLocation: this.siteEdit.value.siteLocation,
      siteCost: this.siteEdit.value.siteCost,
      siteDescription: this.siteEdit.value.siteDescription,
      siteLocationRef: this.locationParamId,
      siteUrl: this.siteEdit.value.siteUrl,
      created_at: null,
      updatedAt: null,
    };

    if (this.editMode) {
      site.id = this.siteId;
      this.sitesService.updateSite(site, this.siteId);
    } else {
      this.sitesService.addSite(site);
    }

    this.isLoading = true;
  }

  onClickDeleteItem() {
    this.sitesService.deleteSite(this.siteDetails.id, this.locationParamId);
  }

  onCancel() {
    this.location.back();
  }
}
