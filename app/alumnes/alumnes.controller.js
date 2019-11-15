angular.module('alumnes')
    .controller('alumnesController', [
        '$scope',
        '$mdDialog',
        '$mdToast',
        'alumnesAPI',
        function alumnesController(
            $scope,
            $mdDialog,
            $mdToast,
            alumnesAPI
        ) {
            $scope.loadingCreate= false;
            $scope.loadingDelete = null;
            $scope.loadingBody = true;
            $scope.error = false;

            var resetForm = () => {
                $scope.nouAlumne.Nom = "";
                $scope.nouAlumne.Cognom = "";
                $scope.nouAlumne.Dni = "";
                $scope.nouAlumne.Tel = "";
                $scope.nouAlumneForm.$setPristine();
                $scope.nouAlumneForm.nom.$untouched = true;
                $scope.nouAlumneForm.nom.$touched = false;
                $scope.nouAlumneForm.Cognom.$untouched = true;
                $scope.nouAlumneForm.Cognom.$touched = false;
                $scope.nouAlumneForm.Dni.$untouched = true;
                $scope.nouAlumneForm.Dni.$touched = false;
                $scope.nouAlumneForm.Tel.$untouched = true;
                $scope.nouAlumneForm.Tel.$touched = false;
            }

            alumnesAPI.get().then((response) => {
                $scope.alumnes = response.data;
                $scope.loadingBody = false;
            }, (error) => {
                $scope.loadingBody = false;
                    $scope.error = true;
                });
            
            $scope.crearAlumne = (isValid) => {

            if (isValid) {
                $scope.loadingCreate = true;
                alumnesAPI.post($scope.nouAlumne).then((response) => {
                    alumnesAPI.get().then((response) => {
                        $scope.alumnes = response.data;
                    }, (error) => {
                        $scope.error = true;
                        });
                    resetForm();
                    //set input to untouched angularjs TODO
                    $scope.loadingCreate = false;
                    ToastCreate();
                }, (error) => {
                    $scope.error = true;
                });
            }
        }

            var deleteAlumne = (id) => {
                $scope.loadingDelete = id;
            alumnesAPI.delete(id).then((response) => {
                alumnesAPI.get().then((response) => {
                    $scope.alumnes = response.data;
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
                .title('Estas segur que vols esborrar al Alumne amb la ID: ' + id +'?')
                .textContent('l\'alumne que has seleccionat ser� esborrat permanentment.')
                .ariaLabel('Esborrar professor')
                .targetEvent(ev)
                .ok('Sips! UwU')
                .cancel('Ups, cancela Pls');

            $mdDialog.show(confirm).then(function () {
                deleteAlumne(id);
            });
        }

        $scope.editing = null;
        $scope.canviAlumne = {
            Id: null,
            Nom: "",
            Cognom: "",
            Dni: "",
            Tel: ""
        }

        $scope.updateAlumne = (id) => {
            alumnesAPI.update(id, $scope.canviAlumne).then((response) => {
                alumnesAPI.get().then((response) => {
                    $scope.alumnes = response.data;
                    $scope.editing = null;
                }, (error) => {
                    $scope.error = true;
                });
            }, (error) => {
                $scope.error = true;
            })
        }

            $scope.initUpdateAlumne = (alumne, param) => {
            $scope.editing = alumne.Id + param;
            $scope.canviAlumne.Id = alumne.Id;
            $scope.canviAlumne.Nom = alumne.Nom;
            $scope.canviAlumne.Cognom = alumne.Cognom;
            $scope.canviAlumne.Dni = alumne.Dni;
            $scope.canviAlumne.Tel = alumne.Tel;
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
                        .textContent('S\'ha creat l\'alumne!')
                        .position(pinTo)
                        .hideDelay(3000));
            };

            var ToastDelete = () => {
                var pinTo = getToastPosition();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('S\'ha esborrat l\'alumne!')
                        .position(pinTo)
                        .hideDelay(3000));
            };
    }])