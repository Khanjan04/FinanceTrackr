# Generated by Django 4.1.5 on 2024-07-31 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='type',
            field=models.CharField(choices=[('home', 'Home'), ('miscellaneous', 'Miscellaneous'), ('travelling', 'Travelling'), ('med_learning', 'Medical/Learning'), ('shop_party', 'Shopping/Party'), ('special', 'Special')], max_length=128),
        ),
    ]
