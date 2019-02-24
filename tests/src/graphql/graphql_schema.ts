export const graphqlSchema = `
type Query {
  student(id: Int!): Student
  students(country: String): [Student]
},
type Student {
  id: Int,
  name: String,
  gender: String,
  country: String,
  city: String
}
`;