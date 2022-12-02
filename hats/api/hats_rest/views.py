from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import LocationVO, Hat

# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
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
        'location',

        encoders={
            'location': LocationVOEncoder(),
        }
    ]

class HatsDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        'fabric',
        'style_name',
        'color',
        'pic_url'
    ]

    encoders = {
        'location' : LocationVODetailEncoder
    }

@require_http_methods(["GET", "POST"])
def list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {'hats': hats},
            encoder=HatsListEncoder
        )
    else:
        pass

# @require_http_methods(["DELETE, "GET"])
# def details_hats(request, pk):
#     if request.method == "GET":
#         hat = Hats.objects.get(id=pk)
#         return JsonResponse(
#             hat,
#             encoder=HatsDetailEncoder,
#         )
