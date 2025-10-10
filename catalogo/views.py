from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Libro, Editorial, Grado, Autor
from .serializers import LibroSerializer, EditorialSerializer, GradoSerializer, AutorSerializer, LibroDetalleSerializer
from rest_framework import status
from os import remove
from django.conf import settings


class LibrosController(APIView):
    def get(self, request):
        
        # resultado= Libro.objects.all()
        # print(resultado)
        # #instance> instancias del modelo para serializar
        # #data> informacion que vamos a guardar modificar en la bd proveniente del cliente
        # serializador= LibroDetalleSerializer(instance=resultado, many=True)
        # return Response(data={
        #     "message": "Lista de libros",
        #     'content': serializador.data
        #     })
        # Empezamos trayendo todos los libros
        resultado = Libro.objects.all()

        # Obtenemos los posibles filtros desde la URL
        editorial = request.query_params.get('editorial')
        grado = request.query_params.get('grado')
        autor = request.query_params.get('autor')
        titulo = request.query_params.get('titulo')

        # Aplicamos filtros uno por uno si existen
        if editorial:
            resultado = resultado.filter(editorial_id=editorial)
        if grado:
            resultado = resultado.filter(grado=grado)
        if autor:
            resultado = resultado.filter(autor_id=autor)
        if titulo:
            resultado = resultado.filter(titulo__icontains=titulo)

        # Serializamos el resultado
        serializador = LibroDetalleSerializer(instance=resultado, many=True)
        return Response(
            data={
                "message": "Lista de libros",
                'content': serializador.data
            },
            status=status.HTTP_200_OK
        )
        
    def post(self, request):
        serializador = LibroSerializer(data=request.data)
        if not serializador.is_valid():
            return Response(
                {"message": "Error al crear el libro", "content": serializador.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializador.save()
        return Response(
            {"message": "Libro creado correctamente", "content": serializador.data},
            status=status.HTTP_201_CREATED
        )

            
class LibroController(APIView):
    def get(self, request, id):
        libro_encontrado= Libro.objects.filter(id=id).first()
        if not libro_encontrado:
            return Response(data={
                'message': "El libro no existe"
            }, status=status.HTTP_404_NOT_FOUND)
        serializador= LibroDetalleSerializer(instance=libro_encontrado)
        return Response(data={
            'content': serializador.data
        }, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        libro_encontrado= Libro.objects.filter(id=id).first()
        if not libro_encontrado:
            return Response(data={
                'message': "El libro no existe"
            }, status=status.HTTP_404_NOT_FOUND)
            
        imagen_antigua = libro_encontrado.portada.path    
        serializador= LibroSerializer(data=request.data)
        
        if serializador.is_valid():
        
            serializador.update(instance=libro_encontrado, validated_data=serializador.validated_data)
            
            
            remove(imagen_antigua)
            
            return Response(data={
                'message': "Libro actualizado correctamente",
                'content': serializador.data
            }, status=status.HTTP_200_OK)
            
        else:
            return Response(data={
                'message': "Error al actualizar el libro",
                'content': serializador.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        libro_encontrado= Libro.objects.filter(id=id).first()
        if not libro_encontrado:
            return Response(data={
                'message': "El libro no existe"
            }, status=status.HTTP_404_NOT_FOUND)
            
        imagen_antigua = libro_encontrado.portada.path    
        serializador=LibroSerializer (instance=libro_encontrado, data=request.data, partial=True)
        
        if serializador.is_valid():
        
            serializador.update(instance=libro_encontrado, validated_data=serializador.validated_data)
            
            
            remove(imagen_antigua)
            
            return Response(data={
                'message': "Libro actualizado correctamente",
                'content': serializador.data
            }, status=status.HTTP_200_OK)
            
        else:
            return Response(data={
                'message': "Error al actualizar el libro",
                'content': serializador.errors
        }, status=status.HTTP_400_BAD_REQUEST)   
        
        
    def delete(self, request, id):
        libro_encontrado= Libro.objects.filter(id=id).first()
        if not libro_encontrado:
            return Response(data={
                'message': "El libro no existe"
            }, status=status.HTTP_404_NOT_FOUND)
            
        imagen_antigua = libro_encontrado.portada.path    
        Libro.objects.filter(id=id).delete()
        
        remove(imagen_antigua)
        
        return Response(data={}, status=status.HTTP_204_NO_CONTENT)
            
class EditorialesController(APIView):
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
    
class EditorialController(APIView):
    def get(self, request, id):
        editorial_encontrada= Editorial.objects.filter(id=id).first()
        if not editorial_encontrada:
            return Response(data={
                'message': "La editorial no existe"
            }, status=status.HTTP_404_NOT_FOUND)
        serializador= EditorialSerializer(instance=editorial_encontrada)
        return Response(data={
            'content': serializador.data
        }, status=status.HTTP_200_OK)
    def patch(self, request, id):
        data=request.data
        try:
            editorial= Editorial.objects.get(id=id)
            serializador= EditorialSerializer(instance=editorial, data=data, partial=True)
            if serializador.is_valid():
                serializador.save()
                return Response(data={
                    "message": "Editorial actualizada correctamente",
                    'content': serializador.data
                },status=status.HTTP_200_OK)
            else:
                return Response(data={
                    "message": "Error al actualizar la editorial",
                    'content': serializador.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Editorial.DoesNotExist:
            return Response(data={
                "message": "La editorial no existe"
            }, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, id):
        try:
            editorial= Editorial.objects.get(id=id)
            editorial.delete()
            return Response(data={
                "message": "Editorial eliminada correctamente"
            },status=status.HTTP_204_NO_CONTENT)
        except Editorial.DoesNotExist:
            return Response(data={
                "message": "La editorial no existe"
            }, status=status.HTTP_404_NOT_FOUND)

class GradosController(APIView):
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

class GradoController(APIView):
    def get(self, request, id):
        grado_encontrado= Grado.objects.filter(id=id).first()
        if not grado_encontrado:
            return Response(data={
                'message': "El grado no existe"
            }, status=status.HTTP_404_NOT_FOUND)
        serializador= GradoSerializer(instance=grado_encontrado)
        return Response(data={
            'content': serializador.data
        }, status=status.HTTP_200_OK)
        
    def patch(self, request, id):
        data=request.data
        try:
            grado= Grado.objects.get(id=id)
            serializador= GradoSerializer(instance=grado, data=data, partial=True)
            if serializador.is_valid():
                serializador.save()
                return Response(data={
                    "message": "Grado actualizado correctamente",
                    'content': serializador.data
                },status=status.HTTP_200_OK)
            else:
                return Response(data={
                    "message": "Error al actualizar el grado",
                    'content': serializador.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Grado.DoesNotExist:
            return Response(data={
                "message": "El grado no existe"
            }, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, id):
        try:
            grado= Grado.objects.get(id=id)
            grado.delete()
            return Response(data={
                "message": "Grado eliminado correctamente"
            },status=status.HTTP_204_NO_CONTENT)
        except Grado.DoesNotExist:
            return Response(data={
                "message": "El grado no existe"
            }, status=status.HTTP_404_NOT_FOUND)    

class AutoresController(APIView):
    def get(self, request):
        resultado= Autor.objects.all()
        print(resultado)
        serializador= AutorSerializer(instance=resultado, many=True)
        return Response(data={
            "message": "Lista de autores",
            'content': serializador.data
            })
    def post(self, request):
        data=request.data
        serializador= AutorSerializer(data=request.data)
        if serializador.is_valid():
            serializador.save()
            return Response(data={
                "message": "Autor creado correctamente",
                'content': serializador.data
            },status=status.HTTP_201_CREATED)
        else:
            return Response(data={
                "message": "Error al crear el autor",
                'content': serializador.errors
            }, status=status.HTTP_400_BAD_REQUEST)

class AutorController(APIView):
    def get(self, request, id):
        autor_encontrado= Autor.objects.filter(id=id).first()
        if not autor_encontrado:
            return Response(data={
                'message': "El autor no existe"
            }, status=status.HTTP_404_NOT_FOUND)
        serializador= AutorSerializer(instance=autor_encontrado)
        return Response(data={
            'content': serializador.data
        }, status=status.HTTP_200_OK)
        
    def patch(self, request, id):
        data=request.data
        try:
            autor= Autor.objects.get(id=id)
            serializador= AutorSerializer(instance=autor, data=data, partial=True)
            if serializador.is_valid():
                serializador.save()
                return Response(data={
                    "message": "Autor actualizado correctamente",
                    'content': serializador.data
                },status=status.HTTP_200_OK)
            else:
                return Response(data={
                    "message": "Error al actualizar el autor",
                    'content': serializador.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Autor.DoesNotExist:
            return Response(data={
                "message": "El autor no existe"
            }, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, id):
        try:
            autor= Autor.objects.get(id=id)
            autor.delete()
            return Response(data={
                "message": "Autor eliminado correctamente"
            },status=status.HTTP_204_NO_CONTENT)
        except Autor.DoesNotExist:
            return Response(data={
                "message": "El autor no existe"
            }, status=status.HTTP_404_NOT_FOUND)