import {Component, inject} from '@angular/core';
import {MatBadge} from "@angular/material/badge";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {BusyService} from "../../core/services/busy.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {BasketService} from "../../core/services/basket.service";
import {AccountService} from "../../core/services/account.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatBadge,
    MatIcon,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatProgressBar,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  busyService = inject(BusyService);
  basketService = inject(BasketService);
  accountService = inject(AccountService);
  private router = inject(Router);

  logout() {
    this.accountService.logout().subscribe({
      next: async () => {
        this.accountService.currentUser.set(null);
        await this.router.navigateByUrl('/login');
      }
    });
  }
}
