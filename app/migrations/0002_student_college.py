# Generated by Django 5.0.6 on 2024-05-28 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='college',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]