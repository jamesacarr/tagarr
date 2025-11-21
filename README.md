# Tagarr

[![Test status](https://github.com/jamesacarr/tagarr/workflows/tests/badge.svg)](https://github.com/jamesacarr/tagarr/actions?query=workflow%3Atests)

This is a service to automatically tag all movies in Radarr & Sonarr libraries that are present on an MDBList list.

## Description

This service was created to fix an issue with how Radarr & Sonarr handle tagging for Import Lists. Currently, only movies/series added via the list will be tagged. This means, that if an item was already in your library or added via a different Import List, it would not get the tag. This service corrects that issue by dynamically adding or removing tags depending on whether items are present on a list, regardless of whether they were added to your library via that list or not.

## Usage

This service will automatically do the following once a day (at midnight UTC):

- Sync all lists & their tags from Radarr & Sonarr
- Fetch all items in the relevant lists and update tags in the Radarr/Sonarr library (add tag if missing, remove tag if no longer on list)

## API

This services also provides some API endpoints to programmatically trigger syncs. They are as follows:

### `POST /api/workflows/movies`

- Response 200 (application/json)

```
{
  "message": "Movie tagging started",
  "runIds": [<runIDs>],
}
```

Triggers the process to update the tags on all movies.

If the `sync` query parameter is added to the URL (e.g. `/api/workflow/movies?sync`), the request will wait for the tagging to finish before responding with:

```
{
  "runId": <runId>,
  "status": "completed" | "failed",
  "createdAt": "<created timestamp>",
  "completedAt": "<completed timestamp>",
  "result": [
    {
      "tag": {
        "id": 1,
        "label": "Good Movies"
      },
      "added": {
        "count": 1,
        "items": [
          {
            "id": 1,
            "title": "The Godfather",
            "tmdbId": 238
          }
        ]
      },
      "removed": {
        "count": 1,
        "items": [
          {
            "id": 2,
            "title": "Interstellar",
            "tmdbId": 157336
          }
        ]
      }
    }
  ]
}
```

### `POST /api/workflows/series`

- Response 200 (application/json)

```
{
  "message": "Series tagging started",
  "runIds": [<runIDs>],
}
```

Triggers the process to update the tags on all series.

If the `sync` query parameter is added to the URL (e.g. `/api/workflow/series?sync`), the request will wait for the tagging to finish before responding with:

```
{
  "runId": <runId>,
  "status": "completed" | "failed",
  "createdAt": "<created timestamp>",
  "completedAt": "<completed timestamp>",
  "result": [
    {
      "tag": {
        "id": 1,
        "label": "Good Series"
      },
      "added": {
        "count": 1,
        "items": [
          {
            "id": 1,
            "title": "Breaking Bad",
            "tmdbId": 1396
          }
        ]
      },
      "removed": {
        "count": 1,
        "items": [
          {
            "id": 2,
            "title": "Chernobyl",
            "tmdbId": 87108
          }
        ]
      }
    }
  ]
}
```

### `POST /api/workflows/<runId>`

- Response 200 (application/json)

```
{
  "runId": <runId>,
  "status": "pending" | "running" | "completed" | "failed",
  "createdAt": "<created timestamp>",
  "completedAt": "<completed timestamp>",
  "result": <run result>,
}
```

## License

© James Carr 2025
