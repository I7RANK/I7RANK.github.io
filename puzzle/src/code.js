var num_piezas;

/* LEVELS */
var piezas_nivel = levels["lvl_20"][0]
var estados_win = levels["lvl_20"][1]

var estado_piezas = [0];
var grados_piezas = [0];

/**
 * def_ruta - define la ruta de la imagen que se va a agregar
 * @param {Array} p_n array de las piezas del nivel
 * @param {Int} n indice para buscar la ruta de la img
 */
function def_ruta(p_n, n) {
    var ruta = "";
    if (p_n[n] == "ini") {
        ruta = "img/ini_a.png"
    } else if (p_n[n] == "fin") {
        ruta = "img/fin_a.png"
    } else if (p_n[n] == "rec") {
        ruta = "img/rec_b.png"
    } else if (p_n[n] == "curv") {
        ruta = "img/curv_b.png"
    } else if (p_n[n] == "cruz") {
        ruta = "img/cruz_b.png"
    } else if (p_n[n] == "curv-x2") {
        ruta = "img/curv-x2_b.png"
    } else if (p_n[n] == "") {
        ruta = "img/"
    } else if (p_n[n] == "") {
        ruta = "img/"
    } else if (p_n[n] == "") {
        ruta = "img/"
    } else if (p_n[n] == "") {
        ruta = "img/"
    } else if (p_n[n] == "") {
        ruta = "img/"
    } else if (p_n[n] == "") {
        ruta = "img/"
    } else {

    }
    return ruta;
}

/**
 * add_piezas - agraga las piezas y crea el tablero
 * @param {Integer} num es el numero de casillas en el tablero
 * @param {Boolean} edit si es true indica que esta en modo editor 
 * sino es modo de juego
 */
function add_piezas(num, edit) {
    num_piezas = num;
    for (var i = 0; i <= num - 1; i++) {
        var divcontend = document.createElement("div");
        var divcontend_img = document.createElement("div");
        var imgpieza = document.createElement("img");

        divcontend.setAttribute("id", "divcontend" + i);
        divcontend.setAttribute("Class", "contend_5x5");
        divcontend_img.setAttribute("Class", "contend_img_5x5");
        divcontend_img.setAttribute("id", "divcontend_img" + i);
        imgpieza.setAttribute("id", i);
        imgpieza.setAttribute("Class", "img_5x5");

        if (edit == true) {
            divcontend.setAttribute("onclick", "in_select(this);");
            divcontend_img.setAttribute("onclick", "id_divcontend_img(this);");
        }

        estado_piezas[i] = 0;
        grados_piezas[i] = 0;

        if (piezas_nivel[i] == "" || piezas_nivel[i] == null) {

        } else {
            imgpieza.setAttribute("src", def_ruta(piezas_nivel, i));
            imgpieza.setAttribute("onclick", "rotar(this.id)");
            estado_piezas[i] = 1;
            if (piezas_nivel[i] == "fin" || piezas_nivel[i] == "ini") {
                imgpieza.setAttribute("onclick", "");
                estado_piezas[i] = estados_win[i];
                if (estados_win[i] == 1) {
                    imgpieza.style = "transform: rotate(0deg);";
                } else if (estados_win[i] == 2) {
                    imgpieza.style = "transform: rotate(90deg);";
                } else if (estados_win[i] == 3) {
                    imgpieza.style = "transform: rotate(180deg);";
                } else if (estados_win[i] == 4) {
                    imgpieza.style = "transform: rotate(270deg);";
                }
            }
            if (edit == true) {

            } else {
                divcontend_img.appendChild(imgpieza);
            }
        }
        divcontend.appendChild(divcontend_img);

        if (edit == true) {
            document.getElementById("div_editor").appendChild(divcontend);
        } else {
            document.getElementById("div_juego").appendChild(divcontend);
        }
    }
}

/**
 * saca_nom - obtiene el nombre estandar de la ruta de la pieza
 * @param {Element} source es la pieza del tablero
 */
function saca_nom(source) {
    var nom_;
    /* este for saca el trozo del nombre de la imagen de la url del img
    (muchas eles en esta frace) */
    for (i = 0; i <= source.length - 1; i++) {
        if (source.charAt(i) == "/") {
            nom_ = source.substring(i + 1, source.length);
        }
    }

    // aqui se quita la extencion del nombre de la imagen
    nom_ = nom_.substring(0, nom_.length - 4);

    // y aqui se quita lo que esta despues de el gion bajo
    for (i = 0; i <= nom_.length - 1; i++) {
        if (nom_.charAt(i) == "_") {
            nom_ = nom_.substring(0, i);
        }
    }
    return nom_;
}

/**
 * rotar - rota la pieza a la que se le hace click en el tablero
 * @param {Element} id es la id de la pieza que se va a rotar
 */
function rotar(id) {
    var source = document.getElementById(id).src;
    var nom_img = "";

    nom_img = saca_nom(source);

    // el estado se asigna cuando se crean las piezas
    if (nom_img == "cruz") {
        estado_piezas[id] = 1;
    } else if (nom_img == "ccruz" || nom_img == "curv-x2" || nom_img == "rec") {
        if (estado_piezas[id] == 1) {
            estado_piezas[id] = 2;
        } else if (estado_piezas[id] == 2) {
            estado_piezas[id] = 1;
        }
    } else if (nom_img == "fin" || nom_img == "ini" || nom_img == "curv") {
        if (estado_piezas[id] == 4) {
            estado_piezas[id] = 0;
        }
        estado_piezas[id] = estado_piezas[id] + 1;
    }
    gene_estados[id] = estado_piezas[id];

    grados_piezas[id] = grados_piezas[id] + 90;
    document.getElementById(id).style = "transform: rotate(" + grados_piezas[id] + "deg); transition: 0.4s;";

    // este codigo verifica despues de cada click si ganas
    var np = 25;
    var ganas = 0;
    for (a = 0; a <= np - 1; a++) {
        if (estado_piezas[a] == estados_win[a]) {
            ganas = ganas + 1;
        }
    }
    if (ganas == np) {
        for (e = 0; e <= 24; e++) {
            var elimg = document.getElementById(e);
            if (elimg == null) {} else {
                var url = elimg.src;
                // no recuerdo para que puse el siguiente comentario :v
                // falta el ab.png o el ba.png
                var new_url = url.substring(0, url.length - 5) + "a.png";
                elimg.setAttribute("src", new_url);
            }
        }

        // show div_win
        var div_win = document.getElementById("div_win");
        div_win.style = "display: flex; animation: show 2s;"
    }
}

// ----------------------- Editor ---------------------- //
var div_contend = "";
var div_contendimg = "";
var new_idimg = "";
var gene_limg = [""];
var gene_estados = [0];

// llena los array con los valores por defecto ("" y 0)
for (var i = 0; i <= 24; i++) {
    gene_limg[i] = "";
    gene_estados[i] = 0;
}

/**
 * generar - genera el codigo de un nivel en dos lineas
 * la primera genera el nombre de las piezas
 * y la segunda genera los estados
 * ambas lineas separadas por comas en orden
 */
function generar() {
    var line = "";
    var esta = "";
    var div_show_output = document.getElementById("save_show_output");
    var output = "";

    for (var i = 0; i <= 24; i++) {
        line = line + ", " + '"' + gene_limg[i] + '"';
        esta = esta + ", " + gene_estados[i];
    }
    line = "[" + line.substring(2) + "],\n";
    esta = "[" + esta.substring(2) + "]";
    console.log(line);
    console.log(esta);

    output = "lvl_##:[\n\t" + line + "\t" + esta + "\n],"
    div_show_output.innerHTML = output;
}

/**
 * in_select - agrega una sombra a la casilla que se ha seleccionado
 * para indicar que se puede agragar una ficha
 * @param {Element} id es el elemento al que se le agragra o quitara la sombra
 */
function in_select(id) {
    div_contend.style = "none";
    if (div_contend != "") {
        if (div_contend != id) {
            div_contend = id;
            div_contend.style = "box-shadow: inset 0px 0px 20px #000;";
        } else {
            div_contend.style = "none";
            div_contend = "";
        }
    } else {
        div_contend = id;
        div_contend.style = "box-shadow: inset 0px 0px 20px #000;";
    }
    tituloo.innerText = "";
}

/**
 * id_divcontend_img - obtiene la id de la casilla y se la asigna a @new_idimg 
 * @param {Element} id es la casilla a la que se le sacara la id
 */
function id_divcontend_img(id) {
    var cortar = "";
    if (div_contendimg != "") {
        if (div_contendimg != id) {
            div_contendimg = id;
            cortar = div_contendimg.id;
            new_idimg = cortar.substring(14, div_contendimg.id.length);
        } else {
            div_contendimg = "";
            new_idimg = undefined;
        }
    } else {
        div_contendimg = id;
        cortar = div_contendimg.id;
        new_idimg = cortar.substring(14, div_contendimg.id.length);
    }
}

/**
 * chosen - esta funcion agrega la pieza a la casilla que se selecciono
 * las piezas son las que estan a la derecha en el modo editor
 * @param {Element} id es la id de la pieza seleccionada
 */
function chosen(id) {
    if (div_contend == "" || div_contendimg == "" || new_idimg == "") {
        alert("Seleccione primero una casilla");
    } else {
        var img_new = document.createElement("img");
        img_new.setAttribute("id", new_idimg);
        img_new.setAttribute("Class", "img_5x5");
        img_new.setAttribute("src", id.src);
        estado_piezas[new_idimg] = 1;
        grados_piezas[new_idimg] = 0;

        div_contend.setAttribute("onclick", "");
        div_contendimg.setAttribute("onclick", "");
        img_new.setAttribute("onclick", "rotar(this.id)");

        div_contendimg.appendChild(img_new);

        gene_limg[new_idimg] = saca_nom(id.src);
        gene_estados[new_idimg] = 1;

        div_contend.style = "none";
        div_contend = "";
        new_idimg = "";
        div_contendimg = "";
    }
}

/**
 * borrar - elimina la pieza en caso de que se active la funcion borrar
 * @param {Element} element es el elemento que se quiere borrar
 * @param {boolean} solob si es false se limpian los arrays
 * se utiliza en el editor para borrar las piezas
 */
function borrar(element, solob) {
    element.parentNode.removeChild(element);
    if (solob == false) {
        gene_limg[element.id] = "";
        gene_estados[element.id] = 0;
    }
}

var tituloo = document.getElementById("titulo");
var spann_t = document.getElementById("borrar_t");
var spann_f = document.getElementById("borrar_f");

/**
 * cambio - esta funcion cambia el estado de borrar piezas y agragar
 * @param {*} equelan indica si esta o no eliminando true == delete
 */
function cambio(equelan) {
    if (div_contend == "" || div_contendimg == "" || new_idimg == "") {
        if (equelan == true) {
            console.log(equelan);
            tituloo.innerText = "Eliminando";
            for (i = 0; i <= num_piezas - 1; i++) {
                var div1 = document.getElementById("divcontend" + i);
                var div2 = document.getElementById("divcontend_img" + i);
                var img1 = document.getElementById(i);
                if (img1 != null) {
                    img1.setAttribute("onclick", "borrar(this, false)");
                }
                div1.setAttribute("onclick", "");
                div2.setAttribute("onclick", "");
            }
            spann_t.setAttribute("class", "sombra icon-ex ocultar");
            spann_f.setAttribute("class", "sombra icon-chulo icons_editor");
        } else {
            console.log(equelan);
            titulo.innerText = "";
            for (i = 0; i <= num_piezas - 1; i++) {
                var div1 = document.getElementById("divcontend" + i);
                var div2 = document.getElementById("divcontend_img" + i);
                var img1 = document.getElementById(i);
                if (img1 != null) {
                    img1.setAttribute("onclick", "rotar(this.id)");
                } else {
                    div1.setAttribute("onclick", "in_select(this);");
                    div2.setAttribute("onclick", "id_divcontend_img(this);");
                }
            }
            spann_f.setAttribute("class", "sombra icon-chulo ocultar");
            spann_t.setAttribute("class", "sombra icon-ex icons_editor");
        }
    } else {
        tituloo.innerText = "Desseleccione la casilla primero";
    }
}

/**
 * recargar - devuelve el modo editor al estado inicial
 */
function recargar() {
    for (i = 0; i <= num_piezas - 1; i++) {
        var borrar_divcontend = document.getElementById("divcontend" + i);
        var borrar_divcontend_img = document.getElementById("divcontend_img" + i);
        var borrar_img = document.getElementById(i);

        if (borrar_img != null) {
            borrar_img.parentNode.removeChild(borrar_img);
        }

        borrar_divcontend.parentNode.removeChild(borrar_divcontend);
        borrar_divcontend_img.parentNode.removeChild(borrar_divcontend_img);
        estado_piezas[i] = 0;
        grados_piezas[i] = 0;
        gene_limg[i] = 0;
        gene_estados[i] = 0;
    }
    add_piezas(num_piezas, true);

    // document.getElementById("div_editor").style = "animation: none;";
    // document.getElementById("div_editor").style = "animation: pulzo 1s;";
}

// --------------------------- niveles ----------
/**
 * cargar_dlvls - carga el tablero en la pestaña niveles
 */
function cargar_dlvls() {
    for (i = 0; i <= 24; i++) {
        var div_lvls = document.createElement("div");
        var lbl_lvls = document.createElement("label");

        lbl_lvls.setAttribute("class", "lbl_lvls centrar");
        div_lvls.setAttribute("id", "div_lvl_" + i);
        div_lvls.setAttribute("class", "div_lvls");
        /* div_lvls.setAttribute("onclick", "location.href='juego.html'"); */
        div_lvls.setAttribute("onclick", "load_lvl(this);");
        div_lvls.setAttribute("onmouseover", "divs_hover(this);");
        div_lvls.setAttribute("onmouseout", "divs_out(this);");

        // div_lvls.style = "animation: cambio_borderdiv 1s infinite " + (i * 100) + "ms;";
        lbl_lvls.style = "animation: cambio_colortext 1s infinite ";
        lbl_lvls.innerText = (i + 1);
        div_lvls.appendChild(lbl_lvls);
        document.getElementById("menu_lvls").appendChild(div_lvls);
    }
}

/**
 * divs_hover - cambia la animacion en los botones de niveles
 * cuando el mouse pasa por encima
 * @param {Element} id id del elemento
 */
function divs_hover(id) {
    var elemento = document.getElementById(id.id);
    elemento.style = "background: #0c0c0c; border-bottom: solid 3px #fff;";
}

/**
 * divs_out - cambia la animacion en los botones de niveles
 * cuando el mouse se quita de encima
 * @param {Element} id id del elemnto
 */
function divs_out(id) {
    var elemento = document.getElementById(id.id);
    elemento.style = "background: #000; border-bottom: solid 3px #0c4071;";
}

/**
 * c_color - cambia el color del borde de los botones del index
 * @param {Int} ns numero del span al que se le cambiara el color
 * (el primero o el segundo)
 * @param {Int} nl numero que indicara que color poner
 */
function c_color(ns, nl) {
    if (nl == 1) {
        document.getElementById("span_up" + ns).style.background = "linear-gradient(to right,#2b0016,#ff1751)";
        document.getElementById("span_rg" + ns).style.background = "linear-gradient(to bottom,#2b0016,#ff1751)";
        document.getElementById("span_dw" + ns).style.background = "linear-gradient(to left,#2b0016,#ff1751)";
        document.getElementById("span_lf" + ns).style.background = "linear-gradient(to top,#2b0016,#ff1751)";
    } else if (nl == 2) {
        document.getElementById("span_up" + ns).style.background = "linear-gradient(to right,#000f2b,#1742ff)";
        document.getElementById("span_rg" + ns).style.background = "linear-gradient(to bottom,#000f2b,#1742ff)";
        document.getElementById("span_dw" + ns).style.background = "linear-gradient(to left,#000f2b,#1742ff)";
        document.getElementById("span_lf" + ns).style.background = "linear-gradient(to top,#000f2b,#1742ff)";
    }

}

/**
 * c_line - llama a c_color y cambia el color del texto cuando
 * el mouse se coloca por encima (over)
 * @param {Element} tipo elemento de donde se llamo esta funcion
 */
function c_line(tipo) {
    if (tipo.id == "btn_j") {
        c_color(1, 1);
        document.getElementById("btn_j").style.color = "#ff1751";
    } else if (tipo.id == "btn_p") {
        c_color(2, 1);
        document.getElementById("btn_p").style.color = "#ff1751";
    }
}

/**
 * c_lineout - llama a c_color y cambia el color del texto cuando
 * el mouse se quita de encima (out)
 * @param {*} tipo is the button if is button play or button editor
 */
function c_lineout(tipo) {
    if (tipo.id == "btn_j") {
        c_color(1, 2);
        document.getElementById("btn_j").style.color = "#1742ff";
    } else if (tipo.id == "btn_p") {
        c_color(2, 2);
        document.getElementById("btn_p").style.color = "#1742ff";
    }
}

/**
 * load_lvl - loads the level selected in niveles.html
 * @param {*} lvl is the element selected (level)
 */
function load_lvl(lvl) {
    var name_lvl = lvl.id.substr(4);
    var num_lvl = parseInt(name_lvl.substr(4));

    num_lvl++;

    if (!levels[name_lvl])
    {
        alert("No existe");
        return;
    }

    piezas_nivel = levels[name_lvl][0]
    estados_win = levels[name_lvl][1]

    document.getElementById("tit_lvls").textContent = "Level " + num_lvl;

    create_div_juego();

    document.getElementById("icon_page_reload").style = "display: block;"

    var div_lvls = document.getElementById("menu_lvls");
    div_lvls.parentNode.removeChild(div_lvls);
}

/**
 * deletes the game board and creates it again
 */
function try_again() {
    var div_juego= document.getElementById("div_juego");

    div_juego.parentNode.removeChild(div_juego);

    var div_win = document.getElementById("div_win");
    div_win.style = "display: none; animation: none;"

    create_div_juego();
}

/**
 * creates the div where will the pieces and adds the pieces
 */
function create_div_juego() {
    var create_div_juego = document.createElement("div");
    create_div_juego.setAttribute("id", "div_juego");
    create_div_juego.setAttribute("class", "tablero");
    document.getElementsByTagName("body")[0].appendChild(create_div_juego);
    add_piezas(25, false);
}
