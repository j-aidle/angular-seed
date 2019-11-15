angular.module('professors')
    .controller('professorsController',
        ['$scope',
        '$mdDialog',
        '$mdToast',
        'professorsAPI',
        function professorsController(
            $scope,
            $mdDialog,
            $mdToast,
            professorsAPI
        ) {
            $scope.loadingCreate= false;
            $scope.loadingDelete = null;
            $scope.loadingBody = true;
            $scope.error = false;

            var resetForm = () => {
                $scope.nouProfe.Nom = "";
                $scope.nouProfe.Cognom = "";
                $scope.nouProfe.Dni = "";
                $scope.nouProfe.Tel = "";
                $scope.nouProfessorForm.$setPristine();
                $scope.nouProfessorForm.nom.$untouched = true;
                $scope.nouProfessorForm.nom.$touched = false;
                $scope.nouProfessorForm.Cognom.$untouched = true;
                $scope.nouProfessorForm.Cognom.$touched = false;
                $scope.nouProfessorForm.Dni.$untouched = true;
                $scope.nouProfessorForm.Dni.$touched = false;
                $scope.nouProfessorForm.Tel.$untouched = true;
                $scope.nouProfessorForm.Tel.$touched = false;
            }

            professorsAPI.get().then((response) => {
                $scope.professors = response.data;
                $scope.loadingBody = false;
            }, (error) => {
                $scope.loadingBody = false;
                    $scope.error = true;
                });
            $scope.crearProfe = (isValid) => {
                if (isValid) {
                    $scope.loadingCreate = true;
                    professorsAPI.post($scope.nouProfe).then((response) => {
                        professorsAPI.get().then((response) => {
                            $scope.professors = response.data;
                        }, (error) => {
                            $scope.error = true;
                        });
                    resetForm();
                    $scope.loadingCreate = false;
                    ToastCreate();
                }, (error) => {
                    $scope.error = true;
                });
            }
        }

            var deleteProfessor = (id) => {
                $scope.loadingDelete = id;
                professorsAPI.delete(id).then((response) => {
                    professorsAPI.get().then((response) => {
                        $scope.professors = response.data;
                        ToastDelete();
                    }, (error) => {
                        $scope.error = true;
                    });

                }, (error) => {
                    $scope.error = true;
                });
            };

        $scope.confirmDelete = (ev, id) => {
            var confirm = $mdDialog.confirm()
                .title('Estas segur que vols esborrar al Professor amb la ID: ' + id + '?')
                .textContent('El professor que has seleccionat ser� esborrat permanentment.')
                .ariaLabel('Esborrar professor')
                .targetEvent(ev)
                .ok('Sips! UwU')
                .cancel('Ups, cancela Pls');

            $mdDialog.show(confirm).then(function () {
                deleteProfessor(id);
            });
        }

            $scope.editing = null;
            $scope.canviProfessor = {
                Id: null,
                Nom: "",
                Cognom: "",
                Dni: "",
                tel: ""
            }

            $scope.updateProfessor = (id) => {
                professorsAPI.update(id, $scope.canviProfessor).then((response) => {
                    professorsAPI.get().then((response) => {
                        $scope.professors = response.data;
                        $scope.editing = null;
                    }, (error) => {
                        $scope.error = true;
                    });
                }, (error) => {
                    $scope.error = true;
                })
            }

            $scope.initUpdateProfessor = (profe, param) => {
                $scope.editing = profe.Id + param;
                $scope.canviProfessor.Id = profe.Id;
                $scope.canviProfessor.Nom = profe.Nom;
                $scope.canviProfessor.Cognom = profe.Cognom;
                $scope.canviProfessor.Dni = profe.Dni;
                $scope.canviProfessor.tel = profe.tel;
            }

            // TOAST

            var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            var toastPosition = angular.extend({}, last);

            var getToastPosition = () => {
                sanitizePosition();

                return Object.keys(toastPosition)
                    .filter(function (pos) {
                        return toastPosition[pos];
                    }).join(' ');
            };

            var sanitizePosition= () => {
                var current = toastPosition;

                if (current.bottom && last.top) {
                    current.top = false;
                }
                if (current.top && last.bottom) {
                    current.bottom = false;
                }
                if (current.right && last.left) {
                    current.left = false;
                }
                if (current.left && last.right) {
                    current.right = false;
                }

                last = angular.extend({}, current);
            }

            var ToastCreate = () => {
                var pinTo = getToastPosition();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('S\'ha creat el professor!')
                        .position(pinTo)
                        .hideDelay(3000));
            };

            var ToastDelete = () => {
                var pinTo = getToastPosition();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('S\'ha esborrat el professor!')
                        .position(pinTo)
                        .hideDelay(3000));
            };
    }])