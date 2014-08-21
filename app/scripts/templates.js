var itemsTmpl = [
  "<% _.each(items, function(element, index, list) { %>",
  "<div class=\"itemWrapper active\">",
  "<div class=\"itemContainer \" data-itemid=\"<%= element._id %>\">",
  "<i class=\"fa fa-check status\"></i>",
  "<p class=\"itemText\">",
  "<%= element.content %>",
  "</p>",
  "<button class=\"destroy\">Delete</button>",
  "</div>",
  "<div class=\"updateContainer hide\">",
  "<form action=\"\" class=\"update\">",
  "<input type=\"text\" class=\"updateEntry\" placeholder=\"<%= element.content %>\" />",
  "</form>",
  "</div>",
  "</div>",
  "<% }); %>"
].join("\n");
