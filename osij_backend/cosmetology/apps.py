from django.apps import AppConfig

class CosmetologyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cosmetology'

    def ready(self):
        import cosmetology.signals