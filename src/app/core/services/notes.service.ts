import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Notes } from '../interfaces/notes';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _httpClient:HttpClient,private _authService:AuthService) { }


  addNote(newNote:Notes):Observable <any>{
    console.log(newNote,this._authService.userToken.getValue() );
    return this._httpClient.post(environment.noteUrl,newNote,
    {
      headers:{
        "token":localStorage.getItem('token') || ''
      }
    })
  }

  getUserNotes():Observable <any>{
    return this._httpClient.get(environment.noteUrl,
    {
      headers:{
        "token":localStorage.getItem('token') || ''
      }
    })
  }

  deleteUserNote(noteId:string):Observable<any>{
    return this._httpClient.delete(`${environment.noteUrl}${noteId}`,
    {
      headers:{
        "token":localStorage.getItem('token') || ''
      }
    }
    )
  }

  updateUserNote(noteId:string,noteUpdate:Notes):Observable<any>{
    console.log(noteId,noteUpdate);
    
    return this._httpClient.put(`${environment.noteUrl}${noteId}`,noteUpdate,
    {
      headers:{
        "token":localStorage.getItem('token') || ''
      }
    })
  }
}
