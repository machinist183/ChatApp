# Generated by Django 4.2.5 on 2023-09-28 20:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("webchat", "0001_initial"),
        ("groups", "0002_group_owner"),
    ]

    operations = [
        migrations.AlterField(
            model_name="group",
            name="conversation",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.DO_NOTHING,
                to="webchat.conversation",
            ),
        ),
        migrations.AlterField(
            model_name="group",
            name="owner",
            field=models.ForeignKey(
                default=51,
                on_delete=django.db.models.deletion.DO_NOTHING,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]