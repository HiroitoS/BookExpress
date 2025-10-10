from rest_framework import serializers
from .models import Libro, Editorial, Grado, Autor
class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        #fields = '__all__' # Todos los campos
        #exclude = ['stock'] # Excluir campos
        #nota: solo se puede utilizar unos de los dos no los dos al mismo tiempo porque da error
        fields = '__all__'
        #exclude = ['stock, id, isbn']
        
class EditorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Editorial
        fields = '__all__'
        
class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = '__all__'
        
class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'
        
class LibroDetalleSerializer(serializers.ModelSerializer):
    editorial = EditorialSerializer(read_only=True)
    grado = GradoSerializer(read_only=True)
    autor = AutorSerializer(read_only=True)
    class Meta:
        model = Libro
        fields = '__all__'