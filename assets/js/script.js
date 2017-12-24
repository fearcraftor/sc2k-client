$(document).ready(function()
{
  //Checke l'état de la souris
  var isDown = false;

  //Menu
  var menu = -1;

  $('button').click(function()
  {
    $('button').removeClass("active");
    $(this).addClass("active");

    if($("#b").hasClass("active"))
    {
      menu = 0;
    };

    if($("#r").hasClass("active"))
    {
      menu = 1;
      selectZone(1);
    };

    if($("#c").hasClass("active"))
    {
      menu = 2;
      selectZone(2);
    };

    if($("#i").hasClass("active"))
    {
      menu = 3;
      selectZone(3);
    };

    if($("#pwr").hasClass("active"))
    {
      menu = 4;
    };
  });


  //Sélectionner

  function selectZone(zoneCode)
  {
    var color = null;
    switch(zoneCode)
    {
      case 1:
        color = "green";
        break;
      case 2:
        color = "blue";
        break;
      case 3:
        color = "yellow";
        break;
    }

    $(".grid").mousedown(function(){
        var posStart = getGridCoord($(this));

        isDown = true;

        $(".grid").mouseenter(function(){
          if(isDown){
            console.log(color);
            var posActual = getGridCoord($(this));
            var selectedZone = selectHelper(posStart, posActual, color);
          };
        });
    });


    $(".grid").mouseup(function(){
        var posEnd = getGridCoord($(this));
        isDown = false;
        $(".grid").removeClass("selecting").css({opacity : 0});
        writeZone(posStart, posEnd, selectedZone);
    });
  }

  //Placer un bâtiment

  $(".grid").click(function()
  {
    if(menu>=4 || menu == 0){

      $.ajax({
        type: "POST",
        url: "index.php",
        data: "id=" + $(this).attr("id") + "&building=" + menu,  // Récupère l'emplacement et le building
        success: function()
        {
            $("body").load("index.php");
        }
      });

    };

  });

});

/////////////////////////////////////
// FONCTIONS //
/////////////////////////////////////



function getGridCoord(bloc)       // Récupère les coordonnées d'un bloc
{
  var row = bloc.attr("row");
  var line = bloc.attr("line");
  console.log([row, line]);
  return {row : row, line : line};
}

function selectHelper(start, end, color) // Défini la zone de sélection
{
  //Déselectionne à chaque passage de case
  $(".grid").removeClass("selecting").css({opacity : 0});

  //Classe les colonnes et détermine la plus petite et la plus grande colonne
  var rowOffset = [start.row, end.row];
  rowOffset.sort(function (a, b){return b-a});
  var rowMin = parseInt(rowOffset[1]);
  var rowMax = parseInt(rowOffset[0]);

  //Classe les lignes et détermine la plus petite et la plus grande ligne
  var lineOffset = [start.line, end.line];
  lineOffset.sort(function (a, b){return b-a});
  var lineMin = parseInt(lineOffset[1]);
  var lineMax = parseInt(lineOffset[0]);


  //Pour chaque colonne sélectionnée
  for (var i = rowMin ; i <= rowMax ; i++) 
  {
    //Pour chaque ligne de chaque colonne sélectionnée
    for (var j = lineMin ; j <= lineMax ; j++)
    {
      //Ajouter à la case la classe "selecting"
      $('.grid[row="'+i+'"][line="'+j+'"]').addClass("selecting").css({background : color, opacity : 0.5});
    }
  }

  return [rowMin, rowMax, lineMin, lineMax];
}

function writeZone(start, end, zone)    // Inscrit les zones à la base de données
{
  $.ajax({
    type: "POST",
    url: "index.php",
    data: // <--ajouter la boucle ici

    "id=" + $(this).attr("id") + "&type=" + menu,  // Récupère l'emplacement et le building
    success: function()
    {
        $("body").load("index.php");
    }
  });
}
