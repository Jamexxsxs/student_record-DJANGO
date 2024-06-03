function v(comp){return $(`#${comp}`).val()}

$('#add-student-button').click(function(){
    var formData = new FormData()
    formData.append('profile', $('#image-upload')[0].files[0])
    formData.append('firstname', v('add-firstname'))
    formData.append('lastname', v('add-lastname'))
    formData.append('birthdate', formatDate(v('add-birthdate')))
    formData.append('email', v('add-email'))
    formData.append('number', v('add-number'))
    formData.append('address', v('add-address'))
    formData.append('college', v('college-select'))
    formData.append('course', v('course-select'))
    formData.append('year', v('add-year'))

    $.ajax({
        url: '/add_student/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response.success){
                $('#add-student-form')[0].reset();
                $('#image-preview').attr('src', '#').addClass('hidden');
                $('#college-select').val('');
                $('#course-select').val('').empty().append('<option value="" disabled selected>Select Course</option>');

                var student = JSON.parse(response.student);

                var newRow = '<tr>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student[0].pk + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student[0].fields.first_name + ' ' + student[0].fields.last_name + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student[0].fields.college + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student[0].fields.course + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student[0].fields.year + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student[0].fields.email + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + formatDate1(student[0].fields.enrollment_date) + '</td>' +
                        `<td class="px-4 py-2 border border-gray-200 text-center">
                            <button id="view-student-button" type="button" class="text-white px-4 py-2 rounded-md bg-blue-600" value=${student[0].pk}>View</button>
                        </td>` +
                    '</tr>';
                
                $('tbody').append(newRow);
            }
            else{
                alert('Error in Adding Student')
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    })
})

function formatDate(dateString) {
    const parts = dateString.split('-');
    const month = parts[1];
    const day = parts[2];
    const year = parts[0];
    return `${year}-${month}-${day}`;
}

function formatDate1(dateString){
    var date = new Date(dateString);

    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('en-US', options)
}

$("#searchButton").click(function() {
    var student_id = $('#search-input').val();

    var formData = new FormData();
    formData.append('student_id', student_id);

    $.ajax({
        url: '/search_student/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            if(response.success){
                var tableBody = $('tbody');
                tableBody.empty();

                var students = JSON.parse(response.students);
                

                students.forEach(function(student){
                    console.log(student)
                        var newRow = '<tr>' +
                            '<td class="px-4 py-2 border border-gray-200 text-center">' + student.pk + '</td>' +
                            '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.first_name + ' ' + student.fields.last_name + '</td>' +
                            '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.college + '</td>' +
                            '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.course + '</td>' +
                            '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.year + '</td>' +
                            '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.email + '</td>' +
                            '<td class="px-4 py-2 border border-gray-200 text-center">' + formatDate1(student.fields.enrollment_date) + '</td>' +
                            `<td class="px-4 py-2 border border-gray-200 text-center">
                                <button id="view-student-button" type="button" class="text-white px-4 py-2 rounded-md bg-blue-600" value=${student.pk}>View</button>
                            </td>` +
                        '</tr>';
                    
                    tableBody.append(newRow);
                });
            } else {
                alert('error');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    })
})

$("#college-filter, #course-filter, #year-filter").change(function(){
    var college = v('college-filter');
    var course = v('course-filter');
    var year = v('year-filter');

    var formData = new FormData();
    formData.append('college', college);
    formData.append('course', course);
    formData.append('year', year);

    $.ajax({
        url: /filter_student/,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            if (response.success){
                var tableBody = $('tbody');
                tableBody.empty();

                var students = JSON.parse(response.students);
                students.forEach(function(student) {
                    var newRow = '<tr>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student.pk + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.first_name + ' ' + student.fields.last_name + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.college + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.course + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.year + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + student.fields.email + '</td>' +
                        '<td class="px-4 py-2 border border-gray-200 text-center">' + formatDate1(student.fields.enrollment_date) + '</td>' +
                        `<td class="px-4 py-2 border border-gray-200 text-center">
                            <button id="view-student-button" type="button" class="text-white px-4 py-2 rounded-md bg-blue-600" value=${student.pk}>View</button>
                        </td>` +
                    '</tr>';

                    tableBody.append(newRow);
                });
            } else {
                alert('No students found');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
})

function formatDate1(dateString) {
    var date = new Date(dateString);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}