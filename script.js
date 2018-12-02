$(document).ready(function() {
    
    var options;
    
    $.ajax ({
        dataType: "json",
        url: "./options.json",
        success: function(data) {
            options = data; 
            loadOptions ();
        }
    });
    
    function loadOptions (){
        
        var steps = $("form").children(".step"); 
        $(steps[0]).show();
        var current_step = 0; 

        $("button.next").click(function(){	
            changeColor(current_step);
            if($(steps[current_step]).find('input:invalid').length <= ''){
                if (current_step == steps.length-2) { 
                    $(this).hide(); 
                    $("form button.finish").show(); 
                }
                $("button.back").show(); 
                current_step++; 
                changeStep(current_step); 
            };
        });

        $("button.back").click(function(){	
            if (current_step == 1) { 
                $(this).hide(); 
            }
            $("form button.finish").hide(); 
            $("button.next").show(); 
            current_step--; 
            changeStep(current_step);
        });
        
        $("button.finish").click(function(){	
            changeColor(current_step);
            if($(steps[current_step]).find('input:invalid').length <= ''){
            
                var data = {};
                    $('form').find ('input, textearea, select').each(function(){
                        data[$(this).attr('id')] = $(this).val();  
                    });
                    console.log(data);
                $("form").hide(); 
                $(".message").show(); 
            };
        });    

        function changeStep(i) { 
            $(steps).hide(); 
            $(steps[i]).show(); 
            $(".step").trigger('show');
        }

        function changeColor(i){
            $(steps[i]).find("input:invalid").addClass("border-danger");
            $(steps[i]).find("input:valid").removeClass("border-danger");       
        };
        
        $(".step").on('show', function() {
            if($("#make").is(":visible")) {
                loadMakes();
            }
        });   
        
        $("#make").change(function(){
            var make = $(this).val();
            loadModels(make);
            $("#model").change();
        });
        
        $("#model").change(function(){
            var make = $("#make").val();
            var model = $(this).val();
            loadYears(make,model);
        });
        
        function loadMakes(){  
            var makes = "";
            for (make in options) {
                makes += '<option value="' + make + '">' + make +'</option>';
            }
            $("#make").html(makes).change();
        };
        
        function loadModels(make){  
            var models = "";
            for (model in options[make]) {
                models += '<option value="' + model + '">' + model +'</option>'  
            }
            $("#model").html(models);
        };
        
        function loadYears(make,model){
            var years = "";
            for (year in options[make][model]) {
                years += '<option value="' + year + '">' + options[make][model][year] + '</option>'  
            }
            $("#year").html(years);    
        };
    };
});