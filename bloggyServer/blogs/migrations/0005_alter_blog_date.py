# Generated by Django 4.2.6 on 2023-10-23 10:09

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0004_remove_userprofile_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='date',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
