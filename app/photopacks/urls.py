from django.contrib import admin
from django.urls import include, path, re_path
from django.shortcuts import render
from . import views


def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path('admin/', admin.site.urls),
    path("health/", views.health_check, name="health_check"),
    path("api/", include("api.urls")),
    path("app/", include("payment.urls")),
    path("app/", include("core.urls")),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
