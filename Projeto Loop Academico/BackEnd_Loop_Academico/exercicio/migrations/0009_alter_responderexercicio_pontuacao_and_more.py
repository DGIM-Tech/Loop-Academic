# Generated by Django 5.0.6 on 2024-08-11 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercicio', '0008_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='responderexercicio',
            name='pontuacao',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='responderexercicio',
            name='resultado',
            field=models.TextField(blank=True),
        ),
    ]
