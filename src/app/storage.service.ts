import {ImageInfo} from './detail-form/interfaces/ImageInfo';
import {Observable, of} from 'rxjs';
import {IStorageService} from './service_interfaces/IStorageService';


export class StorageService implements IStorageService {

  constructor() {
    const images = JSON.parse(localStorage.getItem('images'));
    if (images) {
      this.images = images;
    }
  }

  images: ImageInfo[] = [];

  currentId = 0;

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
    const id = this.currentId;
    this.currentId += 1;
    return id;
  }

  private getImage(): ImageInfo {
    return {
      id: this.nextId(),
      name: 'Name',
      notes: 'I have to note',
      locationName: 'Fill Murray',
      pictureUrl: 'https://www.fillmurray.com/400/400'
    };
  }

  getImages(): Observable<ImageInfo[]> {
    return of(this.images);
  }

  UpdateImage(image: ImageInfo) {
    const idx = this.images.findIndex(x => x.id === image.id);
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
      return of(this.images[+id]);
    }
  }
}
