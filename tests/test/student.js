 const {
     request,
     expect
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

         request.query(query, variables, (response) => {

         }).then(results => {
             expect(results.data).to.be.an('object');
             expect(results.data.student).to.be.an('object');
             expect(results.data.student.name).to.be.an('string').equal('Alfreds')
             done();
         }).catch(done);
     });

     it('get Students by country', (done) => {
         const query = `query getStudents($country: String!) {
            studentsByContry (country: $country) {
                name
           }
       }`
         const variables = {
             "country": 'Canada'
         }

         request.query(query, variables, (response) => {

         }).then(results => {
             console.log(results);
             expect(results.data).to.be.an('object');
             expect(results.data.studentsByContry).to.be.an('array').length(1);
             expect(results.data.studentsByContry[0].name).to.be.an('string').equal('Eastern')
             done();
         }).catch(done);
     });

 });