# Generated by Django 4.2.5 on 2023-09-28 06:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0006_remove_userprofile_is_premium_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="userprofile",
            name="id",
        ),
        migrations.AlterField(
            model_name="userprofile",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                serialize=False,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
