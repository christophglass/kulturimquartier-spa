import { Component, Input, OnDestroy } from '@angular/core';
import { EntryFacade } from 'src/app/domain/application/entry/entry.facade';
import { IEntry } from 'src/app/domain/entities/IEntry';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: false,  
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnDestroy {

  private _entry?: IEntry;
  private _entryId?: string;
  private subs = new Subscription();

  @Input()
  public get entry() {
    return this._entry || {} as IEntry;
  } 
  public set entry(value: IEntry) {
    this._entry = value;
    this._entryId = value.sys.id;
  }

  @Input()
  public get entryId() {
    return this._entryId || '';
  }
  public set entryId(value: string) {
    this._entryId = value;
    this.subs.add(
      this.entryFacade.entry$(this._entryId).subscribe((entry: IEntry | undefined) => this._entry = entry)      
    );
  }

  constructor(private entryFacade: EntryFacade) { }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  entryUrl(): string {
    return `${window.location.href}/${this.entryId}`;    
  }
}
