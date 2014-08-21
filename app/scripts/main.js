

$(document).ready(function(){

  todos.init();

});

var todos = {

  url: "http://tiy-fee-rest.herokuapp.com/collections/rphuberdolist",

  init: function () {
    console.log('in the init function');
    this.initEvents();
    this.initStyling();
  },

  initStyling: function(){
    todos.getItems();
  },

  initEvents: function(){

    console.log('in the initEvents function')

    $(".listContainer").on("submit", ".submit", function (event) {

      event.preventDefault();
      console.log('you clicked me');
      var newItem = {
        content: $(".todoEntry").val(),
      };
      todos.createItem(newItem);
      $('.todoEntry').val('');

    });

    $(".container").on("click", ".destroy", function (event) {

      event.preventDefault();
      var itemId = $(this).closest("div").data("itemid");
      console.log(itemId);
      todos.deleteItem(itemId);

    });

    $(".container").on("dblclick", ".itemText", function (event) {

      event.preventDefault();
      $(this).closest('.itemContainer').addClass('hide');
      $(this).closest('.itemWrapper').find('.updateContainer').removeClass('hide');

    });

    $(".container").on("submit", ".update", function (event) {

      event.preventDefault();
      var itemId = $(this).closest(".itemWrapper").find('.itemContainer').data("itemid");
      var updatedItem = {
        content:$(this).find(".updateEntry").val(),
      };
      console.log(itemId);
      console.log(updatedItem);
      todos.updateItem(itemId, updatedItem);

    $(this).closest(".updateContainer").addClass("hide");
    $(this).closest(".itemWrapper").find(".itemContainer").removeClass('hide');

    });

    $(".container").on('click', '.status', function(event){
      event.preventDefault();
      $(this).closest('.itemWrapper').toggleClass('completed').toggleClass('active');

    });

    $(".container").on('click', '.all', function(event){

      event.preventDefault();
      $(this).closest('.container').find('.itemWrapper').removeClass('hide');
    });

    $(".container").on('click', '.showActive', function(event){

      event.preventDefault();
      $(this).closest('.container').find('.itemWrapper').removeClass('hide');
      $(this).closest('.container').find('.completed').addClass('hide');
    });

    $(".container").on('click', '.showComplete', function(event){

      event.preventDefault();
      $(this).closest('.container').find('.itemWrapper').removeClass('hide');
      $(this).closest('.container').find('.active').addClass('hide');
    });

  },

  render: function(template, data, $el){
    var markup = _.template(template, data);

    $el.html(markup);
  },

  getItems: function(){

    $.ajax({
      url: todos.url,
      type: 'GET',
      success: function (response) {
        var items = window.items = response;
        todos.render(itemsTmpl, items, $(".itemList"));
      }
    });
  },

  createItem: function(newItem){

    $.ajax({
      url: todos.url,
      data: newItem,
      type: 'POST',
      success: function (response) {
        todos.getItems();
      }
    });
  },

  deleteItem: function(itemId){

    $.ajax({
      url: todos.url + "/" + itemId,
      type: 'DELETE',
      success: function (response) {
        todos.getItems();
      }

    });
  },

  updateItem: function (itemId, updatedItem) {

    $.ajax({
      url: todos.url + "/" + itemId,
      type: 'PUT',
      data: updatedItem,
      success: function (response) {
        todos.getItems();
      }
    });
  }

};
