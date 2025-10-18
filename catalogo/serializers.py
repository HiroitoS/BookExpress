from rest_framework import serializers
from .models import Libro, Editorial, Grado, Autor, Contacto
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
        
# class LibroDetalleSerializer(serializers.ModelSerializer):
#     editorial = EditorialSerializer(read_only=True)
#     grado = GradoSerializer(read_only=True)
#     autor = AutorSerializer(read_only=True)
#     class Meta:
#         model = Libro
#         fields = '__all__'
        
class LibroDetalleSerializer(serializers.ModelSerializer):
    editorial = serializers.CharField(source="editorial.nombre", read_only=True)
    grado = serializers.CharField(source="grado.nombre", read_only=True)
    autor = serializers.CharField(source="autor.nombre", read_only=True)

    class Meta:
        model = Libro
        fields = ["id", "titulo", "pvp", "portada", "editorial", "grado", "autor"]
        


class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'

    def validate(self, data):
        tipo = data.get('tipo_contacto')

        # Validación lógica según tipo
        if tipo == 'Libro no encontrado' and not data.get('libro_solicitado'):
            raise serializers.ValidationError({
                'libro_solicitado': 'Debe especificar el libro que no encontró.'
            })
        if tipo == 'Docente interesado' and not data.get('colegio'):
            raise serializers.ValidationError({
                'colegio': 'Debe indicar el nombre del colegio.'
            })

        return data
