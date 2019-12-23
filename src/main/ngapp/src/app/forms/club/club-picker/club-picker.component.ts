import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PickerOption } from 'src/app/shared/components/picker/picker.component';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Club } from 'src/app/shared/models/club';

@Component({
  selector: 'app-club-picker',
  templateUrl: './club-picker.component.html',
  styleUrls: ['./club-picker.component.scss']
})
export class ClubPickerComponent implements OnInit {

  clubs$: Observable<Club[]>;

  constructor(private clubService: ClubService,
              private dialogRef: MatDialogRef<ClubPickerComponent>
    ) { }

  //options$: Observable<PickerOption[]>;

  ngOnInit() {
    // this.options$ = this.clubService.getAll().pipe(map(clubs => {
    //   return clubs.map(club => {
    //     return {id: club.id, name: club.name};
    //   });
    // }));
    this.clubs$ = this.clubService.getAll();
  }

  end(club: Club) {
    this.dialogRef.close(club.id);
  }

}
