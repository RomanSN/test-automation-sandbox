import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouteMemoryService } from './services/route-memory.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sandbox',
  standalone: false,
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.css'
})
export class SandboxComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routeMemory: RouteMemoryService
  ) {}

  ngOnInit() {
    // When re-entering /playground without a specific child
    if (this.route.snapshot.routeConfig?.path === 'playground' &&
        this.route.firstChild?.routeConfig?.path === '') {
      const last = this.routeMemory.getPlaygroundChild();
      this.router.navigate([last], { relativeTo: this.route });
    }

    // Track child route changes under /playground
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const child = this.route.firstChild?.snapshot.routeConfig?.path;
      if (child) this.routeMemory.setPlaygroundChild(child);
    });
  }
}