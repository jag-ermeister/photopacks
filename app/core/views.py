import boto3
import os
import uuid
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django_cognito_jwt import JSONWebTokenAuthentication
from .models import Order
from .serializers import *
from .services import AiService


class S3PresignedUrlView(APIView):
    # These two settings are already set in settings.py, but I am leaving them here for my own reference
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = [IsAuthenticated]

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )

    def post(self, request):
        user = request.user
        order_id = request.data.get(
            "order_id"
        )  # TODO validate model name before allowing uploading
        image_names = request.data.get("image_names")

        image_urls = {}
        for image_name in image_names:
            extension = image_name.split('.')[-1]
            object_name = f"{order_id}/training_photos/{uuid.uuid4()}.{extension}"
            presigned_url = self.s3.generate_presigned_url(
                ClientMethod="put_object",
                Params={
                    "Bucket": os.environ['ORDER_IMAGES_S3_BUCKET_NAME'],
                    "Key": object_name,
                    "ContentType": "image/jpeg",  # TODO: get this from frontend?
                },
                ExpiresIn=300,  # URL will expire in 5 minutes
            )
            image_urls[image_name] = presigned_url

        return Response(
            {"order_id": order_id, "presigned_urls": image_urls},
            status=status.HTTP_201_CREATED,
        )


@api_view(['GET', 'POST'])
def orders_list(request):
    if request.method == 'GET':
        data = Order.objects.filter(user=request.user).order_by('-created_date')
        serializer = OrderSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            order = serializer.save(user=request.user)
            AiService().submit_job(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def orders_detail(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OrderSerializer(order, context={'request': request})
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PromptPackListView(generics.ListAPIView):
    queryset = PromptPack.objects.all()
    serializer_class = PromptPackSerializer
    permission_classes = [AllowAny]


class PromptPackDetailView(generics.RetrieveAPIView):
    queryset = PromptPack.objects.all()
    serializer_class = PromptPackSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]