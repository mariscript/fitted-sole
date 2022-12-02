from django.db import models

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200, null=True, blank=True)
    bin_number = models.PositiveSmallIntegerField(default=1)
    bin_size = models.PositiveSmallIntegerField(default=1)


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100, null=True, blank=True)
    model_name = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name = "shoes",
        on_delete=models.CASCADE, null=True,
        blank=True,
    )