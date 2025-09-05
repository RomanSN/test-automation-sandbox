import { Component } from '@angular/core';

@Component({
  selector: 'app-file-actions',
  standalone: false,
  templateUrl: './file-actions.component.html',
  styleUrls: ['./file-actions.component.css']
})
export class FileActionsComponent {
  selectedFile: File | null = null;
  downloadUrl: string | null = null;
  downloadFileName = '';
  droppedFileContent: string | null = null;
  droppedImageUrl: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const file = this.selectedFile;
      this.droppedImageUrl = null;
      this.droppedFileContent = null;
      if (file.type.startsWith('image/')) {
        this.droppedImageUrl = URL.createObjectURL(file);
      } else if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.droppedFileContent = reader.result as string;
        };
        reader.readAsText(file);
      } else {
        this.droppedFileContent = '[File is not supported]';
        this.selectedFile = null;
      }
    }
  }

  onUpload() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const blob = new Blob([e.target!.result as ArrayBuffer]);
        this.downloadUrl = URL.createObjectURL(blob);
        this.downloadFileName = this.selectedFile!.name;
      };
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      const file = this.selectedFile;
      this.droppedImageUrl = null;
      this.droppedFileContent = null;
      if (file.type.startsWith('image/')) {
        this.droppedImageUrl = URL.createObjectURL(file);
      } else if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.droppedFileContent = reader.result as string;
        };
        reader.readAsText(file);
      } else {
        this.droppedFileContent = '[File is not supported]';
        this.selectedFile = null;
      }
    }
  }

  resetSelection(input: HTMLInputElement) {
    input.value = '';
    this.selectedFile = null;
    this.droppedFileContent = null;
    this.droppedImageUrl = null;
    this.downloadUrl = null;
    this.downloadFileName = '';
  }
}
