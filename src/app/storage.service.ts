import { Injectable } from '@angular/core';
import { Database, listVal, objectVal, push, ref, remove, set } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private db: Database) { }

  // Create or Update Data
  setData(path: string, data): Promise<void> {
    return set(ref(this.db, path), data);
  }

  // Read Data as Observable
  getData(path: string): Observable<any> {
    return objectVal(ref(this.db, path))
  }

  getList(path: string): Observable<any> {
    return listVal(ref(this.db, path))
  }

  // Push Data to a List
  pushData(path: string, data: any): Promise<any> {
    return set(push(ref(this.db, path)), data).then(() => {
      console.log('Player added successfully.');
    }).catch(error => {
      console.error('Error during push operation:', error);
    });
  }

  // Delete Data
  deleteData(path: string): Promise<void> {
    return remove(ref(this.db, path));
  }
}
