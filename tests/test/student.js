 const {
     request
 } = require('./common');

 describe('student test', () => {
     it('get Student by id', (done) => {
         const query = `query getStudent($id: Int!) {
            student (id: $id) {
                 name
            }
        }`
         const variables = {
             "id": 1
         }

         request(query, variables).then(results => {
             console.log(results);
         }).catch(done);
     });
 });