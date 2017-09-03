
this["pt"] = this["pt"] || {};
this["pt"]["templates"] = this["pt"]["templates"] || {};

this["pt"]["templates"]["cal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"day-header\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "\r\n                <div class=\""
    + alias2(alias1((depth0 != null ? depth0.classes : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.day : depth0), depth0))
    + "</div>\r\n\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "\r\n    <div class=\"controls\">\r\n        <span class=\"clndr-previous-button\"> << </span>\r\n        <span class=\"month\">"
    + alias2(alias1((depth0 != null ? depth0.month : depth0), depth0))
    + "</span>\r\n        <span class=\"year\">"
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "</span>\r\n        <span class=\"clndr-next-button\"> >> </span>\r\n    </div>\r\n    <div class=\"days-container\">\r\n        <div class=\"days\">\r\n            <div class=\"headers\">\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.daysOfTheWeek : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.days : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n";
},"useData":true});

this["pt"]["templates"]["chooseImg"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <li> <img class=\"iconImg img-circle\" src="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ">  </li>\r\n\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"chooseIcon page hidden\">\r\n    <ul id=\"light-slider\">\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.icon : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </ul>\r\n\r\n\r\n    <input type=\"button\" class=\"nextBt2 btn\"> next</inputbutton>\r\n\r\n</div>";
},"useData":true});

this["pt"]["templates"]["home"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "\r\n    <div class=\"container-fluid\">\r\n\r\n        <div class=\"row\">\r\n\r\n\r\n            <div class=\"col-lg-5\">\r\n                <div class=\"media\">\r\n                    <a class=\"center\" href=\"#\">\r\n                        <img class=\"media-object dp img-circle\" src=\"/images/icons/horse1.png\" style=\"width: 100px;height:100px;\">\r\n                    </a>\r\n                    <i class=\"fa fa-times\" aria-hidden=\"true\" id=\"removeHorse\"> </i>\r\n                    <div class=\"media-body\">\r\n                        <h1 class=\"media-heading\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + " </h1>\r\n                        <h5>Innriktning :  "
    + alias2(alias1((depth0 != null ? depth0.type : depth0), depth0))
    + " Ålder : "
    + alias2(alias1((depth0 != null ? depth0.age : depth0), depth0))
    + " <a href=\"/userPlan/"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">Se Plannering här</a></h5>\r\n                        <hr style=\"margin:8px auto\">\r\n\r\n\r\n                        <h3> Lägg till</h3>\r\n\r\n                        <h5> Hovslagare Träningspass Ny Häst</h5>\r\n                        <button type=\"submit\" class=\"hovslagare\" ><img src=\"/images/icons/hovslagare.png\" alt=\"Submit\" class=\"iconToBtn\" style=\"height:100px;width:100px;\"></button>\r\n\r\n                        <button type=\"submit\" id =\"addTraningBtn\" class=\"addTraning\" >\r\n                            <!--for prod <a href=\"http://207.154.212.5:3000/addTraning/"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\"> -->\r\n                            <a href=\"/addTraning/"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">\r\n                                <img src=\"/images/icons/addTraning.png\" alt=\"Submit\" class=\"iconToBtn\" style=\"height:100px;width:100px;\">\r\n                            </a>\r\n                        </button>\r\n\r\n\r\n                        <button type=\"submit\" id =\"addTraningBtn\" class=\"addTraning\" >\r\n                            <a href=\"/addPlan/"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">\r\n                                <img src=\"/images/icons/add.png\" alt=\"Submit\" class=\"iconToBtn\" style=\"height:100px;width:100px;\">\r\n                            </a>\r\n                        </button>\r\n\r\n\r\n\r\n\r\n\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n\r\n\r\n\r\n        </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n    <div class=\"card-deck\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.tranings : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n    </div>\r\n\r\n\r\n\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <div class=\"card\" style=\"width: 100rem;>\r\n                        <img class=\"card-img-top\" src=\""
    + alias2(alias1((depth0 != null ? depth0.icon : depth0), depth0))
    + "\" alt=\"Card image cap\">\r\n            <div class=\"card-block\">\r\n\r\n                <i class=\"fa fa-times\" aria-hidden=\"true\" id=\"removeTraning\"> </i>\r\n\r\n                <h5 class=\"card-title\">"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "</h5>\r\n\r\n            <p class=\"card-text\"> "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\r\n\r\n\r\n\r\n                <p class=\"card-text\"><small class=\"text-muted\">Detta är footer visa totalen här?</small></p>\r\n            </div>\r\n        </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "  ";
},"4":function(container,depth0,helpers,partials,data) {
    return "\r\n                    <h3> "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + " </h3>";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "\r\n                    <strong> "
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + ":</strong> "
    + alias1(container.lambda(depth0, depth0))
    + "  ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "Välkomen "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + " ! <br> <br>\r\n\r\n\r\n\r\n\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.horses : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});