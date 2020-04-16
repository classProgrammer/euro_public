import {ImageInfo} from './detail-form/interfaces/ImageInfo';
import {Observable, of} from 'rxjs';
import {IStorageService} from './service_interfaces/IStorageService';
import {Injectable} from '@angular/core';
import * as uuid from 'uuid';

@Injectable()
export class StorageService implements IStorageService {

  constructor() {
    const images = JSON.parse(localStorage.getItem('images'));
    if (images) {
      this.images = images;
    }
  }

  images: ImageInfo[] = [];

  private getEmptyImage(): ImageInfo {
    return {
      id: this.nextId(),
      name: '',
      notes: '',
      locationName: '',
      pictureUrl: ''
    };
  }

  private nextId() {
    return uuid.v4();
  }

  getImages(): Observable<ImageInfo[]> {
    return of(this.images);
  }

  UpdateImage(image: ImageInfo) {
    const idx = this.images.findIndex(x => {
      return x.id === image.id;
    });
    if (idx < 0) {
      this.images.push(image);
    } else {
      this.images[idx] = image;
    }
    localStorage.setItem('images', JSON.stringify(this.images));
  }

  imageInfo(id: string): Observable<ImageInfo> {
    if (id === 'new') {
      return of(this.getEmptyImage());
    } else {
      const idx = this.images.findIndex(x => x.id === id);
      return of(this.images[idx]);
    }
  }
}
