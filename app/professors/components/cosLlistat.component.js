angular.module('professors').
    component('cosLlistat', {
        templateUrl: '/professors/components/cosLlistat.template.html',
        controller: function cosLlistatController($scope, $element) {
            $scope.professors = $element.attr("array");
            var deleteProfessor = (id) => {
                $scope.loadingDelete = id;
                $scope.$emit('deleted', id);
            };

            $scope.confirmDelete = (ev, id) => {
                var confirm = $mdDialog.confirm()
                    .title('Estas segur que vols esborrar al Professor amb la ID: ' + id + '?')
                    .textContent('El professor que has seleccionat serà esborrat permanentment.')
                    .ariaLabel('Esborrar professor')
                    .targetEvent(ev)
                    .ok('Sips! UwU')
                    .cancel('Ups, cancela Pls');
                $mdDialog.show(confirm).then(function () {
                    deleteProfessor(id);
                });
            }
                
        },
        bindings: {
            array: '<',
            deleted: '&',
            updated: '&'
        }
    });