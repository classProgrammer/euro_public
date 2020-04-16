import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ImageInfo} from '../detail-form/interfaces/ImageInfo';
import {STORAGE_SERVICE_TOKEN} from '../service_interfaces/token';
import {IStorageService} from '../service_interfaces/IStorageService';

@Component({
  selector: 'app-home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.css']
})
export class HomeGridComponent implements OnInit, OnDestroy {

  images: ImageInfo[];
  subscription;

  constructor(@Inject(STORAGE_SERVICE_TOKEN) private storageService: IStorageService) {
  }

  ngOnInit(): void {
    this.subscription = this.storageService.getImages().subscribe(images => this.images = images);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
