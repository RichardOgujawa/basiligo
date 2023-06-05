export default {
  name: 'dishes',
  type: 'document',
  title: 'Dishes',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule) => Rule.required(),
      options: {
        format: '0.00', // Specify the format to include two decimal places
      },
    },
    //This is where the ingredients would go.
    {
      name: 'ingredients',
      type: 'string',
      title: 'Ingredients',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'string',
      title: 'Image URL',
      validation: (Rule) => Rule.required(),
    },
  ],
}
