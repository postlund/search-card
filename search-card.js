const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class SearchCard extends LitElement {

  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }

  setConfig(config) {
    this.data = [];
    this.config = config;

	  if (!this.config.max_results) {
			this.config.max_results = 10;
		}
  }

  getCardSize() {
    return 4;
  }

  render() {
		var results = this.data.slice(0, this.config.max_results).sort();


    return html `
      <ha-card>
        <div id="searchContainer">
        <paper-input id="searchText"
                     @value-changed="${this._valueChanged}"
                     no-label-float
                     label="Type to search...">
          <iron-icon icon="mdi:magnify"
                     slot="prefix"></iron-icon>
          <paper-icon-button slot="suffix"
                             @click="${this.clearInput}"
                             icon="mdi:close"
                             alt="Clear"
                             title="Clear"></paper-icon-button>
        </paper-input>
        ${results.length > 0 ?
            html `<div style="text-align: right;">Showing ${results.length} of ${this.data.length} results</div>`
          : ''}
        </container>
      </ha-card>
      ${this._createResultEntities(results)}
    `;
  }

	_createResultEntities(results) {
		var elem;
    if (results.length > 0) {
      var conf = {
				'entities': results,
        'show_header_toggle': false,
      }

      elem = window.document.createElement('hui-entities-card');
      elem.setConfig(conf);
      elem.hass = this.hass;
    } else {
			elem = '';
		}
		return elem;
	}

  clearInput()
  {
    this.shadowRoot.getElementById('searchText').value = '';
    super.update()
  }

  _valueChanged(ev) {
    var searchText = ev.target.value;
    this.data = [];

    if (!this.config || !this.hass || searchText === "") {
      return;
    }

    for (var entity_id in this.hass.states) {
      if (entity_id.indexOf(searchText) >= 0) {
        this.data.push(entity_id);
      }
    }

    this.update();
  }

  static get styles() {
    return css `
      #searchContainer {
        width: 90%;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }
}

customElements.define('search-card', SearchCard);
