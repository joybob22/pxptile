var phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
var emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

//fancy scrolling functionality

$.fn.moveIt = function(){
    var $window = $(window);
    var instances = [];
    
    $(this).each(function(){
      instances.push(new moveItItem($(this)));
    });
    
    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      instances.forEach(function(inst){
        inst.update(scrollTop);
      });
    }, {passive: true});
  }
  
  var moveItItem = function(el){
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
  };
  
  moveItItem.prototype.update = function(scrollTop){
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
  };
  
  // Initialization
  $(function(){
    $('[data-scroll-speed]').moveIt();
  });

  //Get current year
  var date = new Date();
  var year = date.getFullYear();
  $("#year").text(year);

  //form validation and http request
  $("#SubmitButton").on("click", function(){

    function inputError(whichInput) {
      $(`#${whichInput}Border`).css("background-color", "red");
      $(`#${whichInput}Border`).css("width", "100%");
      $(`#${whichInput}`).keypress(function() {
        $(`#${whichInput}Border`).css("background-color", "white");
        $(`#${whichInput}Border`).css("width", "10%");
      })
    }

    $("#Message").text("Processing...");
    var data = {
      firstName: $("#FirstName").val(),
      lastName: $("#LastName").val(),
      phoneNumber: $("#PhoneNumber").val(),
      email: $("#Email").val(),
      content: $("#Content").val()
    }

    if(!data.firstName) {
      $("#Message").text("");
      $("#ErrorMessage").text("Please enter your first name");
      inputError("FirstName");
    }
    else if(!data.lastName) {
      $("#Message").text("");
      $('#ErrorMessage').text("Please enter your last name");
      inputError("LastName");
    }
    else if(!data.phoneNumber) {
      $("#Message").text("");
      $("#ErrorMessage").text("Please enter your phone number");
      inputError("PhoneNumber");
    }
    else if(!phoneRegEx.test(data.phoneNumber)) {
      $("#Message").text("");
      $("#ErrorMessage").text("Please enter a valid phone number");
      inputError("PhoneNumber");
    }
    else if(!data.email) {
      $("#Message").text("");
      $("#ErrorMessage").text("Please enter your email");
      inputError("Email");
    }
    else if(!emailRegEx.test(data.email)) {
      $("#Message").text("");
      $("#ErrorMessage").text("Please enter a valid email");
      inputError("Email");
    }
    else if(!data.content) {
      $("#Message").text("");
      $("#ErrorMessage").text("Please tell us what you would like to contact us about");
      $("#Content").css("border", "1px solid red");
      $("#Content").keypress(function() {
        $("#Content").css("border", "1px solid white");
      })
    } else {
      $("#ErrorMessage").text("");
      data.content = "Name: " + data.firstName + " " + data.lastName + "\nPhone Number: " + data.phoneNumber + "\nEmail: " + data.email + "\n\n" + data.content;

      // $.post("http://localhost:3000/sendEmail", data, (data, status) => {
      //   if(data == "success") {
      //     $("#Message").text("Email sent! We will contact you soon.");
      //   } else {
      //     $("#Message").text("There was an unknown error. Refresh the page and try again");
      //     console.log(data);
      //   }
      // })
      $.post("http://localhost:3000/sendEmail", data).done(function(msg) {
        $("#Message").text("");
        $("#SuccessMessage").text("Email sent! We will contact you soon.");
      }).fail(function(xhr, status, error) {
        $("#Message").text("Unknown Error. Refresh the page and try again.");
        console.log("xhr:", xhr, "\nstatus:", status, "\nerror:", error);
      })
    }

    

  })