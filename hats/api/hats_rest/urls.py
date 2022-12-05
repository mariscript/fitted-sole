from django.urls import path
from .views import list_hats, show_hats

urlpatterns = [
    path("hats/", list_hats, name="list_hats"),
    path("hats/<int:pk>/", show_hats, name="show_hats"),
]
