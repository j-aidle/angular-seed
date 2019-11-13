angular.module('serveis')
    .factory('professorsAPI', ($http) => {
        let actions= {
            get: () => {
                return $http.get('http://localhost:57915/api/Professors');
            },
            post: (content) => {
                return $http.post('http://localhost:57915/api/Professors', content, { headers: { 'Content-Type': 'application/json' } });
            },
            delete: (id) => {
                return $http.delete('http://localhost:57915/api/Professors/' + id);
            },
            update: (id, content) => {
                return $http.put('http://localhost:57915/api/Professors/' + id, content);
            }
        };
        return actions;
    });