from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200, null=True, blank=True)
    bin_number = models.PositiveSmallIntegerField(default=1)
    bin_size = models.PositiveSmallIntegerField(default=1)

    def get_api_url(self):
        return reverse("api_show_shoes", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.bin_number}/{self.bin_size}"

    class Meta:
        ordering = ("closet_name", "bin_number", "bin_size")

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
    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.manufacturer} - {self.model_name}/{self.color}"

    class Meta:
        ordering = ("manufacturer", "model_name", "color")