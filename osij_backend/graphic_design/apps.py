from django.apps import AppConfig


class GraphicDesignConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "graphic_design"

    def ready(self):
        import graphic_design.signals
