# Generated by Django 4.2.5 on 2023-09-26 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0002_alter_user_username"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="user",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
    ]
