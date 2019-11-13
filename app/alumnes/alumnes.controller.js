angular.module('alumnes')
    .controller('alumnesController', [
        '$scope',
        'alumnesAPI',
        function alumnesController(
            $scope,
            alumnesAPI
        ) {
            alumnesAPI.get().then((response) => {
                $scope.alumnes = response.data;
                console.log(response.data);
            }, (error) => {
                console.log(error)
            });

        $scope.crearAlumne = (isValid) => {
            if (isValid) {
                alumnesAPI.post($scope.nouAlumne).then((response) => {
                    console.log(response);

                    alumnesAPI.get().then((response) => {
                        $scope.alumnes = response.data;
                    }, (error) => {
                        console.log(error)
                    });

                }, (error) => {
                    console.log(error);
                });
            }
        }

        $scope.deleteAlumne = (id) => {
            alumnesAPI.delete(id).then((response) => {
                alumnesAPI.get().then((response) => {
                    $scope.alumnes = response.data;
                }, (error) => {
                    console.log(error)
                });

            }, (error) => {
                console.log(error);
            });
        };

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
                console.log(response);
                alumnesAPI.get().then((response) => {
                    $scope.alumnes = response.data;
                }, (error) => {
                    console.log(error)
                });
                $scope.editing = null;
            }, (error) => {
                console.log(error);
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

    }])