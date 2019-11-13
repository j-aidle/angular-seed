angular.module('professors')
    .controller('professorsController',
        ['$scope',
        'professorsAPI',
        function professorsController(
            $scope,
            professorsAPI
        ) {
            professorsAPI.get().then((response) => {
                $scope.professors = response.data;
            }, (error) => {
                console.log(error)
            });

            $scope.crearProfe = (isValid) => {
                if (isValid) {
                    professorsAPI.post($scope.nouProfe).then((response) => {
                        console.log(response);

                        professorsAPI.get().then((response) => {
                            $scope.professors = response.data;
                        }, (error) => {
                            console.log(error)
                        });

                    }, (error) => {
                        console.log(error);
                    });
                }
            }

            $scope.deleteProfessor = (id) => {
                professorsAPI.delete(id).then((response) => {
                    professorsAPI.get().then((response) => {
                        $scope.professors = response.data;
                    }, (error) => {
                        console.log(error)
                    });

                }, (error) => {
                    console.log(error);
                });
            };

            $scope.editing = null;
            $scope.canviProfessor = {
                Nom: "",
                Cognom: "",
                Dni: "",
                tel: ""
            }

            $scope.updateProfessor = (id) => {
                professorsAPI.update(id, $scope.canviProfessor).then((response) => {
                    console.log(response);
                    professorsAPI.get().then((response) => {
                        $scope.professors = response.data;
                    }, (error) => {
                        console.log(error)
                    });
                    $scope.editing = null;
                }, (error) => {
                    console.log(error);
                })
            }

            $scope.initUpdateProfessor = (profe, param) => {
                $scope.editing = profe.Id + param;
                $scope.canviProfessor.Nom = profe.Nom;
                $scope.canviProfessor.Cognom = profe.Cognom;
                $scope.canviProfessor.Dni = profe.Dni;
                $scope.canviProfessor.tel = profe.tel;
            }
    }]);