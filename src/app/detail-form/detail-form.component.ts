import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageInfo} from './interfaces/ImageInfo';
import {STORAGE_SERVICE_TOKEN} from '../service_interfaces/token';
import {IStorageService} from '../service_interfaces/IStorageService';

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

  constructor(private route: ActivatedRoute, private router: Router, @Inject(STORAGE_SERVICE_TOKEN) private storageService: IStorageService) {
    console.log(storageService);
  }

  ngOnInit() {
    this.routesubs = this.route.params.subscribe(params => {
      this.id = params.id;

      this.imageSubs = this.storageService.imageInfo(this.id).subscribe(image => {
        this.imageInfo = image;
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
    this.router.navigate(['/home']);
  }
}
