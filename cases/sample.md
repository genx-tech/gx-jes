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
