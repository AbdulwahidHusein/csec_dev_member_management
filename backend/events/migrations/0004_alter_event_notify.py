# Generated by Django 4.2.7 on 2023-11-24 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_event_notify'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='notify',
            field=models.BooleanField(default=True),
        ),
    ]
