# Generated by Django 5.0.4 on 2024-04-16 09:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel_destinations', '0005_alter_availabledate_to_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availabledate',
            name='to_date',
            field=models.DateField(default=datetime.datetime(2024, 4, 23, 9, 22, 19, 681708)),
        ),
    ]
