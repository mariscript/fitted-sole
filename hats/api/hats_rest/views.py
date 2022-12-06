from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import LocationVO, Hat

# Create your views here.

class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        'import_href',
        'closet_name',
        'section_number',
        'shelf_number'
    ]

class HatsListEncoder(ModelEncoder):
    model = Hat
    properties = [
        'id',
        'fabric',
        'style_name',
        'color',
        'pic_url',
    ]

    def get_extra_data(self, o):
        return {"bin": o.location.closet_name}

class HatsDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        'fabric',
        'style_name',
        'color',
        'pic_url'
        'id',
        'location',
    ]

    encoders = {
        'location': LocationVOEncoder(),
    }

@require_http_methods(["GET"])
def api_list_locationvo(request):
    """
    List the location value objects from the poller
    """

    if request.method == "GET":
        locationvo = LocationVO.objects.all()
        return JsonResponse(
            {"locationvo": locationvo},
            encoder=LocationVOEncoder,
        )

@require_http_methods(["GET", "POST"])
def list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id != None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location = LocationVO.objects.get(import_href=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsListEncoder,
            safe=False,
        )



@require_http_methods(["DELETE", "GET", "PUT"])
def show_hats(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
            return JsonResponse(
                {"hat": hat},
                encoder=HatsDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Hat does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            hat = Hat.objects.get(id=pk)
            hat.delete()
            return JsonResponse(
                hat,
                encoder=HatsDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message":"Hat does not exist"},
                status=400,
            )
