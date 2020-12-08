import logging
import json

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps({'a':1}),
        mimetype="application/json")