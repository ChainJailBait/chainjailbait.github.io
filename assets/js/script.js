(function()){
	$function
var $myInput=$('#myInput');
var $myOutput=$('#myOutput');

//Binding the Keypress Handler to the Input
$myInput.on('keyup',function(e){
  var myText=$(this).val();
  printToOutput(myText);
          });

//Show the typed text in a div
function printToOutput(textToOutput){
  if(typeof textToOutput === "undefined" || textToOutput =='')
  {
    
    textToOutput='awaiting input';
  }
  
  $myOutput.text(textToOutput);
  
}

printToOutput();

});
})();