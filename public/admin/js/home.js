(function() {
  'use strict';

  var menu = {};
  $(document).ready(function() {
    $('#menuCreation').submit(function() {
      // get all the inputs into an array.
      var $input = $('#menuCreation :input')[0];
      if ($input.name == "Category")
      {
        menu.categories.add($input.val());
        $input.replaceWith()
      }
      /*var values = {};
      $inputs.each(function() {
          values[this.name] = $(this).val();
      });*/

    });
  });

}());
