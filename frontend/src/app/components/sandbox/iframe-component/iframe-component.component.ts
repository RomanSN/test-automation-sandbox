import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-component',
  standalone: false,
  templateUrl: './iframe-component.component.html',
  styleUrl: './iframe-component.component.css',
})
export class IframeComponent implements AfterViewInit {
  private _url = 'https://www.selenium.dev';
  sanitizedUrl: SafeResourceUrl = '';
  regularGreen = false;

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._url);
  }

  @ViewChild('shadowHost', { static: true }) shadowHostRef!: ElementRef;

  ngAfterViewInit(): void {
    const shadowRoot = this.shadowHostRef.nativeElement.attachShadow({ mode: 'open' });

    const button = document.createElement('button');
    button.textContent = 'Shadow Button';
    button.style.backgroundColor = 'white';
    button.style.border = '1px solid black';
    button.style.padding = '10px 20px';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    button.style.whiteSpace = 'nowrap';

    button.addEventListener('click', () => {
      button.style.backgroundColor =
        button.style.backgroundColor === 'rgb(165, 231, 165)' ? 'white' : 'rgb(165, 231, 165)';
    });

    shadowRoot.appendChild(button);
  }

  toggleRegular(): void {
    this.regularGreen = !this.regularGreen;
  }
}
