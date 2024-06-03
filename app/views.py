from django.shortcuts import render
from .models import Student
from django .views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.serializers import serialize
from django.db.models import Q


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

@csrf_exempt
def search_student(request):
    if request.method == 'POST':
        student_id = request.POST.get('student_id')
        
        if student_id == "":
            studentInfo = Student.objects.all();
        else:
            studentInfo = Student.objects.filter(student_id=student_id)
        
        if studentInfo.exists():
            student_info = serialize('json', studentInfo)
            return JsonResponse({'success': True, 'students': student_info})
        else:
            return JsonResponse ({'success': True, 'students':[]})
    return JsonResponse({'success': False})

@csrf_exempt
def filter_student(request):
    if request.method == 'POST':
        college = request.POST.get('college');
        course = request.POST.get('course');
        year = request.POST.get('year');
        
        print(college)
        print(course)
        print(year)
        
        if college == "null" or college == "all":
            college = ''
        if course == "null" or course == "all":
            course = ''
        if year == "null" or year == "all":
            year = 0
            
        

        students = Student.objects.all()

        # Apply filters based on provided values
        if college:
            students = students.filter(college__icontains=college)
        if course:
            students = students.filter(course__icontains=course)
        if year != 0:
            students = students.filter(year__exact=year)
        

        if students.exists():
            student_info = serialize('json', students)
            return JsonResponse({'success': True, 'students': student_info})
        else:
            return JsonResponse({'success': True, 'students': []})
    return JsonResponse({'success': False})