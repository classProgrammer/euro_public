import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {ImageInfo} from './detail-form/interfaces/ImageInfo';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [StorageService]});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test .imageInfo(id)', (done: DoneFn) => {
    localStorage.removeItem('images');
    const image1 = {
      id: 'a',
      pictureUrl: 'abc',
      notes: 'dfadsfs',
      name: 'adsfdasf',
      locationName: ''
    };
    const image2 = {
      id: 'a',
      pictureUrl: 'abc',
      notes: 'dfadsfs',
      name: 'adsfdasf',
      locationName: ''
    };
    service.UpdateImage(image1);

    service.imageInfo(image1.id).toPromise().then(info => {
      expect(info).toEqual(image1);
      localStorage.removeItem('images');
      done();
    });
  });

  it ('Test Add/Update', (done: DoneFn) => {
    localStorage.removeItem('images');
    const image: ImageInfo = {
      id: 'a',
      pictureUrl: 'abc',
      notes: 'dfadsfs',
      name: 'adsfdasf',
      locationName: ''
    };

    service.getImages().toPromise().then(images => {
      expect(images).toEqual([]);
      service.UpdateImage(image);
      service.getImages().toPromise().then(images2 => {
        expect(images2).toEqual([image]);
        service.UpdateImage(image);
        service.getImages().toPromise().then(images3 => {
          expect(images3.length).toBe(1);
          const image2 = {
            id: 'b',
            pictureUrl: 'abc',
            notes: 'dfadsfs',
            name: 'adsfdasf',
            locationName: ''
          }
          service.UpdateImage(image2);
          service.getImages().toPromise().then(images4 => {
            expect(images4.length).toBe(2);
            const image3 = {
              id: 'b',
              pictureUrl: '1',
              notes: '2',
              name: '3',
              locationName: ''
            }
            service.UpdateImage(image3);
            service.getImages().toPromise().then(images5 => {
              expect(images5.length).toBe(2);
              localStorage.removeItem('images');
              done();
            });
          });
        });
      });
    });
  });

});
