# Generated by Django 2.2.7 on 2019-12-01 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20191201_1835'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='avatar',
            field=models.ImageField(blank=True, default='default.png', upload_to='profile_pic'),
        ),
    ]
