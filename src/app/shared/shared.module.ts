import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';
import { ChunkPipe } from './chunk.pipe';



@NgModule({
  declarations: [PrimaryButtonComponent, SecondaryButtonComponent, ChunkPipe],
  imports: [
    CommonModule
  ],
  exports:[
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ChunkPipe
  ]
})
export class SharedModule { }
