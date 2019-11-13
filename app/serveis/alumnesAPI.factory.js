angular.module('serveis')
    .factory('alumnesAPI', ($http) => {
        let actions = {
            get: () => {
                return $http.get('http://localhost:57915/api/Alumnes');
            },
            post: (content) => {
                return $http.post('http://localhost:57915/api/Alumnes', content, { headers: { 'Content-Type': 'application/json' } });
            },
            delete: (id) => {
                return $http.delete('http://localhost:57915/api/Alumnes/' + id);
            },
            update: (id, content) => {
                return $http.put('http://localhost:57915/api/Alumnes/' + id, content);
            }
        };
        return actions;
    });