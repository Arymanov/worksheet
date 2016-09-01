
var currentItem = 1;
//navigation
    
function showPage( pageID ){     
    $('article').animate({left: '-100%'},0);
    $("article[ data-id = " +pageID+"] ").stop().animate({'left' : 0});
    currentItem = pageID;
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function isEmptyInput(field){
    if (field.trim() === '') return false;
    return true;
}


 //get next page

function next(){
    $("article[ data-id = " + currentItem +"] ").animate({'left' : '-100%'});
        
    var prev = ++currentItem;
        
    $("article[ data-id = " + prev +"] ").animate({'left' : 0});
};

function inputColor(elem1,elem2,elem3,colorBorder,visibleProp){
    $(elem3).css({'border-color':colorBorder});
    $(elem1).css({'border-color':colorBorder});
    $(elem2).css({'visibility':visibleProp});
} 

function pages(n){
    $('.nav__numb:eq('+ n + ')').css({'color':'#ff9800'});
    $('.nav__numb:eq('+ (n+1) +')').css({'color':'black','pointer-events':'auto'});
}

function check1(){
    if(isEmptyInput($('#name_field').val()) === true && isValidEmailAddress($("#email").val()) === true){
        
        return true;
    }else if(isEmptyInput($('#name_field').val()) === false && isValidEmailAddress($("#email").val()) === false){
        inputColor('#name_field','.email-mod','#email','#ff0000','visible');
        
    }else if(isValidEmailAddress($("#email").val()) === false){
        inputColor('','.email-mod:eq(1)','#email','#ff0000','visible');
        
    }else if(isEmptyInput($('#name_field').val()) === false){
        inputColor('#name_field','.email-mod:eq(0)','','#ff0000','visible');
        
    }
}

function check2(){
    if(isEmptyInput(inputCities) === false || citiesCase.indexOf(inputCities.toLowerCase()) == -1){
        inputColor('#cities_list','.email-mod:eq(3)','','#ff0000','visible');   
    }else if(isEmptyInput(inputCountries) === false || countriesCase.indexOf(inputCountries.toLowerCase()) == -1){
        inputColor('','.email-mod:eq(2)','#countries_list','#ff0000','visible'); 
    }else if(isEmptyInput(inputCountries) === false && isEmptyInput(inputCities) === false || countriesCase.indexOf(inputCountries.toLowerCase()) == -1 && citiesCase.indexOf(inputCities.toLowerCase()) ){
        inputColor('#cities_list','.email-mod','#countries_list','#ff0000','visible');
        
    }else if(countriesCase.indexOf(inputCountries.toLowerCase()) != -1 && citiesCase.indexOf(inputCities.toLowerCase()) != -1){
        return true;
    }
}

function check3(){

    for(var i = 0;i < arr.length;i++){

        if(!isEmptyInput($('.name__field:eq('+ arr[i] + ')').val())){
            $('.name__field:eq('+ arr[i] + ')').css({'border-color':'#ff0000'});
            return;
        }
        
    }

    return true;
}

showPage(1);

$('.nav a').click(function(){
    showPage( $(this).attr('data-name') ); 
});

//button to get previous page

$('.previous').click(function() {           
    $("article[ data-id = " + currentItem +"] ").animate({'left' : '-100%'});
    var prev = --currentItem;
    $("article[ data-id = " + prev +"] ").animate({'left' : 0});
});
 
//cancel the warning

$('#name_field').click(function(){
    inputColor('#email','.email-mod',this,'transparent','hidden');
    
});

$('#email').click(function(){
    inputColor('#name_field','.email-mod',this,'transparent','hidden');
});     


//checking accuracy of the name and e-mail

$('#name__first').click(function() {
    if(check1()){
        next();
        pages(0);
    }

});

//cancel the warning

$('#countries_list').click(function(){
    inputColor('#cities_list','.email-mod',this,'transparent','hidden');
});

$('#cities_list').click(function(){
    inputColor('#countries_list','.email-mod',this,'transparent','hidden');
});

//checking accuracy of the city and country

$('#name__second').click(function() {

    if(check2()){
        next();
        pages(1);
    }
});

var socialInput;
var index;
var a;
var arr = [];



$("input[type = 'checkbox']").click(function(){
    index = $(this).index("input[type = 'checkbox']");

    //checking which checkboxes are chosen

    if($(this).is(":checked")){
        $('.name__field:eq('+ index + ')').css({'visibility':'visible'});
        
        
        arr.push(index);
       
       // positioning info about social pages in the final page
        $('<p/>', {
            class: 'result_soc',
            text: ''+$('.name__field:eq('+index +')').attr('name')+':'
            
            
        }).appendTo('.result_wrapper');
        
    }else{
        $('.name__field:eq('+ index + ')').css({'visibility':'hidden'});
        $('.name__field:eq('+ index + ')').val('');
        $('.result_soc:eq('+ index +')').remove();
        var deleteIndex = arr.indexOf(index);
        arr.splice(deleteIndex,1);
    
    };
});

// cancel warning

$('.name__field').click(function(){
    $(this).css({'border-color':'transparent'});
})

// moving to the fourth page

$('#name__third').click(function() {
    if(check3()){
        next();
        pages(2);
    }
});

//taking the url of the background-image

var bg;
$('.photo__cat').click(function(){
    $('.name-mod').css({'visibility':'hidden'});

    $('.photo__cat').css({'border-color':'transparent'});
    $(this).css({'border':'3px solid #ff9800'});
    bg = $(this).css('background-image');
    bg = bg.replace('url(','').replace(')','');
    
});

$('.photo__cat:eq(3)').click(function(){$('.name-mod').css({'visibility':'visible'});});

//sending info to the final page

$('#name__fourth').click(function() {
    if(!check1()){
        check1();
        showPage(1);
    }else if(!check2()){
        check2();
        showPage(2);
    }else if(!check3()){
        check3();
        showPage(3);
    }else if( $('.name-mod').css('visibility') !== 'visible' && bg !== undefined && check1()){
        $.each(arr,function(index,value){
            $('.result_soc:eq('+ index + ')').append("<span>"+ $('.name__field:eq('+value +')').val() + "<span>");
            if($('.name__field:eq('+value +')').val() == ''){
                $('.result_soc:eq('+ index + ')').hide();
            }
        });
        $('nav').hide();
        $('.result_name').html(($('#name_field').val()).trim());
        $('.result_mail').html($('#email').val());
        $('.result_address').html(inputCities + ','+ inputCountries);
        $('.result_img').css({'background-image':'url('+ bg +')'});
        
        next();
    }
    
});

//take the test again

$('#result').click(function(){

    $('input').val('');
    $('#countries').empty();
    for(var i = 0; i< checkCountries.length;i++){
        $('#countries').append('<option value="' + checkCountries[i] + '">' + checkCountries[i] + '</option>'); 
    }
    $('#cities').empty();
    for(var i = 0; i <checkCities.length; i++){
        $('#cities').append('<option value="' + checkCities[i] + '">' + checkCities[i] + '</option>');      
    } 
    
    $('.nav__numb').css({'color':'#bbbbbb','pointer-events':'none'});
    $('.nav__numb:eq(0)').css({'color':'black','pointer-events':'auto'});
    $('.photo__cat').css({'border-color':'transparent'});
    $('nav').show();
    $("input[type='checkbox']").attr('checked', false);
    $('.name__field').css({'visibility':'hidden'});
    $('.result_soc').remove();
    inputCities = '';
    inputCountries = '';
    showPage(1);
})


var dataObj,
    countryObj,
    countryCode,
    inputCountries = '', 
    countriesCase = [],
    citiesCase = [];

    //input of the countries
document.getElementById('countries_list').addEventListener('input', function () {

    $('#cities').empty();
    
    inputCountries = $(this).val();
    $.each(countryObj,function(key,val){
        if(val.toLowerCase() == inputCountries.toLowerCase()) countryCode = key;

    });//countryKey
    
    for(var i=0;i <checkCountries.length; i++){
        countriesCase.push(checkCountries[i].toLowerCase());
    }
    
    
    if(countriesCase.indexOf(inputCountries.toLowerCase()) != -1){  
        for(var i = 0; i <cities[countryCode - 1].length; i++){

            $('#cities').append('<option value="' + cities[countryCode-1][i] + '">' + cities[countryCode-1][i] + '</option>');      
        } 
    }//show cities of the country

    if(inputCountries == ''){
        for(var i = 0; i <checkCities.length; i++){

            $('#cities').append('<option value="' + checkCities[i] + '">' + checkCities[i] + '</option>');      
        } 
    }
    
});
var inputCities = '';

//input of the cities

document.getElementById('cities_list').addEventListener('input', function () {
    
    $('#countries').empty();
    
    inputCities = $(this).val();
    $.each(dataObj,function(key,val){
        if(val.name.toLowerCase() == inputCities.toLowerCase()) {
            countryCode = val.country;
        }
    });

    for(var i=0;i <checkCities.length; i++){
        citiesCase.push(checkCities[i].toLowerCase());
    } 

    

    for(var i = 0; i< checkCountries.length;i++){
        if( i+1 == countryCode){
            $('#countries').append('<option value="' + checkCountries[i] + '">' + checkCountries[i] + '</option>'); 
        }
    }//show countries of this city

    
    

    if(inputCities == ''){
        $('#countries').empty();
        for(var i = 0; i< checkCountries.length;i++){
            $('#countries').append('<option value="' + checkCountries[i] + '">' + checkCountries[i] + '</option>'); 
        }
    }
    
});

var cities,
    numberOfCities,
    checkCountries = [],
    cityCode,
    checkCities = [];
//getting info from JSON
function insertJSON(countryPath,cityPath){

    $.getJSON(countryPath, function (data) {
        countryObj = data;
        numberOfCities = new Array(countryObj.length);
        cities = new Array(10);//making two dimensional array of countries and cities
        var ind = 0;
        for(key in countryObj){
            numberOfCities[ind++] = 0;
        }
        
        $.each(countryObj, function(key, val) {
            
            $('#countries').append('<option value="' + val + '">' + val + '</option>');
           checkCountries.push(val);
        });
    });
    
    $.getJSON(cityPath, function (data) {
        dataObj = data;
        
        $.each(dataObj,function(key,val){
            numberOfCities[val.country - 1]++;
        });
        
        for(var i =0; i <cities.length; i++){
            var j = 0;
            cities[i] = new Array(numberOfCities[i]);
            $.each(dataObj,function(key,val){
                if(val.country == i+1){
                    cities[i][j++] = val.name;
                }
            });
            
        }

        $.each(dataObj, function(key, val) {
            
            $('#cities').append('<option value="' + val.name + '">' + val.name + '</option>');
           checkCities.push(val.name);       
        });
    });  
}
insertJSON('data/countries.json','data/cities.json');  
    