$(document).ready(function() {
    var add_courseSelect = $("#course-select");
    var add_collegeSelect = $("#college-select");
    var view_courseSelect = $("#course-filter");
    var view_collegeSelect = $("#college-filter");

    function add_college_selected() {
        populateCourses(add_collegeSelect, add_courseSelect, false);
    }

    function view_college_selected() {
        populateCourses(view_collegeSelect, view_courseSelect, true);
    }

    function getAllCourses() {
        var courses_CA = ["Bachelor of Science in Agriculture (BSA)", "Bachelor of Science in Agribusiness (BSAB)", "Bachelor of Science in Agricultural Technology (BSAT)"];
        var courses_CAS = ["Bachelor of Arts in English (AB English)", "Bachelor of Arts in Political Science (AB Political Science)", "Bachelor of Science in Mathematics (BS Mathematics)", "Bachelor of Science in Biology (BS Biology)", "Bachelor of Science in Psychology (BS Psychology)", "Bachelor of Science in Environmental Science (BS Environmental Science)"];
        var courses_CBM = ["Bachelor of Science in Business Administration (BSBA) major in Financial Management", "Bachelor of Science in Business Administration (BSBA) major in Marketing Management", "Bachelor of Science in Business Administration (BSBA) major in Human Resource Development Management", "Bachelor of Science in Business Administration (BSBA) major in Operations Management", "Bachelor of Science in Business Administration (BSBA) major in Business Economics", "Bachelor of Science in Entrepreneurship (BSE)", "Bachelor of Science in Accountancy (BSA)"];
        var courses_COE = ["Bachelor of Science in Civil Engineering (BSCE)", "Bachelor of Science in Electronics Engineering (BSECE)", "Bachelor of Science in Electrical Engineering (BSEE)", "Bachelor of Science in Mechanical Engineering (BSME)", "Bachelor of Science in Computer Engineering (BSCpE)"];
        var courses_CFOS = ["Bachelor of Science in Fisheries (BS Fisheries)", "Bachelor of Science in Marine Biology (BS Marine Biology)", "Bachelor of Science in Marine Transportation (BSMT)", "Bachelor of Science in Marine Engineering (BSMarE)"];
        var courses_CIT = ["Bachelor of Science in Industrial Education (BSIE)", "Bachelor of Science in Industrial Technology (BSIT) major in Automotive Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Electrical Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Electronics Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Food Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Garments Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Mechanical Technology"];
        var courses_CTE = ["Bachelor of Elementary Education (BEEd)", "Bachelor of Secondary Education (BSEd) major in English", "Bachelor of Secondary Education (BSEd) major in Mathematics", "Bachelor of Secondary Education (BSEd) major in Science", "Bachelor of Secondary Education (BSEd) major in Social Studies", "Bachelor of Secondary Education (BSEd) major in Filipino", "Bachelor of Secondary Education (BSEd) major in Values Education", "Bachelor of Science in Education (BSE)"];
        var courses_CN = ["Bachelor of Science in Nursing (BSN)"];
        var courses_CCJE = ["Bachelor of Science in Criminology (BSCrim)"];
        var courses_CVM = ["Doctor of Veterinary Medicine (DVM)"];
        var courses_CCICT = ["Bachelor of Science in Information Technology (BSIT)", "Bachelor of Science in Computer Science (BSCS)"];
        
        return courses_CA.concat(courses_CAS, courses_CBM, courses_COE, courses_CFOS, courses_CIT, courses_CTE, courses_CN, courses_CCJE, courses_CVM, courses_CCICT);
    }

    function populateCourses(collegeSelected, courseSelected, isFilter) {
        var selectedCollege = collegeSelected.val();
        var courses = [];

        if (isFilter) {
            courseSelected.html('<option value="all" selected>All</option>');
            courses = getAllCourses();
        } else {
            courseSelected.html('<option value="" disabled selected>Select Course</option>');
        }

        switch (selectedCollege) {
            case "CA":
                courses = ["Bachelor of Science in Agriculture (BSA)", "Bachelor of Science in Agribusiness (BSAB)", "Bachelor of Science in Agricultural Technology (BSAT)"];
                break;
            case "CAS":
                courses = ["Bachelor of Arts in English (AB English)", "Bachelor of Arts in Political Science (AB Political Science)", "Bachelor of Science in Mathematics (BS Mathematics)", "Bachelor of Science in Biology (BS Biology)", "Bachelor of Science in Psychology (BS Psychology)", "Bachelor of Science in Environmental Science (BS Environmental Science)"];
                break;
            case "CBM":
                courses = ["Bachelor of Science in Business Administration (BSBA) major in Financial Management", "Bachelor of Science in Business Administration (BSBA) major in Marketing Management", "Bachelor of Science in Business Administration (BSBA) major in Human Resource Development Management", "Bachelor of Science in Business Administration (BSBA) major in Operations Management", "Bachelor of Science in Business Administration (BSBA) major in Business Economics", "Bachelor of Science in Entrepreneurship (BSE)", "Bachelor of Science in Accountancy (BSA)"];
                break;
            case "COE":
                courses = ["Bachelor of Science in Civil Engineering (BSCE)", "Bachelor of Science in Electronics Engineering (BSECE)", "Bachelor of Science in Electrical Engineering (BSEE)", "Bachelor of Science in Mechanical Engineering (BSME)", "Bachelor of Science in Computer Engineering (BSCpE)"];
                break;
            case "CFOS":
                courses = ["Bachelor of Science in Fisheries (BS Fisheries)", "Bachelor of Science in Marine Biology (BS Marine Biology)", "Bachelor of Science in Marine Transportation (BSMT)", "Bachelor of Science in Marine Engineering (BSMarE)"];
                break;
            case "CIT":
                courses = ["Bachelor of Science in Industrial Education (BSIE)", "Bachelor of Science in Industrial Technology (BSIT) major in Automotive Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Electrical Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Electronics Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Food Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Garments Technology", "Bachelor of Science in Industrial Technology (BSIT) major in Mechanical Technology"];
                break;
            case "CTE":
                courses = ["Bachelor of Elementary Education (BEEd)", "Bachelor of Secondary Education (BSEd) major in English", "Bachelor of Secondary Education (BSEd) major in Mathematics", "Bachelor of Secondary Education (BSEd) major in Science", "Bachelor of Secondary Education (BSEd) major in Social Studies", "Bachelor of Secondary Education (BSEd) major in Filipino", "Bachelor of Secondary Education (BSEd) major in Values Education", "Bachelor of Science in Education (BSE)"];
                break;
            case "CN":
                courses = ["Bachelor of Science in Nursing (BSN)"];
                break;
            case "CCJE":
                courses = ["Bachelor of Science in Criminology (BSCrim)"];
                break;
            case "CVM":
                courses = ["Doctor of Veterinary Medicine (DVM)"];
                break;
            case "CCICT":
                courses = ["Bachelor of Science in Information Technology (BSIT)", "Bachelor of Science in Computer Science (BSCS)"];
                break;
        }

        $.each(courses, function(index, course) {
            courseSelected.append($("<option>", {
                value: course,
                text: course
            }));
        });
    }

    function showSection(sectionId) {
        $('#add-student, #view-students').addClass('hidden');
        $('#menu-add, #menu-view').removeClass('text-green-600 border-green-600');
    
        $('#' + sectionId).removeClass('hidden');
    
        if (sectionId === 'add-student') {
            $('#menu-add').addClass('text-green-600 border-green-600');
        } else {
            $('#menu-view').addClass('text-green-600 border-green-600');
        }
    }
    
    function previewImage(event) {
        var reader = new FileReader();
        reader.onload = function() {
            $('#image-preview').attr('src', reader.result).removeClass('hidden');
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    function scrollToViewSection() {
        console.log('hello')
        $('#view-students').scrollTop(0)
    }
    
    $('#college-select').change(add_college_selected);
    $('#college-filter').change(view_college_selected);

    $('#menu-add').click(function(){showSection('add-student')})
    $('#menu-view').click(function(){showSection('view-students')})
    $('#goUP').click(function(){scrollToViewSection()})
    
    $('#image-upload').change(function(event){previewImage(event)})
    add_collegeSelect.change(function(event){add_college_selected()})
    view_collegeSelect.change(function(event){view_college_selected()})

    add_collegeSelect.select2();
    add_courseSelect.select2();
    view_collegeSelect.select2();
    view_courseSelect.select2();
    $('#year-filter').select2();
    $('#add-year').select2();
})