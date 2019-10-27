$(function() {

  function taskHTML(task){
    var checkedStatus = task.done ? "checked" : "";
    var liClass = task.done ? "completed" : "";
    var liElement = '<li id= "' + task.id + '" class="' + liClass + '"><div class="view"><input class="toggle" type="checkbox"' + 
      " data-id='" + task.id + "'" + checkedStatus +
      '><label>' + 
        task.title +
        ' <br /> ' +
        task.description +
        '</label></div></li>';

      return liElement;
  }

  function toggleTask(e) {
      var itemID = $(e.target).data("id");
      var doneValue = Boolean($(e.target).is(':checked'));

      $.post("/tasks/" + itemID, {
        _method: "PUT",    
        task: {
          done: doneValue
        }
      }).success(function(data) {
        var liHTML = taskHTML(data);
        var $li = $("#" + data.id);
        $li.replaceWith(liHTML);
        $('.toggle').change(toggleTask);
      } );
    }

  $.get("/tasks").success( function ( data ) {
    var htmlString = "";

    $.each(data, function(index, task) {
      htmlString += taskHTML(task);
    });

    var ulTodos = $('.todo-list');
    ulTodos.html(htmlString);

    $('.toggle').change(toggleTask);
  });

  $('#new-form').submit(function(event) {
    event.preventDefault();
    var titlebox = $('.new-todo-title');
    var descripbox = $('.new-todo-description');
    var payload = {
      task: {
        title: titlebox.val(),
        description: descripbox.val()
      }
    };

    $.post("/tasks", payload).success(function(data) {
      var htmlString = taskHTML(data);
      var ulTodos = $('.todo-list');
      ulTodos.append(htmlString);
      $('.toggle').click(toggleTask);
      $('.new-todo-title').val('');
      $('.new-todo-description').val('');
    });
  });
});