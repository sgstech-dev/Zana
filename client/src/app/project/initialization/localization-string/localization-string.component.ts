import { NgFor } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LocalizationString, LocalizationStringService } from 'app/project/services/localization-string.service';
import { PaginatorLocalizeService } from 'app/project/services/paginator-localize.service';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PageHeaderComponent } from '@shared';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';

@Component({
  selector: 'app-localization-string',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatOption,
    MatCardModule,
    MatFormField,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent],
  templateUrl: './localization-string.component.html',
  styleUrl: './localization-string.component.scss'
})
export default class LocalizationStringComponent implements AfterViewInit {
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  list: LocalizationString[] = [];
  isLoading = true;

  lsForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private localizationStringService: LocalizationStringService) {
    this.lsForm = formBuilder.group({
      strId: [0],
      strKey: ['', Validators.required],
      strValue: ['', Validators.required],
      lang: ['', Validators.required]
    });
  }

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('strId'),
      field: 'strId',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('strKey'),
      field: 'strKey',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('strValue'),
      field: 'strValue',
      minWidth: 100,
    },
    {
      header: this.translate.stream('lang'),
      field: 'lang',
      minWidth: 100,
    },
    {
      header: this.translate.stream('operation'),
      field: 'operation',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          click: record => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: (record: LocalizationString) => this.delete(record.strId),
        },
      ],
    },
  ];


  ngAfterViewInit(): void {
    this.localizationStringService.get().subscribe((result: any) => {
      this.list = result;
      this.isLoading = false;
    });
  }

  cancel() {
    this.lsForm.reset({
      strId: 0,
      strKey: '',
      strValue: '',
      lang: ''
    }, { emitEvent: false });
    this.lsForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  save() {
    let ls: LocalizationString = {
      strId: this.lsForm.controls["strId"].value,
      strKey: this.lsForm.controls["strKey"].value,
      strValue: this.lsForm.controls["strValue"].value,
      lang: this.lsForm.controls["lang"].value
    };

    if (this.lsForm.controls["strId"].value == '0') {
      this.localizationStringService.post(ls).subscribe((insertdata: any) => {
        this.list.push(insertdata);
        this.list = [...this.list];
        this.cancel();
      });
    }
    else {
      this.localizationStringService.put(ls.strId, ls).subscribe(() => {
        let foundLS = this.list.find((x: { strId: any; }) => x.strId === ls.strId);
        Object.assign(foundLS!, ls);
        this.list = [...this.list];
        this.cancel();
      });
    }
  }

  edit(ls: LocalizationString) {
    this.lsForm.setValue(ls);
  }

  delete(id: number) {

    this.localizationStringService.delete(id).subscribe({
      next: () => {
        let foundLSIdx = this.list.findIndex((x: { strId: number; }) => x.strId === id);
        this.list.splice(foundLSIdx, 1);
        this.list = [...this.list];
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}

