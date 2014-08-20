var itemsTmpl = [
  "<% _.each(items, function(element, index, list) { %>",
  "<p data-itemid=\"<%= element._id %>\">",
  "<input type=\"text\" class=\"item\" placeholder=\" <%= element.content %> \" />",
  "<button class=\"destroy\">Delete</button>",
  "</p>",
  "<% }); %>"
].join("\n");
