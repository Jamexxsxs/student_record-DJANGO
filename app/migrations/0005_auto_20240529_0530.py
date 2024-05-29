# Generated by Django 5.0.6 on 2024-05-28 21:30

from django.db import migrations

def set_student_id_initial_value(apps, schema_editor):
    if schema_editor.connection.vendor == 'sqlite':
        schema_editor.execute("UPDATE sqlite_sequence SET seq = 1000000 WHERE name = 'app_student'")

class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_rename_image_student_profile'),
    ]

    operations = [
        migrations.RunPython(set_student_id_initial_value),
    ]
