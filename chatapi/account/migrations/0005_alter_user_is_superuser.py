# Generated by Django 4.2.5 on 2023-09-26 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0004_user_groups_user_is_superuser_user_user_permissions"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]
