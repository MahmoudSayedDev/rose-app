import '@angular/compiler';
import { initFederation } from '@angular-architects/native-federation';

const manifest = window.location.hostname === 'localhost' ? '/federation.manifest.json' : '/federation.manifest.prod.json';

initFederation(manifest, {
  hostRemoteEntry: { url: "./remoteEntry.json" }
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
