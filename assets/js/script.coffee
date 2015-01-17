$ ->
  $myInput= $('#myInput')
  $myOutput= $('#myOutput')
  
  $myInput.on 'keyup', (e) ->
    printToOutput $(this).val()
    return

  printToOutput= (textToOutput='awaiting input') ->
    
    textToOutput='awaiting input' if textToOutput==''
    
    $myOutput.text textToOutput
    return

  printToOutput()
  return