// route-memory.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RouteMemoryService {
  private lastPlaygroundRoute = 'grid'; // default

  setPlaygroundChild(path: string) {
    this.lastPlaygroundRoute = path;
  }

  getPlaygroundChild(): string {
    return this.lastPlaygroundRoute;
  }
}
