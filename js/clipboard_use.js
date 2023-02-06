/*页面载入完成后，创建复制按钮*/
!function (e, t, a) {

    $('pre').children('code').each(function (i, e) {
        $(e).before('<span class="btn-copy" data-clipboard-snippet="">复制</span>');
    })

    var clipboard = new ClipboardJS('.btn-copy', {
        target: function (trigger) {
            return trigger.nextElementSibling;
        }
    });

    clipboard.on('success', function (e) {
        clipboardOn(e, '复制成功')
        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        clipboardOn(e, '复制失败')
    });

    function clipboardOn(e, text) {
        $(e.trigger).text(text)

        setTimeout(function () {
            $(e.trigger).text('复制')
        }, 2000)
    }

    // 为代码块添加样式
    let code = $('code')
    code.addClass('card-body')
    code.parent('pre').addClass('card')

}(window, document);