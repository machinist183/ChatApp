# Generated by Django 4.2.5 on 2023-09-28 20:22

import account.validators
from django.db import migrations, models
import django.db.models.deletion
import groups.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("webchat", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Group",
            fields=[
                (
                    "group_name",
                    models.CharField(
                        max_length=20, primary_key=True, serialize=False, unique=True
                    ),
                ),
                (
                    "group_icon_pic",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=groups.models.icon_pic_upload_path,
                        validators=[account.validators.validate_image_file_exstension],
                    ),
                ),
                (
                    "group_cover_pic",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=groups.models.cover_pic_upload_path,
                        validators=[account.validators.validate_image_file_exstension],
                    ),
                ),
                ("info", models.TextField(blank=True, max_length=1000, null=True)),
                ("vibe", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "conversation",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="webchat.conversation",
                    ),
                ),
            ],
        ),
    ]
