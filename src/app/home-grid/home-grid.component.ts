import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageInfo} from '../detail-form/interfaces/ImageInfo';
import {INJECTOR, STORAGE_SERVICE_TOKEN} from '../service_interfaces/token';

@Component({
  selector: 'app-home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.css']
})
export class HomeGridComponent implements OnInit, OnDestroy {

  images: ImageInfo[];
  subscription;
  storageService;

  constructor() {
    this.storageService = INJECTOR.get(STORAGE_SERVICE_TOKEN);
  }

  ngOnInit(): void {
    this.subscription = this.storageService.getImages().subscribe(images => this.images = images);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
