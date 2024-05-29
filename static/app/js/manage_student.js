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
                alert('Student Successfully Added')
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