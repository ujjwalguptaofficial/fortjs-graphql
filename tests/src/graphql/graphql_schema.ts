export const graphqlSchema = `
type Query {
  student(id: Int!): Student
  studentsByContry(country: String): [Student]
},
type Student {
  id: Int,
  name: String,
  gender: String,
  country: String,
  city: String
}
`;