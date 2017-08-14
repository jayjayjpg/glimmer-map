import Component, { tracked } from '@glimmer/component';
import L from 'leaflet';

export default class GlimmerMap extends Component {

  map: any = {};
  mapTarget: any = null;

  @tracked
  height: string = '400';

  @tracked
  x: number = 11.6020;

  @tracked
  y: number = 48.1351;

  accessToken: string = 'pk.your.mapbox.token';

  createObserver() {

    var target = this.element;
    var observerCallback = this.setMapDimensions.bind(this);
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'width' || mutation.attributeName === 'height')) {
          observerCallback();
        }
      });
    });

    // configuration of the observer:
    var config = { attributes: true };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  }

  didInsertElement() {
    this.setMapDimensions();
    this.createMapInstance();
    this.setMapCoordinates();
    this.renderMap();
    this.createObserver();
  }

  setMapDimensions() {
    const mapTarget = this.element.children[0];
    const width = this.element.getAttribute('width');
    const height = this.element.getAttribute('height') || this.height;

    if (width) {
      mapTarget.style.width = `${width}px`;
    }
    mapTarget.style.height = `${height}px`;
    this.mapTarget = mapTarget;
  }

  createMapInstance() {
    const mymap = L.map(this.mapTarget);
    this.map = mymap;
  }

  renderMap() {
    var accessToken = this.accessToken;
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken,
}).addTo(this.map);
  }

  setView() {
    this.updateCoordinates();
    this.setMapCoordinates();
  }

  updateCoordinates(){
    this.x = this.element.getElementsByClassName('x-coord')[0].value;
    this.y = this.element.getElementsByClassName('y-coord')[0].value;
  }

  setMapCoordinates(){
    this.map.setView([this.y, this.x], 12);
  }
}
