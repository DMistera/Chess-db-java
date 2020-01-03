import { EntityService } from '../services/entity-service/entity.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerEditorComponent } from 'src/app/forms/player/player-editor/player-editor.component';
import { Inject, OnInit } from '@angular/core';

export abstract class EditorTemplate<T, IdType> implements OnInit {
  constructor(
    protected entityService: EntityService<T, IdType>,
    protected dialogRef: MatDialogRef<EditorTemplate<T, IdType>>,
    protected data: DialogData<IdType>) {

    }

  public ngOnInit(): void {
    if (!this.data.isNew) {
      this.entityService.getByID(this.data.id).subscribe(entity => {
        this.initForm(entity);
      });
    }
  }

  public onSubmit() {
    console.log('Submitting!');
    if (this.validate()) {
      const entity = this.createEntity();
      if (this.data.isNew) {
        this.entityService.create(entity);
      } else {
        this.entityService.update(entity);
      }
      this.dialogRef.close();
    }
  }

  protected abstract initForm(entity: T): void;
  protected abstract createEntity(): T;
  protected abstract validate(): boolean;
}

export interface DialogData<IdType> {
  id: IdType;
  isNew: boolean;
}
