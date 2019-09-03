customElements.whenDefined('card-tools').then(() => {
var ct = customElements.get('card-tools');

class SearchCard extends ct.LitElement {

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
      var rows = results.map((entity_id) => this._createRow(entity_id))
      return ct.LitHtml `
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
              ct.LitHtml `<div id="count">Showing ${results.length} of ${this.data.length} results</div>`
            : ''}
        </div>
        ${rows.length > 0 ?
              ct.LitHtml `<div id="results">${rows}</div>`
            : ''}
      </ha-card>
    `;
  }

  _createRow(entity_id) {
    var row = ct.createEntityRow({entity: entity_id});
    row.addEventListener("click", () => ct.moreInfo(entity_id));
    row.hass = this.hass;
    return row;
  }

  clearInput()
  {
    this.shadowRoot.getElementById('searchText').value = '';
    super.update()
  }

  _valueChanged(ev) {
    var searchText = ev.target.value;
    var searchRegex = new RegExp(searchText, 'i');

    this.data = [];

    if (!this.config || !this.hass || searchText === "") {
      this.update();
      return;
    }

    for (var entity_id in this.hass.states) {
      if (
          (entity_id.search(searchRegex) >= 0) ||
          (
            "friendly_name" in this.hass.states[entity_id].attributes &&
            this.hass.states[entity_id].attributes.friendly_name.search(searchRegex) >= 0
          )
        ) {
        this.data.push(entity_id);
      }
    }

    this.update();
  }

  static get styles() {
    return ct.LitCSS `
      #searchContainer {
        width: 90%;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      #count {
        text-align: right;
        font-style: italic;
      }
      #results {
        width: 90%;
        display: block;
        padding-bottom: 15px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }
}

customElements.define('search-card', SearchCard);

});

setTimeout(() => {
  if(customElements.get('card-tools')) return;
  customElements.define('search-card', class extends HTMLElement{
    setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools");}
  });
}, 2000);
