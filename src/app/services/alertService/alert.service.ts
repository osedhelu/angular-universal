import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export enum from {
  top = 'top',
  bottom = 'bottom',
}
export enum aling {
  left = 'left',
  center = 'center',
  right = 'right',
}
export enum status {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}
export interface iAlert {
  form: from;
  aling: aling;
  status: status;
}
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastr: ToastrService) {}
  show(from: from, align: aling, status: status, mesagge: string) {
    this.toastr[status](
      `
<div class="container p-0 m-0">
  <p class="text-center"> <i class="now-ui-icons yafuz-${status}"></i> <h3>${mesagge}</h3></p>
</div>
    `,
      '',
      {
        timeOut: 10000,
        closeButton: true,
        enableHtml: true,
        toastClass: `alert alert-${status} alert-with-icon`,
        positionClass: 'toast-' + from + '-' + align,
      }
    );
  }
}
