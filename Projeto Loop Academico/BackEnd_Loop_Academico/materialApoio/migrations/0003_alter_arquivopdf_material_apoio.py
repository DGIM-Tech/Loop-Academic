# Generated by Django 5.0.6 on 2024-08-26 18:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('materialApoio', '0002_arquivopdf_mapamental'),
    ]

    operations = [
        migrations.AlterField(
            model_name='arquivopdf',
            name='material_apoio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='arquivos_pdf', to='materialApoio.materialapoio'),
        ),
    ]
