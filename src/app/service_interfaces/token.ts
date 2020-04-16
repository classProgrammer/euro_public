import {InjectionToken, Injector} from '@angular/core';
import {IStorageService} from './IStorageService';
import {StorageService} from '../storage.service';



export const STORAGE_SERVICE_TOKEN = new InjectionToken<IStorageService>('StorageService', {
  providedIn: 'root',
  factory: () => new StorageService(),
});

export const INJECTOR = Injector.create({providers: [{provide: STORAGE_SERVICE_TOKEN, useValue: new StorageService()}]});
