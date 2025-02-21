from django.contrib import admin
from .models import GeneratedContent

# Register your models here.
@admin.register(GeneratedContent)
class GeneratedContentAdmin(admin.ModelAdmin):
    list_display = ('user', 'prompt', 'response', 'created_at')
    search_fields = ('user__username', 'prompt', 'response')
    list_filter = ('created_at',)

