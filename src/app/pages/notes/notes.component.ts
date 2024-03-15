import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import Swal from 'sweetalert2';
import { NotesService } from 'src/app/core/services/notes.service';
import { Notes } from 'src/app/core/interfaces/notes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  addNote:string = 'add'
  allNotes:Notes[]=[]
  searchValue = ''
  sidenavStatus:any
  constructor(
    public dialog: MatDialog,
    private _notesService:NotesService,
    private _translate:TranslateService
    ) {
      this._translate.setDefaultLang('en')
    }


  ngOnInit(): void {
    this.getData()
  }

  openDialog(noteData?:Notes): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {title: noteData?.title, content: noteData?.content,_id:noteData?._id},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
      if(result === true){
        this.ngOnInit();
      }
      this.addNote = 'Add Note';
    });
  } 

  getData(){
    this._notesService.getUserNotes().subscribe({
      next:(res)=>{
        if(res.msg === "done"){
          this.allNotes = res.notes       
          console.log(res);
        }
      }
    })
  }


  handleDeleteNote(deletedNoteId:string,noteIndex:number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      console.log(result);
      
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(()=>{
          this.deleteNote(deletedNoteId, noteIndex);
        })
      }
    });
  }

  deleteNote(deletedNoteId: string, noteIndex: number) {
    this._notesService.deleteUserNote(deletedNoteId).subscribe({
      next: (res) => {
        if (res.msg == "done") {
          this.allNotes.splice(noteIndex, 1);
          this.ngOnInit();
          console.log(res);
        }
      }
    });
  }

  handleUpdateNote(noteIndex:number,noteDetail:Notes){
    console.log(noteIndex,noteDetail);
    this.addNote = 'Update Note'
    // this.openDialog({title:this.allNotes[noteIndex].title, content: this.allNotes[noteIndex].content,id:this.allNotes[noteIndex]._id})
    this.openDialog({title:noteDetail.title, content: noteDetail.content,_id:noteDetail._id})
  }

}
