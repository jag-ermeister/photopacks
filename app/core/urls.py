from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'orders/$', views.orders_list, name='orders_list'),
    path('orders/<uuid:pk>', views.orders_detail, name='order_detail'),
    path('packs/', views.PromptPackListView.as_view(), name='prompt-pack-list'),
    path('packs/<uuid:id>/', views.PromptPackDetailView.as_view(), name='prompt-pack-detail'),
    path("presigned_urls", views.S3PresignedUrlView.as_view()),
]
