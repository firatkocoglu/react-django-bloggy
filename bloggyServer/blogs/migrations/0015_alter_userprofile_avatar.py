# Generated by Django 4.2.6 on 2023-12-08 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0014_alter_userprofile_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(default='/profile_pics/default_avatar.png', upload_to='profile_pics'),
        ),
    ]