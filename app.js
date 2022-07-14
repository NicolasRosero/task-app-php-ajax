$(function() {
  let edit = false;
  getTask();
  // Section search
  $('#search').keyup(function(e) {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        type: "POST",
        url: "servers/taskSearchServer.php",
        data: { search },
        success: function (resp) {
          let templateTask = '';
          let tasks = JSON.parse(resp);
          if(tasks.length != 0) {
            tasks.forEach(task => {            
              templateTask +=
              `
                <tr taskId="${task.id}">
                  <td>${task.nameTask}</td>
                  <td>${task.descriptionTask}</td>
                  <td class="text-center">
                    <button class="edit-task" title="Modificar">
                      <i class="fas fa-edit text-primary"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="delete-task" title="Eliminar">
                      <i class="fas fa-trash-alt text-danger"></i>
                    </button>
                  </td>
                </tr>
              `;
            });
          } else {
            templateTask += '<tr><td colspan="3" class="text-center">No se encuentra la nota</td></tr>';
          }
          $('#table-tasks').html(templateTask);
        }
      });
    } else {
      getTask();
    }
  });

  // Section add or edit task
  $('#create-task-form').submit(function(e) {
    e.preventDefault();
    const postData = {
      nameTask: $('#name-task').val(),
      descriptionTask: $('#description-task').val(),
      id: $('#id-task').val()
    };

    let url = edit === true ? "servers/taskEditServer.php" : "servers/taskAddServer.php";

    $.post(url, postData, function (resp) {
        if(resp) {          
          $('#create-task-form').trigger('reset');
          $('#btn-cancel-edit').attr('disabled', true);
          getTask();
          edit = false;
        }
      }      
    );
  });

  // Section get all tasks
  function getTask () {
    $.ajax({
      type: "GET",
      url: "servers/taskList.php",
      success: function (resp) {
        let templateTable = '';
        let tasks = JSON.parse(resp);
        tasks.forEach(task => {
          templateTable += 
          `
            <tr taskId="${task.id}">
              <td>${task.nameTask}</td>
              <td>${task.descriptionTask}</td>
              <td class="text-center">
                <button class="edit-task" title="Modificar">
                  <i class="fas fa-edit text-primary"></i>
                </button>
              </td>
              <td class="text-center">
                <button class="delete-task" title="Eliminar">
                  <i class="fas fa-trash-alt text-danger"></i>
                </button>
              </td>
            </tr>
          `;
        });
        $('#table-tasks').html(templateTable);
      }
    });
  }

  // Section delete task
  $(document).on('click', '.delete-task', function() {
    if(confirm('Estas seguro de eliminar la tarjeta?')) {
      let element = $(this)[0].parentElement.parentElement;
      let idTask = $(element).attr('taskId');
      $.post("servers/taskDeleteServer.php", { idTask }, function (resp) {
        getTask();
        console.log(resp);
      });
    }
  });

  // Section edit task
  $(document).on('click', '.edit-task', function() {
    let element = $(this)[0].parentElement.parentElement;
    let idTask = $(element).attr('taskId');
    $.post("servers/taskGetByIdServer.php", { idTask }, function (resp) {
      task = JSON.parse(resp);
      $('#name-task').val(task[0].nameTask);
      $('#description-task').val(task[0].descriptionTask);
      $('#id-task').val(task[0].id);
      $('#btn-cancel-edit').removeAttr('disabled');
      edit = true;
    });
  });

  // Section cancel edit task
  $(document).on('click', '#btn-cancel-edit', function () {
    $('#btn-cancel-edit').attr('disabled', true);
    $('#name-task').val(null);
      $('#description-task').val(null);
      $('#id-task').val(null);
      edit = false;
  });
});