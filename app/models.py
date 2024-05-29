from django.db import models

# Create your models here.
class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=11)
    address = models.TextField()
    enrollment_date = models.DateField(auto_now_add=True)
    course = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    year = models.IntegerField()
    profile = models.ImageField(upload_to="static/app/images")
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
