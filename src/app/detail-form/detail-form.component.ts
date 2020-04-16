import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImageInfo} from './interfaces/ImageInfo';
import {INJECTOR, STORAGE_SERVICE_TOKEN} from '../service_interfaces/token';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css']
})
export class DetailFormComponent implements OnInit, OnDestroy {

  id;
  imageInfo: ImageInfo;
  routesubs;
  imageSubs;
  storageService;
  constructor(private route: ActivatedRoute) {
    this.storageService = INJECTOR.get(STORAGE_SERVICE_TOKEN);
  }

  ngOnInit() {
    this.routesubs = this.route.params.subscribe(params => {
      this.id = params.id;

      this.imageSubs = this.storageService.imageInfo(this.id).subscribe(image => {
        this.imageInfo = image
      }
      );
    });
  }

  ngOnDestroy() {
    this.routesubs.unsubscribe();
    this.imageSubs.unsubscribe();
  }

  requiredIsEmpty() {
    return ! (this.imageInfo.name.length > 0 && this.imageInfo.pictureUrl.length > 0);
  }

  onSaveClick() {
    this.storageService.UpdateImage(this.imageInfo);
  }
}
