# Generated by Django 4.2.5 on 2023-10-17 17:58

import account.validators
from django.db import migrations, models
import groups.models


class Migration(migrations.Migration):

    dependencies = [
        ("groups", "0004_alter_group_conversation"),
    ]

    operations = [
        migrations.AlterField(
            model_name="group",
            name="group_icon_pic",
            field=models.ImageField(
                blank=True,
                default="group\\group_icons\\default_icon.jpg",
                upload_to=groups.models.icon_pic_upload_path,
                validators=[account.validators.validate_image_file_exstension],
            ),
        ),
    ]
