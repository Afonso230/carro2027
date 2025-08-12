import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private db: AngularFireDatabase) { }

  // Create or Update Data
  setData(path: string, data): Promise<void> {
    return this.db.object(path).set(data);
  }

  // Read Data as Observable
  getData(path: string): Observable<any> {
    return this.db.object(path).valueChanges();
  }

  // Push Data to a List
  pushData(path: string, data: any): Promise<any> {
    return this.db.list(path).push(data).then(() => {
      console.log('Player added successfully.');
    }).catch(error => {
      console.error('Error during push operation:', error);
    });
  }

  // Delete Data
  deleteData(path: string): Promise<void> {
    return this.db.object(path).remove();
  }
}
