var previewURL = "#";
var downloadURL = "#";

$(function () {
    var res = JSON.parse(localStorage.getItem("buildResponse"));
    if (res !== null) {
        $("#previewLnk").attr("href", res.PreviewURL);
        $("#downloadLnk").attr("href", res.DownloadURL);
    }
    $("#build").unbind("click").bind("click", function () {
        let formData = new FormData();
        let clientName = $("input[name=clientName]").val();
        let downloadUrl = $("input[name=downloadUrl]").val();
        formData.append('clientName', $("input[name=clientName]").val());
        formData.append('version', $("input[name=version]").val());
        formData.append('downloadUrl', $("input[name=downloadUrl]").val());
        formData.append('changeLogUrl', $("input[name=changeLogUrl]").val());
        formData.append('featureDesc', $("textarea[name=featureDesc]").val());
        if (clientName == "" || clientName == null) {
            alert("名称不能为空！");
            return false;
        } else if (downloadUrl == "" || downloadUrl == null) {
            alert("下载文件所在目录URL不能为空！");
            return false;
        } else {
            $.ajax({ // ajax登陆请求
                url: "/api/build",
                type: "POST",
                data: formData,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false
            }).done(function (res) {
                if (res.Error) {
                    err = `${res.Error}`
                    spop({ template: err, autoclose: 3000, style: 'error', position: 'top-center' });
                    return
                }
                localStorage.setItem("buildResponse", JSON.stringify(res));
                $("#previewLnk").attr("href", res.PreviewURL);
                $("#downloadLnk").attr("href", res.DownloadURL);
                spop({ template: '构建成功', autoclose: 3000, style: 'success', position:'top-center' });
            }).fail(function (res) {
                err = `${res.Error}`
                spop({ template: err, autoclose: 3000, style: 'error', position: 'top-center' });
            })
        }
    });
});