# Tagarr

[![Test status](https://github.com/jamesacarr/tagarr/workflows/tests/badge.svg)](https://github.com/jamesacarr/tagarr/actions?query=workflow%3Atests)

This is a service to automatically tag all movies in a Radarr library that are present on an MDBList list.

## Description

This service was created to fix an issue with how Radarr handless tagging for Import Lists. Currently, only movies added via the list will be tagged. This means, that if an item was already in your library or added via a different Import List, it would not get the tag. This service corrects that issue by allowing you to specify a tag to apply to any movies that are currently in the Import List, whether they are already in your library or not. It also removes this tag if the item drops off the list.

## Usage

This service will automatically do the following once a day (at midnight UTC):

- Sync all lists & their tags from Radarr
- Fetch all movies in the lists and update tags in the Radarr library (add tag if missing, remove tag if no longer on list)

You can manually refresh the Radarr lists by using the Refresh button in the UI. There is currently no way to trigger a tag update via the UI.

## API

This services also provides some API endpoints to programmatically trigger syncs & updates. They are as follows:

### `POST /api/workflows/lists`

- Response 200 (application/json)

```
{
  "message": "List update started",
  "runId": <runID>,
}
```

Triggers the process to fetch all lists added to MDBList

If the `sync` query parameter is added to the URL (e.g. `/api/workflow/lists?sync`), the request will wait for the lists to be updated before responding with:

```
{
  "runId": <runId>,
  "status": "completed" | "failed",
  "createdAt": "<created timestamp>",
  "completedAt": "<completed timestamp>",
  "result": {
    "deleted": {
      "count": 1,
      "lists": [
        {
          "id": 1,
          "name": "deleted",
          "url": "https://mdblist.com/lists/some-fake-user/deleted-list",
          "enabled": 1,
          "last_synced_at": "2025-01-01 00:00:00Z"
        }
      ]
    },
    "inserted": {
      "count": 1,
      "lists": [
        {
          "id": 2,
          "name": "new",
          "url": "https://mdblist.com/lists/some-fake-user/new-list",
          "enabled": 1,
          "last_synced_at": "2025-01-01 00:00:00Z"
        }
      ]
    },
    "updated": {
      "count": 1,
      "lists": [
        {
          "id": 3,
          "name": "updated",
          "url": "https://mdblist.com/lists/some-fake-user/updated-list",
          "enabled": 1,
          "last_synced_at": "2025-01-01 00:00:00Z"
        }
      ]
    }
  }
}
```

### `POST /api/workflows/movies`

- Response 200 (application/json)

```
{
  "message": "Movie tagging started",
  "runIds": [<runIDs>],
}
```

Triggers the process to update the tags on all movies. Triggers multiple runs, one for each list.

If the `sync` query parameter is added to the URL (e.g. `/api/workflow/movies?sync`), the request will wait for the lists to be updated before responding with:

```
[
  {
    "runId": <runId>,
    "status": "completed" | "failed",
    "createdAt": "<created timestamp>",
    "completedAt": "<completed timestamp>",
    "result": [
      {
        "tagId": 1,
        "added": {
          "count": 1,
          "movies": [
            {
              "id": 1,
              "title": "The Godfather",
              "tmdbId": 238
            }
          ]
        },
        "removed": {
          "count": 1,
          "movies": [
            {
              "id": 1,
              "title": "Interstellar",
              "tmdbId": 157336
            }
          ]
        }
      }
    ]
  }
]
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
