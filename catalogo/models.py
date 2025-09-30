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
    class Nivel(models.TextChoices):
        INICIAL = 'Inicial', 'Inicial'
        PRIMARIA = 'Primaria', 'Primaria'
        SECUNDARIA = 'Secundaria', 'Secundaria'

    nivel = models.CharField(max_length=20, choices=Nivel.choices)
    grado_numero = models.CharField(max_length=50)  # Ej: 1°, 2°, etc.

    def __str__(self):
        return f"{self.nivel} - {self.grado_numero}"

    class Meta:
        db_table = 'grados'
        verbose_name_plural = 'Grados'
        unique_together = ('nivel', 'grado_numero')  # evita duplicados
        ordering = ['nivel', 'grado_numero']

# =======================================================
#  Modelos de Productos (Libros)
# =======================================================

class Libro(models.Model):
    # Relaciones
    editorial = models.ForeignKey(
        'Editorial',
        on_delete=models.PROTECT
    )  # Evita borrar editorial si tiene libros

    autor = models.ForeignKey(
        'Autor',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )  # Opcional (hay libros sin autor individual)

    grado = models.ForeignKey(
        'Grado',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )  # Opcional (se puede usar para libros que no estén ligados a un grado específico)

    # Datos principales del libro
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)  # Opcional
    isbn = models.CharField(max_length=100, unique=True)   # Único
    codigo_barras = models.CharField(max_length=100, blank=True, null=True)

    # Precios y stock
    pvp = models.DecimalField(max_digits=10, decimal_places=2)  # Precio de venta
    descuento_editorial = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    costo_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)

    # Imagen (sin upload_to, se guardará en MEDIA_ROOT directo)
    portada = models.ImageField()

    def __str__(self):
        return self.titulo

    class Meta:
        db_table = 'libros'
        ordering = ['titulo']