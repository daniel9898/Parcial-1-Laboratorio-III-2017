function verificarUsuario() {

    var email = $("#email").val();
    var pass = $("#password").val();

    var datosLogin = {
        email: email,
        password: pass
    };

    var funcionAjax = $.ajax({
        url: "http://localhost:1337/login", 
        type: "post",
        data: JSON.stringify(datosLogin)
    });
    funcionAjax.done(function(retorno) {
       
		if(retorno.autenticado == "si")
        {
           localStorage.setItem("email",email);
		   localStorage.setItem("preferencias",retorno.preferencias);
           window.location.replace("index.html");
        } 

        
    })

}

function altaPosteo() {
    $("#btnpost").html("");

    $("#principal").html(
        "<div class='container col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3'>" +
        "<form class='form-login' onsubmit='enviarPost();return false'>" +
        "<h2 id ='log' class='form-ingreso-heading'>Comparta sus opiniones :</h2>" +
        "<div class = form-group>" +
        "<label for='titulo' class='sr-only'>Titulo</label>" +
        "<input type='text' id='titulo' class='form-control' placeholder='Titulo' required='' autofocus=''>" +
        "<label for='cabezera' class='sr-only'>cabezera</label>" +
        "<input type='text' id='cabezera' class='form-control' placeholder='Cabezera' required='' autofocus=''>" +
        "<input type='text' id='texto' class='form-control' placeholder='Texto principal' required='' autofocus=''>" +
        "</div>" +
        "<button  class='btn btn-lg btn-success btn-block' type='submit'>Postear</button>" +
        "</form>" +
        "</div>"
    );

}

function enviarPost() {

    var titulo = $("#titulo").val();
    var cabezera = $("#cabezera").val();
    var texto = $("#texto").val();
    var autor = localStorage.getItem("email");
    var preferencias = localStorage.getItem("preferencias");

      var datosPost = {
        title: titulo,
        header: cabezera,
        posttext: texto,
        author: autor
    };

    $("#principal").html(
        "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-lg-6 col-lg-offset-5'>" +
        "<img src='estilos/imagenes/ajax-loader.gif'>");
 
    var funcionAjax = $.ajax({
        url: "http://localhost:1337/postearNuevaEntrada", 
        type: "post",
        data: JSON.stringify(datosPost)
    
    });

    funcionAjax.done(function(retorno) { 
       
        $("#principal").html(
            "<button class='btn btn-success btn-block col-lg-1'onclick='altaPosteo()'>New Post</button>");
            
        $("#posteos").after("<div id='publicacion' class='col-xs-12 col-sm-6 col-md-4 col-lg-3'>" +
            "<header><h2>" + retorno.title + "</h2></header>" +
            "<header><h3>" + retorno.header+ "</h3></header>" +
            "<p><h4>" + retorno.posttext + "</h4><h5>Por :" + retorno.author + "-" + retorno.date + "</h5></p>" +
            "</div>");
    });

}