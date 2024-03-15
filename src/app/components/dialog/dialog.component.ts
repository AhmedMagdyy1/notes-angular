import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notes } from 'src/app/core/interfaces/notes';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notes,
    private _notesService:NotesService
  ) {
    console.log(data);
    
  }

  noteForm:FormGroup = new FormGroup({
    title:new FormControl(this.data.title ? this.data.title : ''),
    content:new FormControl(this.data.content ? this.data.content : '')
  })

  handleUserAction(form:FormGroup){
    console.log(form.value);
    if (!this.data.title && !this.data.content){
      this.addNewNote(form.value)
    }else {
      this.updateNote(form.value)
    }
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  addNewNote(newNote:Notes){
    this._notesService.addNote(newNote).subscribe({
      next:(res)=>{
        if (res.msg === "done"){
          console.log(res);
          this.dialogRef.close(true)
        }
      }
    })
  }

  updateNote(updatedNote:Notes){
    console.log(this.data._id,updatedNote);
    
    this._notesService.updateUserNote(this.data._id,updatedNote).subscribe({
      next:(res)=>{
        if (res.msg == "done"){
          this.dialogRef.close(true)
        }
        console.log(res);
      }
    })
  }
}
