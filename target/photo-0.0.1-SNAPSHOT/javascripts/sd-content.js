$('#i18n').change(function () {
    alert(1);
    $.getScript('../src/locale/bootstrap-table-' + $(this).val() + '.js', function() {
        $('#table-pagination').bootstrapTable('destroy').bootstrapTable();
    });
});