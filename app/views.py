from django.shortcuts import render
from .models import Student
from django .views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.serializers import serialize

# Create your views here.
def index(request):
    students = Student.objects.all()
    
    return render(request, 'index.html', {'students': students})

@csrf_exempt
def add_student(request):
    if request.method == 'POST':
        first_name = request.POST.get('firstname')
        last_name = request.POST.get('lastname')
        date_of_birth = request.POST.get('birthdate')
        email = request.POST.get('email')
        mobile_number = request.POST.get('number')
        address = request.POST.get('address')
        course = request.POST.get('course')
        college = request.POST.get('college')
        year = request.POST.get('year')
        profile = request.FILES.get('profile')
        
        student = Student(
            first_name = first_name,
            last_name = last_name,
            date_of_birth = date_of_birth,
            email = email,
            mobile_number = mobile_number,
            address = address,
            course = course,
            college = college,
            year = year,
            profile = profile
        )
        student.save()
        
        getStudent = Student.objects.get(email = email)
        
        getStudent = serialize('json', [getStudent])
        
        return JsonResponse({'success': True, 'student': getStudent})
    return JsonResponse({'success': False})