import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

window.addEventListener('beforeunload', (event) => {
  event.returnValue = `You have unsaved changes, leave anyway?`;
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
