from django.contrib import admin
from .models import Student

# Register your models here.
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'first_name', 'last_name', 'date_of_birth', 'email', 'mobile_number', 'address', 'enrollment_date', 'course', 'college', 'year', 'profile')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('college', 'course', 'year')
    ordering = ('student_id',)

    fieldsets = (
        (None, {
            'fields': ('student_id', 'first_name', 'last_name', 'date_of_birth', 'email', 'mobile_number', 'address', 'enrollment_date', 'course', 'college', 'year', 'profile')
        }),
    )
    readonly_fields = ('student_id', 'enrollment_date')