# Generated by Django 5.0.4 on 2024-04-10 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_user_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('user', 'User'), ('admin', 'Admin')], default='user', max_length=10),
        ),
    ]
