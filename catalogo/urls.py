from django.urls import path
from .views import LibrosController, LibroController, EditorialesController, EditorialController,GradosController, GradoController, AutoresController, AutorController

urlpatterns = [
    #--LIBROS
    path('libros/', view=LibrosController.as_view()),
    path('libro/<int:id>/', view=LibroController.as_view()),  # Ruta para obtener un libro por ID
    #--EDITORIAL
    path('editoriales/', view=EditorialesController.as_view()),
    path('editorial/<int:id>/', view=EditorialController.as_view()),  # Ruta para operaciones con editorial por ID
    #--GRADOS
    path('grados/', view=GradosController.as_view()),  # Asegúrate de crear GradoController en views.py
    path('grado/<int:id>/', view=GradoController.as_view()),  # Ruta para operaciones con grado por ID
    #--AUTORES
    path('autores/', view=AutoresController.as_view()),
    path('autor/<int:id>/', view=AutorController.as_view()),  # Ruta para operaciones con autor por ID
]