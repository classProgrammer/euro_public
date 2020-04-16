import {Observable, of} from 'rxjs';
import {ImageInfo} from '../detail-form/interfaces/ImageInfo';

export interface IStorageService {
  getImages(): Observable<ImageInfo[]>;
  UpdateImage(image: ImageInfo);
  imageInfo(id: string): Observable<ImageInfo>;
}
