from django.db import models

# =======================================================
#  Modelos de Clasificación
# =======================================================

class Autor(models.Model):
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'autores'

class Editorial(models.Model):
    nombre = models.CharField(max_length=255)
    contacto = models.CharField(max_length=255, blank=True, null=True)
    telefono = models.CharField(max_length=50, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'editoriales'

class Grado(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'grados'

# =======================================================
#  Modelos de Productos (Libros)
# =======================================================

class Libro(models.Model):
    # Relaciones de Uno a Muchos (1:N)
    editorial = models.ForeignKey(Editorial, on_delete=models.PROTECT) # PROTECT: Evita borrar la Editorial si tiene libros.
    
    # SET_NULL: Permite que el autor sea nulo si el autor se elimina (para textos escolares sin autor individual).
    autor = models.ForeignKey(Autor, on_delete=models.SET_NULL, null=True, blank=True)
    
    # SET_NULL: Si se elimina el Grado, se establece a NULL.
    grado = models.ForeignKey(Grado, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Campos de Producto
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True) # Opcional
    isbn = models.CharField(max_length=100, unique=True) # Garantiza que el ISBN sea único
    codigo_barras = models.CharField(max_length=100, blank=True, null=True)
    pvp = models.DecimalField(max_digits=10, decimal_places=2) # Precio de venta al público
    descuento_editorial = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    costo_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    
    # Imagelibro_grado_Field para almacenar la imagen localmente. Se guardará en /media/portadas/
    portada = models.ImageField(upload_to='portadas/')

    def __str__(self):
        return self.titulo

    class Meta:
        db_table = 'libros' # Nombre de tabla profesional
