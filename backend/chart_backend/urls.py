from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('charts.urls')),  # Make sure this includes 'charts.urls'
]
