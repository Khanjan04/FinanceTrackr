# Generated by Django 4.1.5 on 2024-09-27 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('investment', '0002_alter_investment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='investment',
            name='date',
            field=models.BigIntegerField(),
        ),
    ]
