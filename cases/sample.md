```
from
{
    "value": "layouts/main",
    "edieMode": null,
    "enabled": null
}
with
{
    "$assign": {
        "editMode": {
            "$if": [
                "$$PARENT.enabled",
                {
                    "$set": null
                },
                {
                    "$set": "disabled"
                }
            ]
        }
    }
}
to
{
    "value": "layouts/main",
    "editMode": "disabled",
    "enabled": null
}
```

```
from
{"value":"","selectedCount":4,"totalCount":4}
with
{
    "$override": {
        "value": [
            "$$PARENT.selectedCount",
            {
                "$match": {
                    "$eq": "$$PARENT.totalCount"
                }
            }
        ],
        "indeterminate": [
            "$$PARENT.selectedCount",
            {
                "$match": {
                    "$lt": "$$PARENT.totalCount",
                    "$ne": 0
                }
            }
        ]
    }
}
to
{
    value: true,
    indeterminate: false
}
```
