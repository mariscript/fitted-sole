from django.db import models

# Create your models here.


class LocationVO(models.Model):
    import_href = models.CharField(max_length=100)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.closet_name} {self.section_number} {self.shelf_number}"


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    pic_url = models.URLField()
    location = models.ForeignKey(
        LocationVO,
        related_name='hat',
        on_delete=models.DO_NOTHING
    )
