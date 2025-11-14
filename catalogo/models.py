from django.db import models

class Producto(models.Model):
    # 🔹 Datos generales
    empresa = models.CharField(max_length=100)
    nivel = models.CharField(max_length=100, blank=True, null=True)
    grado = models.CharField(max_length=100, blank=True, null=True)
    area = models.CharField(max_length=100, blank=True, null=True)
    serie = models.CharField(max_length=150, blank=True, null=True)
    descripcion_completa = models.TextField()

    # 🔹 Inventario y soporte
    tipo_inventario = models.CharField(max_length=100, blank=True, null=True)
    soporte = models.CharField(max_length=100, blank=True, null=True)

    # 🔹 Precios y descuentos
    pvp_2026_con_igv = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    desc_proveedor = models.CharField(max_length=20, blank=True, null=True)
    precio_proveedor = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # 🔹 Tipo de venta
    TIPO_VENTA_CHOICES = [
        ('FERIA', 'Feria'),
        ('CONSIGNA', 'Consigna'),
        ('PUNTO_DE_VENTA', 'Punto de venta'),
    ]
    tipo_venta = models.CharField(max_length=20, choices=TIPO_VENTA_CHOICES, blank=True, null=True)

    # 🔹 Precios por modalidad
    precio_be = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_ie = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_consigna = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_coordinado = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_ppff = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # 🔹 Descuentos y comisiones
    desc_consigna = models.CharField(max_length=20, blank=True, null=True)
    comision = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    # 🔹 Rentabilidad y utilidad
    utilidad_ie = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    roi_ie = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    roi_consigna = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # 🔹 Fechas automáticas
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ["empresa", "nivel", "grado", "area", "descripcion_completa"]
        # evita insertar exactamente el mismo producto varias veces
        unique_together = ('empresa', 'nivel', 'grado', 'area', 'descripcion_completa')
        # índices para acelerar búsquedas comunes
        indexes = [
            models.Index(fields=['empresa']),
            models.Index(fields=['tipo_venta']),
            models.Index(fields=['nivel', 'area']),
        ]

    def __str__(self):
        return f"{self.empresa} — {self.descripcion_completa[:60]}"
