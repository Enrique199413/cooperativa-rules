import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-styles/paper-styles';

import css from './style.pcss';
import template from './template.html';

export default class CooperativaLayout extends PolymerElement {
  static get properties() {
    return {
      name: {
        type: String,
        value: 'EnriqueLC'
      },
      appVersion: {
        type: String,
        value: process.env.appVersion
      },
      ENV: {
        type: String,
        value: process.env.NODE_ENV
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }
}

window.customElements.define('cooperativa-layout', CooperativaLayout);
