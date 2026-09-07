import { inject, signal } from "@angular/core";
import { ToastService } from "./services/toast.service";

export abstract class AppComponentBase {

  protected readonly _toastService = inject(ToastService);

  formSubmited = signal<boolean>(false)

  paginator = signal({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
}
