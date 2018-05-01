$(function() {
  // on click that handles the 'devour it' buttons
  // if there is no guest name the user will be alerted to fill in one
  $('.eat-burger').on('click', function(event) {
    let name = $('#guest-name').val().trim();
    if (name.length === 0 || name === null) {
      alert('Please fill in a guest name');
    } else {
      console.log(name);
    }
  });

  // on click that handles the submit button that makes new burgers
  $('.create-form').on('submit', function(event) {
    event.preventDefault();
    if ($('#burger-name').val().length === 0) {
      alert('Fill in a burger!');
    } else {
      let newBurger = {
        burger_name: $('#burger-name').val().trim(),
        devoured: 0
      };
      console.log(newBurger);
      $.post('/api/burgers', newBurger)
        .then(function() {
          console.log('created new burger');  
        }
      );
      location.reload();
      $('#burger-name').val('');
    }
  });
});