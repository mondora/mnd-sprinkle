var lorem = "Quando tramite la tastiera modifichiamo il volume o regoliamo la luminosità dello schermo, vediamo apparire delle semplici grafiche esplicative dell'operazione. La stessa cosa non succede però per il blocco maiuscole, &nbsp; per cui siamo costretti &egrave; a guardare se la spia sul tasto è accesa o spenta. CapSee è una piccola app, compatibile con Mavericks e precedenti, che risolve questo inconveniente, mostrando una grafica in sovraimpressione.";
lorem = lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem;

angular.module("SprinkleDemo", ["mnd.sprinkle", "ui.bootstrap"])

.controller("MainController", function ($scope) {
	$scope.text = lorem;
	$scope.time = 0;
});
