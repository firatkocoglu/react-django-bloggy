# Generated by Django 4.2.6 on 2023-11-22 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0012_alter_draft_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='draft',
            name='title',
            field=models.CharField(max_length=255),
        ),
    ]
