

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

    });

    $(".container").on("click", ".destroy", function (event) {
      event.preventDefault();
      var itemId = $(this).closest("p").data("itemid");
      console.log(itemId);
      todos.deleteItem(itemId);
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
