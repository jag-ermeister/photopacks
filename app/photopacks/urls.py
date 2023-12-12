from django.contrib import admin
from django.urls import include, path, re_path
from core import views
from django.shortcuts import render


def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("api.urls")),
    re_path(r'^api/orders/$', views.orders_list),
    re_path(r'^api/orders/(?P<pk>[0-9]+)$', views.orders_detail),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
