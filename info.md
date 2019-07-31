# Search Card

Quickly search for entities from a Lovelace card.

An `entities` card is produced with the results, so two cards will appear
in the frontend. In the example above, the `search-card` is placed in a
`vertical-stack-in-card` and the card background is themed to be transparent,
so they appear to be closer together.

## Features

* Search for entities and display results in frontend
* More to come...

## Roadmap

Some things I want to add in upcoming releases:

* Exclude domains and/or entities from results
* More polished UI
* Button to show all results (to override "max results")
* Add to HACS

## Install

### Simple Install

1. Download `search-card.js` and copy it into `config/www/search-card` (create the `search-card` directory)

2. Add a reference to `search-card/search-card.js` inside your `ui-lovelace.yaml`

  ```yaml
  resources:
    - url: /local/search-card/search-card.js?v=0
      type: module
  ```

### Git Install

1. Clone this repository into your `www`-directory: `git clone https://github.com/postlund/search-card.git`

2. Add a reference to `search-card/search-card.js` inside your `ui-lovelace.yaml`

  ```yaml
  resources:
    - url: /local/search-card/search-card.js?v=0
      type: module
  ```

## HACS

Not supported yet.

## Updating

If you...

* manually copied the files, just download the latest files and overwrite what you already have
* cloned the repository from Github, just do `git pull` to update

... and increase `?v=X` to `?vX+1`.

## Using the card

### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| max_results | integer | 10 | Max results to show by default

### Example

  ```yaml
  - type: custom:search-card
    max_results: 10
  ```

## Issues and imitations

This is still an early version and may contain bugs. If you find any problems, please write an issue.

## Getting errors?

Clear the browser cache, restart Home Assistant and make sure the configuration is correct.

If you believe you have found an error, please write an issue.