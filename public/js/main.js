$(document).ready(() => {
  $(".edit-recipe").on("click", function() {
    $("#edit-form-name").val($(this).data("name"));
    $("#edit-form-ingredients").val($(this).data("ingredients"));
    $("#edit-form-directions").val($(this).data("directions"));
    $("#edit-form-id").val($(this).data("id"));
  });

  $(".delete-recipe").on("click", function() {
    const id = $(this).data("id");
    const url = "/delete/" + id;
    if (confirm("Are you sure you want to delete this recipe?")) {
      $.ajax({
        url: url,
        type: "DELETE",
        success: function(result) {
          console.log("Recipe Deleted");
          window.location.href = "/";
        },
        error: function(err) {
          console.error(err);
        }
      });
    }
  });
});
