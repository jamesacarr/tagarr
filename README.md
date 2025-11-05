# Tagarr

[![Test status](https://github.com/jamesacarr/tagarr/workflows/tests/badge.svg)](https://github.com/jamesacarr/tagarr/actions?query=workflow%3Atests)

This is a service to automatically tag all movies in a Radarr library that are present on an MDBList list.

## Description

This service was created to fix an issue with how Radarr handless tagging for Import Lists. Currently, only movies added via the list will be tagged. This means, that if an item was already in your library or added via a different Import List, it would not get the tag. This service corrects that issue by allowing you to specify a tag to apply to any movies that are currently in the Import List, whether they are already in your library or not. It also removes this tag if the item drops off the list.

## Usage

This service will automatically do the following once a day (at midnight UTC):

- Sync all lists from MDBList
- Sync all tags from Radarr
- Update tags for Radarr library items (add tag if missing, remove tag if no longer on list)

You can manually trigger the sync for Radarr/MDBList by using the relevant buttons in the UI. There is currently no way to trigger a tag update via the UI.

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
          "description": "deleted list",
          "slug": "deleted-list",
          "url": "https://mdblist.com/lists/some-fake-user/deleted-list",
          "tag_id": 1,
          "sync": 1,
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
          "description": "new list",
          "slug": "new-list",
          "url": "https://mdblist.com/lists/some-fake-user/new-list",
          "tag_id": 2,
          "sync": 1,
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
          "description": "updated list",
          "slug": "updated-list",
          "url": "https://mdblist.com/lists/some-fake-user/updated-list",
          "tag_id": 3,
          "sync": 1,
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
    "result": {
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
  }
]
```

### `POST /api/workflows/tags`

- Response 200 (application/json)

```
{
  "message": "Tag update started",
  "runId": <runID>,
}
```

Triggers the process to fetch all tags from Radarr.

If the `sync` query parameter is added to the URL (e.g. `/api/workflow/tags?sync`), the request will wait for the lists to be updated before responding with:

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
          "label": "deleted"
        }
      ]
    },
    "inserted": {
      "count": 1,
      "lists": [
        {
          "id": 2,
          "label": "new"
        }
      ]
    },
    "updated": {
      "count": 1,
      "lists": [
        {
          "id": 3,
          "label": "updated"
        }
      ]
    }
  }
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
