# Generated by Django 4.1.5 on 2024-09-27 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0002_alter_bankaccount_bank_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankaccounttransaction',
            name='date',
            field=models.BigIntegerField(),
        ),
    ]
