import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import initializeCustomElements from '@glimmer/web-component';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

app.renderComponent('glimmer-map', containerElement, null);

app.boot();
initializeCustomElements(app, ['glimmer-map']);
