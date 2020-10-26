// C D E F G A B

function cargar_teclas() {
    let nota = "A";
    let num_nota = 0;
    for (let i = 0; i <= 51; i++) {
        // <div class="teclas_blancas">
        //     <div class="div_nom_tb"><label id="lbl_nom_tb1"></label></div>
        // </div>
        // Crear teclas
        let div_tb = document.createElement("div");
        let div_nom_tb = document.createElement("div");
        let lbl_nom = document.createElement("label");

        div_tb.setAttribute("id", "div_tb" + i);
        div_tb.setAttribute("onclick", "click_nota(this)");
        div_tb.setAttribute("class", "teclas_blancas");
        div_nom_tb.setAttribute("class", "div_nom_tb");
        lbl_nom.setAttribute("id", "lbl_nom_tb" + i);
        lbl_nom.setAttribute("class", "lbl_nom_tb centrar");

        lbl_nom.textContent = nota + num_nota;
        div_nom_tb.appendChild(lbl_nom);
        div_tb.appendChild(div_nom_tb);

        // cuando se agregan las teclas por js hay que cambiar el margin-left de -1px a 1px
        document.getElementById("div_piano").appendChild(div_tb);

        // Nombre de teclas
        if (nota == "C") {
            nota = "D";
        } else if (nota == "D") {
            nota = "E"
        } else if (nota == "E") {
            nota = "F"
        } else if (nota == "F") {
            nota = "G"
        } else if (nota == "G") {
            nota = "A"
        } else if (nota == "A") {
            nota = "B"
        } else if (nota == "B") {
            nota = "C"
            num_nota = num_nota + 1;
        }
    }
}

let primera = true;
let notas_entrada = [""];
let num_entr = 0;
let notas_salida = [""];
let num_sali = 0;

function click_nota(element) {
    let nom_div = element.id.substring(0, 6);
    let num_tecla = element.id.substring(6);

    let lbl_mostrar = document.getElementById("lbl_mostrar_entr");
    let tecla;

    if (nom_div == "div_tb") {
        tecla = document.getElementById("lbl_nom_tb" + num_tecla);
    } else if (nom_div == "div_tn") {
        tecla = document.getElementById("lbl_nom_tn" + num_tecla);
    }

    if (primera == true) {
        lbl_mostrar.textContent = tecla.textContent;
        primera = false;
    } else {
        lbl_mostrar.textContent = lbl_mostrar.textContent + ", " + tecla.textContent;
    }

    notas_entrada[num_entr] = tecla.textContent;
    num_entr++;
}

function leer_array() {
    var line_entra = "";
    for (var i = 0; i < notas_entrada.length; i++) {
        line_entra = line_entra + ", " + notas_entrada[i];
    }
    line_entra = line_entra.substring(2);
    console.log(line_entra);
    document.getElementById("lbl_mostrar_entr").textContent = line_entra;

    var line_sal = "";
    for (var i = 0; i < notas_salida.length; i++) {
        line_sal = line_sal + ", " + notas_salida[i];
    }
    line_sal = line_sal.substring(2);
    console.log(line_sal);
    document.getElementById("lbl_mostrar_trans").textContent = line_sal;
}

function transponer() {
    for (let i = 0; i < notas_entrada.length; i++) {
        let nota_a_transpo = notas_entrada[i];
        let semitonos = document.getElementById("txt_num_semitonos").value;

        let nota_octava;
        let num_octava;

        // identifica si es o no sotenido y separa la nota del numero de la octava
        if (nota_a_transpo.substring(1, 2) == "#") {
            nota_octava = nota_a_transpo.substring(0, 2);
            num_octava = parseInt(nota_a_transpo.substring(2, 3));
        } else {
            nota_octava = nota_a_transpo.substring(0, 1);
            num_octava = parseInt(nota_a_transpo.substring(1, 2));
        }

        if (num_octava == NaN) {
            num_octava = "";
        }

        let cambio_doctava = num_octava;

        // aqui se suben o se bajan los semitonos segun la variable semitonos
        if (semitonos >= 0) {
            for (let i = 0; i < semitonos; i++) {
                if (nota_octava == "C") {
                    nota_octava = "C#";
                } else if (nota_octava == "C#") {
                    nota_octava = "D"
                } else if (nota_octava == "D") {
                    nota_octava = "D#"
                } else if (nota_octava == "D#") {
                    nota_octava = "E"
                } else if (nota_octava == "E") {
                    nota_octava = "F"
                } else if (nota_octava == "F") {
                    nota_octava = "F#"
                } else if (nota_octava == "F#") {
                    nota_octava = "G"
                } else if (nota_octava == "G") {
                    nota_octava = "G#"
                } else if (nota_octava == "G#") {
                    nota_octava = "A"
                } else if (nota_octava == "A") {
                    nota_octava = "A#"
                } else if (nota_octava == "A#") {
                    nota_octava = "B"
                } else if (nota_octava == "B") {
                    nota_octava = "C"
                    cambio_doctava++;
                }
            }
        } else {
            for (let i = 0; i > semitonos; i--) {
                if (nota_octava == "B") {
                    nota_octava = "A#";
                } else if (nota_octava == "A#") {
                    nota_octava = "A"
                } else if (nota_octava == "A") {
                    nota_octava = "G#"
                } else if (nota_octava == "G#") {
                    nota_octava = "G"
                } else if (nota_octava == "G") {
                    nota_octava = "F#"
                } else if (nota_octava == "F#") {
                    nota_octava = "F"
                } else if (nota_octava == "F") {
                    nota_octava = "E"
                } else if (nota_octava == "E") {
                    nota_octava = "D#"
                } else if (nota_octava == "D#") {
                    nota_octava = "D"
                } else if (nota_octava == "D") {
                    nota_octava = "C#"
                } else if (nota_octava == "C#") {
                    nota_octava = "C"
                } else if (nota_octava == "C") {
                    nota_octava = "B"
                    cambio_doctava--;
                }
            }
        }

        notas_salida[i] = nota_octava + cambio_doctava;
    }
    leer_array();
    console.log(notas_entrada.length);
    console.log(notas_salida.length);

}

function btn_majomenos(ele) {
    let span = ele.id;
    let txt = document.getElementById("txt_num_semitonos");
    if (txt.value == "") {
        txt.value = 0;
    }
    let num_txt = parseInt(txt.value);
    if (span == "btn_mas") {
        txt.value = num_txt + 1;
    } else if (span == "btn_menos") {
        txt.value = num_txt - 1;
    }
}

function borrar() {
    console.log(notas_entrada.length);
    console.log(notas_entrada[notas_entrada.length - 1]);
    notas_entrada.splice(notas_entrada.length - 1, notas_entrada.length);
    // notas_entrada[notas_salida.length - 1] = null;
    leer_array();
    // notas_entrada = [""];
    // num_entr = 0;
    // notas_salida = [""];
    // num_sali = 0;
}