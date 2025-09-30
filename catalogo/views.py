from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Libro, Editorial, Grado
from .serializers import LibroSerializer, EditorialSerializer, GradoSerializer
from rest_framework import status


class LibrosController(APIView):
    def get(self, request):
        
        resultado= Libro.objects.all()
        print(resultado)
        #instance> instancias del modelo para serializar
        #data> informacion que vamos a guardar modificar en la bd proveniente del cliente
        serializador= LibroSerializer(instance=resultado, many=True)
        return Response(data={
            "message": "Lista de libros",
            'content': serializador.data
            })
        
    def post(self, request):
        data=request.data
        serializador= LibroSerializer(data=request.data)
        if serializador.is_valid():
            serializador.save()
            return Response(data={
                "message": "Libro creado correctamente",
                'content': serializador.data
            },status=status.HTTP_201_CREATED)
        else:
            return Response(data={
                "message": "Error al crear el libro",
                'content': serializador.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
class EditorialController(APIView):
    def get(self, request):
        resultado= Editorial.objects.all()
        print(resultado)
        serializador= EditorialSerializer(instance=resultado, many=True)
        return Response(data={
            "message": "Lista de editoriales",
            'content': serializador.data
            })
    def post(self, request):
        data=request.data
        serializador= EditorialSerializer(data=request.data)
        if serializador.is_valid():
            serializador.save()
            return Response(data={
                "message": "Editorial creada correctamente",
                'content': serializador.data
            },status=status.HTTP_201_CREATED)
        else:
            return Response(data={
                "message": "Error al crear la editorial",
                'content': serializador.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
class GradoController(APIView):
    def get(self, request):
        resultado= Grado.objects.all()
        print(resultado)
        serializador= GradoSerializer(instance=resultado, many=True)
        return Response(data={
            "message": "Lista de grados",
            'content': serializador.data
            })
    def post(self, request):
        data=request.data
        serializador= GradoSerializer(data=request.data)
        if serializador.is_valid():
            serializador.save()
            return Response(data={
                "message": "Grado creado correctamente",
                'content': serializador.data
            },status=status.HTTP_201_CREATED)
        else:
            return Response(data={
                "message": "Error al crear el grado",
                'content': serializador.errors
            }, status=status.HTTP_400_BAD_REQUEST)