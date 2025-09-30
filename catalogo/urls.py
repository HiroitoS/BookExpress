from django.urls import path
from .views import LibrosController, EditorialController, GradoController

urlpatterns = [
    path('libros/', view=LibrosController.as_view()),
    path('editoriales/', view=EditorialController.as_view()),
    path('grados/', view=GradoController.as_view()),  # Asegúrate de crear GradoController en views.py
    
]