$(document).ready(function() {

  $('#Container').mixItUp();

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-55372895-1', 'auto');
  ga('send', 'pageview');


var lastId,
    topMenu = $(".top-bar-section ul"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    }),
    noScrollAction = false;

menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    noScrollAction = true;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    },{
        duration: 300,
        complete: function() {
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=" + href +"]").parent().addClass("active");
            setTimeout(function(){ noScrollAction = false; }, 10);
        }
    });
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){

   if(!noScrollAction){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+topMenuHeight;
       
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";


       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active")
             .end().filter("[href=#"+id+"]").parent().addClass("active");
       }
   }    
});

$(".behance").hover(function(){
    $(this).attr("src", function(index, attr){
        return attr.replace(".png", "-hover.png");
    });
}, function(){
    $(this).attr("src", function(index, attr){
        return attr.replace("-hover.png", ".png");
    });
});

    $("#submit").click(function() { 
       
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields       
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
  
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ //if this field is empty 
            	if($('.results').children().length == 0 ) {            		
            		$(".results").append("<p class='error'>Please fill in all of the required fields.</p>");
            	}
                $(this).css('border','3px solid #3e96a2');  
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag              
            }   
        });
       
        if(proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            post_data = {
                'user_name'     : $('input[name=name]').val(), 
                'user_email'    : $('input[name=email]').val(), 
                'subject'       : $('input[name=subject]').val(), 
                'msg'           : $('textarea[name=message]').val()
            };
            
            //Ajax post data to server
            $.post('contact.php', post_data, function(response){  
                if(response.type == 'error'){ //load json data from server and output message     
                    output = '<p class="error">'+response.text+'</p>';
                }else{
                    output = '<p class="success">'+response.text+'</p>';
                    //reset values in all input fields
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val(''); 
                    $("#contact_form #contact_body").slideUp(); //hide form after success
                }
                $("#contact_form .results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() { 
        $(this).css('border',''); 
        $("#result").slideUp();
    });



$(".toggle-imprint" ).click(function() {
  $( ".imprint" ).slideToggle("slow");
});

// On document ready:



});