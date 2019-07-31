# Search Card

Quickly search for entities from a Lovelace card.

## Features

* Search for entities and display results in frontend
* More to come...

## Roadmap

Some things I want to add in upcoming releases:

* Exclude domains and/or entities from results
* More polished UI
* Button to show all results (to override "max results")
* Add to HACS

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