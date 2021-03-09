$(function () {
//    $("#beolvas").on("click", kiir);

    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", abBeir);
    $("article").delegate(".torol", "click", adatTorol);
    $("article").delegate(".szerkeszt", "click", adatSzerkeszt);
    $("#megse").on("click", adatMegse);
    $("#modosit").on("click", adatModosit);




});
var telefonkonyvem = [];
function kiir() {
//    var nev = $("#nev").val();
//    var tel = $("#tel").val();
//    var kep = $("#kep").val();
//    $("article").empty();
//    for (var i = 0; i < telefonkonyvem.length; i++) {
//        var ID = telefonkonyvem[i].ID;
//        var nev = telefonkonyvem[i].nev;
//        var tel = telefonkonyvem[i].tel;
//        var kep = telefonkonyvem[i].kep;
//        
//        var elem = "<div> <h2>" + nev + " </h2> <p>" + tel + " </p>  <p>" + kep + " </p> <button class='torol' id='"+ID+"'>Töröl</button> </div>";
//    $("article").append(elem);
//    }
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        let szemely = telefonkonyvem(i);
        let elem = "<div> <h2>" + szemely.nev + "</h2> <p class='tel'>" + szemely.tel + "</p> <p class='link>" + szemely.kep + "</p> <button> id=" + szemely.ID + " class='torol'>Töröl</button> <button id=" + i + "class ='szerkeszt'>Szerkeszt</button><hr> </div>";
        $("article").append(elem);
    }
}
function adatSzerkeszt() {
    console.log("Módsosít");
    $(".szerkesztes").removeClass("elrejt");
    var index=$(this).attr("id");
    console.log(index);
    
    $("#id2").val(telefonkonyvem[index].ID);
    $("#nev2").val(telefonkonyvem[index].nev);
    $("#tel2").val(telefonkonyvem[index].tel);
    $("#kep2").val(telefonkonyvem[index].kep);

}

function adatMegse(){
    $(".szerkesztes").removeClass("elrejt");
    
}

function adatModosit(){
    var editSzemely={
        ID: $("#id").val(),
        nev: $("#nev2").val(),
        tel: $("#tel2").val(),
        kep: $("#kep2").val()
    };
    
    console.log("Módosít");
    console.log(editSzemely);
     $.ajax({
        type: "PUT",
        url: "modosit.php",
        data: editSzemely,
        success: function () {
            beolvas();
            kiir();
        },
        error: function () {
            alert("Hiba az adatok módosításakor!")
        }
    });
}

function adatTorol() {
    var aktelem = $(this).closest("div");
    var id = $(this).attr("id");
    console.log("Törlés ******************" + id);
    $.ajax({
        type: "DELETE",
        url: "torol.php?ID=" + id,
        success: function () {
            console.log("törlés");
            //kitöröljük azt a div-et amiben a gomb van
            aktelem.remove();

        },
        error: function () {
            alert("Hiba az adatok törlésekor!")
        }
    });
}

function beolvas() {

    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result) {
            console.log(result);
            telefonkonyvem = JSON.parse(result);
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!")
        }
    });

}
function abBeir() {
    var szemely = {
        nev: $("#nev").val(),
        tel: $("#tel").val(),
        kep: $("#kep").val()
    };

    $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        success: function (ujSzemely) {
            console.log(ujSzemely);
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!")
        }
    });

}