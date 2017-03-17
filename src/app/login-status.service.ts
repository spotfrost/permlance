import { Injectable,EventEmitter } from '@angular/core';

@Injectable()
export class LoginStatusService {
  pushedData = new EventEmitter<string>();

  constructor() { }

  pushData(value:string){
    console.log('Login service called');
    console.log(value);
    this.pushedData.emit(value);
  }


}
