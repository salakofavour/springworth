export const addProductFields = [
  {
    type: "text",
    label: "Name",
    name: "name",
    minLength: 3.0,
  },
  {
    type: "number",
    label: "Price",
    name: "price",
    minLength: 1.0,
  },
  {
    type: "text",
    isDescription: true,
    label: "Description",
    name: "description",
    minLength: 3,
  },
  {
    type: "number",
    label: "Quantity",
    name: "quantity",
    minLength: 1,
  },
];
