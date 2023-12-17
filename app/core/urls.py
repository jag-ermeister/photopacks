from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'orders/$', views.orders_list, name='orders_list'),
    re_path(r'orders/(?P<pk>[0-9]+)$', views.orders_detail),
    path("presigned_urls", views.S3PresignedUrlView.as_view()),
]
